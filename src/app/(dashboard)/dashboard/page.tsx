"use client";

import { useUser } from "@/components/providers/user-provider";
import { useWorkspace } from "@/components/providers/workspace-provider";

export default function DashboardPage() {
  const { user } = useUser();
  const { workspace, workspaces, roles, userId } = useWorkspace();

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="space-y-2 text-sm">
        <p><strong>User:</strong> {user.name} ({user.email})</p>
        <p><strong>User ID:</strong> {userId}</p>
        <p><strong>Current Workspace:</strong> {workspace.name} ({workspace.id})</p>
        <p><strong>Roles:</strong> {roles.join(", ")}</p>
        <p><strong>All Workspaces:</strong> {workspaces.map(w => w.name).join(", ")}</p>
      </div>
    </div>
  );
}
