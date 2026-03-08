# Spec: GraphQL Client & Authentication

## Overview

Set up the GraphQL client infrastructure and Google OAuth authentication flow for balanced-next. This is the foundation — nothing else can be built without it.

## Architecture

### Auth Flow

```
Browser → Google OAuth → NextAuth (balanced-next)
  → POST /api/v1/auth/google { idToken } → balanced-api
  → receives { token, userId, workspaceId, roles, email, givenName, familyName }
  → stores in encrypted session cookie
  → all subsequent requests: Server Action → GraphQL (Bearer token)
```

### Key Decisions

1. **NextAuth v5 (beta)** — same as dripl-web, proven working with our backend
2. **Google OAuth only** — single auth provider, `access_type: "offline"` for refresh tokens
3. **Server Actions for GraphQL** — no API routes for data fetching; `'use server'` functions call GraphQL
4. **Auth endpoint stays REST** — `/api/v1/auth/google` is a REST endpoint on the backend (not GraphQL). This is correct — you can't authenticate via GraphQL since GraphQL requires auth.
5. **JWT in encrypted cookie** — NextAuth encrypts the session cookie; our backend JWT is stored inside it
6. **Token refresh** — when backend JWT is expiring, refresh Google id_token, re-exchange for new backend JWT

### Backend Contract

**REST (unauthenticated):**
- `POST /api/v1/auth/google` — exchange Google id_token for backend JWT
  - Request: `{ idToken: string }`
  - Response: `{ token, userId, workspaceId, email, givenName, familyName, roles }`

**GraphQL (authenticated, Bearer token required):**
- `query { self { id, email, givenName, familyName, isActive, lastWorkspaceId } }`
- `query { workspaces { id, name, status } }`
- `query { currentWorkspace { id, name, status } }`
- `mutation provisionWorkspace(input: { name }) → { id, name, token }`
- `mutation switchWorkspace(input: { workspaceId }) → { id, name, token }`

## Implementation Plan

### 1. Dependencies

Install: `next-auth@beta`, `graphql-request` (lightweight GraphQL client — server-side only, no Apollo).

**Why not Apollo?** Apollo's `useQuery`/`useMutation` hooks run in the browser, making GraphQL queries visible in the Network tab. Server Actions + `graphql-request` keeps all GraphQL traffic server-to-server (invisible to browser). Server components fetch data directly; client components mutate via Server Actions + `useTransition`.

### 2. Environment Config

```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
BALANCED_API_URL=http://localhost:8080
```

### 3. Files to Create

```
src/
├── auth.ts                          # NextAuth config (Google provider, JWT callback)
├── middleware.ts                     # Protect routes, redirect unauthenticated users
├── lib/
│   ├── graphql-client.ts            # GraphQL client (graphql-request with Bearer token)
│   ├── auth/
│   │   ├── session.ts               # getClaims() — read API token from encrypted cookie
│   │   └── token.ts                 # Token expiry check, Google refresh logic
│   └── actions/
│       └── auth-actions.ts          # Server actions: switchWorkspace, provisionWorkspace
├── types/
│   └── next-auth.d.ts               # NextAuth type extensions (apiToken, userId, etc.)
├── app/
│   ├── login/
│   │   ├── page.tsx                 # Login page (Google sign-in button)
│   │   └── page.module.scss         # Login page styles
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts         # NextAuth route handler (only API route needed)
│   └── (dashboard)/
│       └── layout.tsx               # Protected layout — checks auth, fetches user
```

### 4. GraphQL Client Design

```typescript
// src/lib/graphql-client.ts
// Server-only. Uses graphql-request with dynamic Bearer token from session.
// Every Server Action calls this to communicate with the backend.

import { GraphQLClient } from 'graphql-request';
import { getClaims } from '@/lib/auth/session';

const API_URL = process.env.BALANCED_API_URL || 'http://localhost:8080';

export async function getGraphQLClient() {
  const claims = await getClaims();
  if (!claims) throw new Error('Not authenticated');

  return new GraphQLClient(`${API_URL}/graphql`, {
    headers: { Authorization: `Bearer ${claims.token}` },
  });
}

export async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const client = await getGraphQLClient();
  return client.request<T>(query, variables);
}
```

### 5. Session Cookie Structure

NextAuth encrypts a JWT containing:
```typescript
{
  apiToken: string;       // Backend JWT
  userId: string;         // UUID
  workspaceId: string;    // UUID  
  roles: string[];        // ['OWNER', 'WRITE', 'DELETE', 'READ']
  email: string;
  name: string;
  authProvider: 'google';
  googleIdToken: string;
  googleRefreshToken: string;
}
```

### 6. Middleware

```typescript
// src/middleware.ts
// Redirects unauthenticated users to /login
// Redirects authenticated users from /login to /
export { auth as middleware } from '@/auth';
export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] };
```

### 7. Login Page

Minimal — a centered card with app name and "Continue with Google" button. Server component wrapping a client sign-in button.

## Out of Scope

- Workspace switching UI (separate spec)
- User profile/settings (separate spec)  
- Dev login bypass (nice-to-have, not MVP)
- Mobile gate (defer)
