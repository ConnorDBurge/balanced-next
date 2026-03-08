# Dashboard Shell Spec

## Overview
Recreate the dripl-web dashboard layout in balanced-next: collapsible left sidebar with navigation, workspace switcher at top, user menu at bottom, and main content area.

## Layout Hierarchy
```
SidebarProvider
├── AppSidebar
│   ├── SidebarHeader → WorkspaceSwitcher (dropdown)
│   ├── SidebarContent → Nav items (Transactions, Budgets, Accounts, Recurring, Tags, Categories)
│   ├── Utility bar (Search, Notifications, Settings, Collapse toggle)
│   └── SidebarFooter → UserMenu (avatar, theme toggle, personal settings, sign out)
└── SidebarInset → main content (page children)
```

## ShadCN Components Required
- Sidebar (full suite: Provider, Header, Content, Footer, Menu, etc.)
- DropdownMenu (workspace switcher + user menu)
- Avatar (user initials in footer)
- Sheet (mobile sidebar drawer)
- Tooltip (collapsed sidebar icon labels)
- Separator

## Key Features
- Collapsible sidebar (icon mode) with `Cmd/Ctrl+B` keyboard shortcut
- Workspace switcher dropdown with list of workspaces + "Create workspace" option
- User menu with: personal settings, theme toggle (light/dark/system), sign out
- Active nav item highlighting based on current route
- Mobile responsive: sheet-based drawer on small screens
- Sidebar state persisted via cookie

## Navigation Items
| Label         | Route           | Icon           |
|---------------|-----------------|----------------|
| Transactions  | /transactions   | ArrowLeftRight |
| Budgets       | /budgets        | PiggyBank      |
| Accounts      | /accounts       | Landmark       |
| Recurring     | /recurring      | RefreshCw      |
| Tags          | /tags           | Tag            |
| Categories    | /categories     | FolderTree     |

## Data Dependencies
- `useUser()` — user name, email, signOutAction (from UserProvider)
- `useWorkspace()` — current workspace, workspace list, roles (from WorkspaceProvider)
- Theme state via `next-themes`

## Pages (placeholder stubs)
All pages except `/dashboard` get "Coming soon" placeholders. `/dashboard` redirects to `/transactions`.

## Files to Create
- `src/components/app-sidebar/app-sidebar.tsx` — main sidebar component
- `src/components/workspace-switcher/workspace-switcher.tsx` — workspace dropdown
- ShadCN UI components: sidebar, dropdown-menu, avatar, sheet, tooltip, separator
- Stub pages: transactions, budgets, accounts, recurring, tags, categories, settings
- Install `next-themes` for theme toggle
