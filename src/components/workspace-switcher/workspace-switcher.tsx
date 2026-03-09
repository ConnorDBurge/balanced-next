"use client";

import { useState, useEffect, useRef } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { switchWorkspace } from "@/lib/actions/auth-actions";
import { CreateWorkspaceModal } from "@/components/create-workspace-modal/create-workspace-modal";

export function WorkspaceSwitcher() {
  const { workspace, workspaces } = useWorkspace();
  const currentWorkspaceId = workspace.id;
  const [open, setOpen] = useState(false);
  const [switching, setSwitching] = useState(false);
  const [switched, setSwitched] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const prevWorkspaceId = useRef(currentWorkspaceId);
  const { state, isMobile, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  useEffect(() => {
    if (prevWorkspaceId.current !== currentWorkspaceId) {
      setSwitching(false);
      setSwitched(true);
      prevWorkspaceId.current = currentWorkspaceId;
    }
  }, [currentWorkspaceId]);

  const current = workspace;
  const initial = current.name[0]?.toUpperCase() ?? "W";

  async function handleSwitch(workspaceId: string) {
    if (workspaceId === currentWorkspaceId || switching) return;
    setSwitching(true);
    setOpen(false);
    try {
      await switchWorkspace(workspaceId);
      window.location.reload();
    } catch {
      setSwitching(false);
    }
  }

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex w-full items-center gap-2.5 pl-3 pr-2 pt-3 pb-3 text-left transition-colors overflow-hidden hover:bg-sidebar-accent group-data-[collapsible=icon]:hover:bg-transparent cursor-pointer"
          >
            {/* workspace initial badge */}
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-gradient-from to-gradient-to text-white text-xs font-semibold">
              {initial}
            </div>
            <span
              key={switched ? currentWorkspaceId : undefined}
              className={`flex-1 truncate text-sm font-medium whitespace-nowrap overflow-hidden transition-[width,opacity] group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0${switched ? " animate-in fade-in slide-in-from-left-2 duration-300" : ""}`}
            >
              {current.name}
            </span>
            <ChevronsUpDown
              className="size-3.5 shrink-0 text-muted-foreground transition-[width,opacity] duration-150 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[235px] rounded-lg backdrop-blur-xl ml-[10px] [&_[data-slot=dropdown-menu-item]]:py-2 [&_[data-slot=dropdown-menu-item]]:text-[14px]"
          side="bottom"
          align="start"
          sideOffset={12}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">Workspaces</div>
          <DropdownMenuSeparator />
          {workspaces.map((workspace) => (
            <DropdownMenuItem
              key={workspace.id}
              onSelect={() => handleSwitch(workspace.id)}
            >
              <div className="flex size-5 shrink-0 items-center justify-center rounded bg-gradient-to-br from-gradient-from to-gradient-to !text-white text-xs font-semibold">
                {workspace.name[0]?.toUpperCase()}
              </div>
              <span className="flex-1 truncate">{workspace.name}</span>
              {workspace.id === currentWorkspaceId && (
                <Check className="ml-auto size-3.5 text-muted-foreground" />
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-muted-foreground"
            onSelect={() => setCreateOpen(true)}
          >
            <Plus className="size-4" />
            Create workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateWorkspaceModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        existingWorkspaces={workspaces}
      />
    </>
  );
}
