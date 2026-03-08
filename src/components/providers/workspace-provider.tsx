"use client";

import { createContext, useCallback, useContext } from "react";

export interface Workspace {
  id: string;
  name: string;
}

export type WorkspaceRole = "READ" | "WRITE" | "DELETE" | "OWNER";

interface WorkspaceContextValue {
  workspace: Workspace;
  workspaces: Workspace[];
  roles: WorkspaceRole[];
  userId: string;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({
  workspace,
  workspaces,
  roles,
  userId,
  children,
}: WorkspaceContextValue & { children: React.ReactNode }) {
  return (
    <WorkspaceContext.Provider value={{ workspace, workspaces, roles, userId }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx)
    throw new Error("useWorkspace must be used within WorkspaceProvider");

  const hasRole = useCallback(
    (role: WorkspaceRole) => ctx.roles.includes(role),
    [ctx.roles],
  );

  return { ...ctx, hasRole };
}
