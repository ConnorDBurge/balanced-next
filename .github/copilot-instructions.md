# Copilot Instructions — balanced-next

## Project Overview

This is a **Next.js** (App Router) frontend for the Balanced personal finance app. The backend exposes a **GraphQL API**.

## Core Conventions

### Server-First Rendering

Every effort shall be made to render components on the server side. Default to React Server Components. Only add `'use client'` when a component genuinely requires browser APIs, event handlers, or client-side state.

### Server Actions Over API Routes

Use `'use server'` functions (Next.js Server Actions) to communicate with the GraphQL backend. Do **not** create dedicated API route handlers (`app/api/`) unless there is a specific technical reason (e.g., webhooks, OAuth callbacks).

### Component Reuse

Every effort to reuse components and share logic shall be made. Extract shared UI into `src/components/` and shared logic into `src/lib/`. Avoid duplicating markup or business logic across pages.

### ShadCN Components

**ShadCN is the primary component library.** Before building any new UI component, first check if a suitable ShadCN component exists and extend/compose from it. Use the ShadCN MCP tools (`shadcn-search_items_in_registries`, `shadcn-view_items_in_registries`, `shadcn-get_item_examples_from_registries`) to research available components and usage patterns before implementing.

## Styling

- **SCSS Modules** (`.module.scss`) — no Tailwind, no utility-class frameworks.
- Component-scoped styles live next to their component file.
- Global styles and variables go in `src/app/globals.scss`.

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
