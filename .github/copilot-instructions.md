# Copilot Instructions — balanced-next

## Project Overview

This is a **Next.js** (App Router) frontend for the Balanced personal finance app. The backend exposes a **GraphQL API**.

## Core Conventions

### Server-First Rendering

Every effort shall be made to render components on the server side. Default to React Server Components. Only add `'use client'` when a component genuinely requires browser APIs, event handlers, or client-side state.

### Server Actions Over API Routes

Use `'use server'` functions (Next.js Server Actions) for mutations that need to update session cookies (e.g., workspace switching). Do **not** create dedicated API route handlers (`app/api/`) unless there is a specific technical reason (e.g., webhooks, OAuth callbacks).

### GraphQL with Apollo Client

Use **Apollo Client** with the `@apollo/client-integration-nextjs` package for all GraphQL communication. This supports both React Server Components and Client Components with SSR hydration.

- **Server Components:** Use `getClient().query()` from `@apollo/client-integration-nextjs` for server-side data fetching.
- **Client Components:** Use `useSuspenseQuery`, `useFragment`, and `useMutation` hooks for interactive data.
- **`PreloadQuery`:** Preload data in server components and hydrate into client components to avoid waterfalls.
- **Server Actions:** Use for mutations that require server-side cookie updates (e.g., workspace switching).

See the [Apollo Next.js integration docs](https://www.apollographql.com/docs/react/integrations/nextjs) for full API reference.

### Component Reuse

Every effort to reuse components and share logic shall be made. Extract shared UI into `src/components/` and shared logic into `src/lib/`. Avoid duplicating markup or business logic across pages.

### ShadCN Components

**ShadCN is the primary component library.** Before building any new UI component, first check if a suitable ShadCN component exists and extend/compose from it. Use the ShadCN MCP tools (`shadcn-search_items_in_registries`, `shadcn-view_items_in_registries`, `shadcn-get_item_examples_from_registries`) to research available components and usage patterns before implementing.

## Styling

- **Tailwind CSS** is the styling framework, used everywhere including ShadCN components and application code.
- Global styles and ShadCN theme variables go in `src/app/globals.css`.
- Use the `cn()` utility from `src/lib/utils.ts` for conditional class merging.

## State Management

- Use standard React `useState` / `useReducer` where client-side state is needed.
- No external state management library unless a clear need arises.

## Forms

- Use **React Hook Form** for form state management and validation.

## Testing

- Use **Vitest** as the test runner.

## Specs

Spec-driven plans live in the `/specs` directory, organized by feature. Each spec is a markdown file describing the feature requirements, design decisions, and implementation details. When starting a new feature, create a spec file first (e.g., `specs/auth.md`, `specs/dashboard.md`).

## Commands

```bash
# Install dependencies
npm install

# Dev server
npm run dev

# Production build
npm run build

# Run tests
npm test
```
