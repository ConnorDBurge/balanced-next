"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { successToast, errorToast } from "@/lib/toast";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { graphql } from "@/__generated__/gql";
import { Role } from "@/__generated__/graphql";

const CURRENT_WORKSPACE_QUERY = graphql(`
  query CurrentWorkspace {
    currentWorkspace {
      id
      name
    }
  }
`);

const WORKSPACE_MEMBERS_QUERY = graphql(`
  query WorkspaceMembers {
    workspaceMembers {
      userId
      givenName
      familyName
      email
      roles
      status
      joinedAt
    }
  }
`);

const UPDATE_WORKSPACE_MUTATION = graphql(`
  mutation UpdateCurrentWorkspace($input: UpdateWorkspaceInput!) {
    updateCurrentWorkspace(input: $input) {
      id
      name
    }
  }
`);

const UPDATE_MEMBER_MUTATION = graphql(`
  mutation UpdateWorkspaceMember($userId: ID!, $input: UpdateMembershipInput!) {
    updateWorkspaceMember(userId: $userId, input: $input) {
      userId
      roles
    }
  }
`);

const REMOVE_MEMBER_MUTATION = graphql(`
  mutation RemoveWorkspaceMember($userId: ID!) {
    removeWorkspaceMember(userId: $userId)
  }
`);

const ROLE_TIERS = [
  { label: "Owner", description: "Full control over workspace and members", roles: [Role.Read, Role.Write, Role.Delete, Role.Owner] },
  { label: "Admin", description: "Can view, edit, and delete content", roles: [Role.Read, Role.Write, Role.Delete] },
  { label: "Editor", description: "Can view and edit content", roles: [Role.Read, Role.Write] },
  { label: "Viewer", description: "Can view content only", roles: [Role.Read] },
] as const;

function getRoleLabel(roles: string[]): string {
  const set = new Set(roles);
  if (set.has("OWNER")) return "Owner";
  if (set.has("DELETE") && set.has("WRITE") && set.has("READ")) return "Admin";
  if (set.has("WRITE") && set.has("READ")) return "Editor";
  if (set.has("READ")) return "Viewer";
  return "Custom";
}

interface Member {
  userId: string;
  givenName: string;
  familyName: string;
  email: string;
  roles: string[];
  status: string;
  joinedAt: string;
}

export default function WorkspaceSettingsPage() {
  const router = useRouter();
  const { hasRole, userId: currentUserId } = useWorkspace();
  const isOwner = hasRole("OWNER");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [membersLoading, setMembersLoading] = useState(true);

  const { control, handleSubmit, reset, formState: { isDirty } } = useForm({
    defaultValues: { name: "" },
  });

  const [removingMember, setRemovingMember] = useState<Member | null>(null);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [editingRoles, setEditingRoles] = useState<Member | null>(null);
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [rolesSaving, setRolesSaving] = useState(false);

  const [fetchWorkspace] = useLazyQuery(CURRENT_WORKSPACE_QUERY, { fetchPolicy: "network-only" });
  const [fetchMembers] = useLazyQuery(WORKSPACE_MEMBERS_QUERY, { fetchPolicy: "network-only" });
  const [updateWorkspace] = useMutation(UPDATE_WORKSPACE_MUTATION);
  const [updateMember] = useMutation(UPDATE_MEMBER_MUTATION);
  const [removeMember] = useMutation(REMOVE_MEMBER_MUTATION);

  useEffect(() => {
    fetchWorkspace().then(({ data }) => {
      if (data?.currentWorkspace) {
        reset({ name: data.currentWorkspace.name });
      }
    }).finally(() => setLoading(false));

    fetchMembers().then(({ data }) => {
      if (data?.workspaceMembers) {
        setMembers(data.workspaceMembers.map((m) => ({
          userId: m.userId,
          givenName: m.givenName,
          familyName: m.familyName,
          email: m.email,
          roles: [...m.roles],
          status: m.status,
          joinedAt: m.joinedAt,
        })));
      }
    }).finally(() => setMembersLoading(false));
  }, [fetchWorkspace, fetchMembers, reset]);

  const canSubmit = isDirty && !saving;

  async function onSave(form: { name: string }) {
    setSaving(true);
    try {
      const { data } = await updateWorkspace({
        variables: { input: { name: form.name } },
      });
      if (data?.updateCurrentWorkspace) {
        reset({ name: data.updateCurrentWorkspace.name });
      }
      router.refresh();
      successToast("Workspace updated");
    } catch {
      errorToast("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  function getMemberDisplayName(member: Member) {
    return (
      [member.givenName, member.familyName].filter(Boolean).join(" ").trim() ||
      member.email ||
      `${member.userId.slice(0, 8)}…`
    );
  }

  const handleRemoveMember = useCallback(async () => {
    if (!removingMember) return;
    setRemoveLoading(true);
    try {
      await removeMember({ variables: { userId: removingMember.userId } });
      setMembers((prev) => prev.filter((m) => m.userId !== removingMember.userId));
      successToast("Member removed");
    } catch {
      errorToast("Something went wrong");
    } finally {
      setRemoveLoading(false);
      setRemovingMember(null);
    }
  }, [removingMember, removeMember]);

  const handleSaveRoles = useCallback(async () => {
    if (!editingRoles || !selectedTier) return;
    const tier = ROLE_TIERS.find((t) => t.label === selectedTier);
    if (!tier) return;
    const rolesToSend: Role[] = [...tier.roles];
    setRolesSaving(true);
    try {
      const { data } = await updateMember({
        variables: {
          userId: editingRoles.userId,
          input: { roles: rolesToSend },
        },
      });
      if (data?.updateWorkspaceMember) {
        const updatedRoles = [...data.updateWorkspaceMember.roles];
        setMembers((prev) =>
          prev.map((m) =>
            m.userId === editingRoles.userId
              ? { ...m, roles: updatedRoles }
              : m
          )
        );
      }
      successToast("Role updated");
    } catch {
      errorToast("Something went wrong");
    } finally {
      setRolesSaving(false);
      setEditingRoles(null);
    }
  }, [editingRoles, selectedTier, updateMember]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-lg space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-lg space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-lg animate-in fade-in slide-in-from-bottom-2 duration-500">
        <h2 className="text-lg font-medium">General</h2>
        <p className="mt-1 text-sm text-muted-foreground">Manage your workspace settings.</p>
        <Form onSubmit={handleSubmit(onSave)} className="mt-6 space-y-4">
          <FormField control={control} name="name" label="Workspace name" disabled={saving} />
          <div className="flex justify-end">
            <Button type="submit" disabled={!canSubmit}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </Form>
      </div>

      <div className="rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-lg animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150 fill-mode-backwards">
        <h2 className="text-lg font-medium">Members</h2>
        <p className="mt-1 text-sm text-muted-foreground">People with access to this workspace.</p>
        <div className="mt-6 overflow-x-auto">
          {membersLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 text-left text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">Name</th>
                  <th className="pb-2 pr-4 font-medium">Roles</th>
                  <th className="pb-2 pr-4 font-medium">Status</th>
                  <th className="pb-2 pr-4 font-medium">Joined</th>
                  {isOwner && <th className="pb-2 font-medium">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.userId} className="border-b border-border/30">
                    <td className="py-3 pr-4">
                      {[member.givenName, member.familyName].filter(Boolean).join(" ").trim() ||
                        member.email ||
                        `${member.userId.slice(0, 8)}…`}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {getRoleLabel(member.roles ?? [])}
                      </span>
                    </td>
                    <td className="py-3 pr-4">{member.status}</td>
                    <td className="py-3">
                      {new Date(member.joinedAt).toLocaleDateString()}
                    </td>
                    {isOwner && (
                      <td className="py-3">
                        <div className="flex items-center gap-1 min-h-[1.75rem]">
                          {member.userId !== currentUserId && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => {
                                  setEditingRoles(member);
                                  setSelectedTier(getRoleLabel(member.roles));
                                }}
                              >
                                Change role
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs text-red-400 hover:text-red-300"
                                onClick={() => setRemovingMember(member)}
                              >
                                Remove
                              </Button>
                            </>
                          )}
                          {member.userId === currentUserId && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs disabled:opacity-100"
                              disabled
                            >
                              You
                            </Button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Dialog open={!!removingMember} onOpenChange={(open) => !open && setRemovingMember(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove{" "}
              <strong>{removingMember ? getMemberDisplayName(removingMember) : ""}</strong> from this
              workspace? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setRemovingMember(null)} disabled={removeLoading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRemoveMember} disabled={removeLoading}>
              {removeLoading ? "Removing…" : "Remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!editingRoles}
        onOpenChange={(open) => !open && setEditingRoles(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change role</DialogTitle>
            <DialogDescription>
              Select a role for{" "}
              <strong>{editingRoles ? getMemberDisplayName(editingRoles) : ""}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            {ROLE_TIERS.map((tier) => (
              <label
                key={tier.label}
                className="flex items-start gap-3 cursor-pointer rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50 has-[:checked]:border-primary/50 has-[:checked]:bg-muted"
              >
                <input
                  type="radio"
                  name="role-tier"
                  value={tier.label}
                  checked={selectedTier === tier.label}
                  onChange={() => setSelectedTier(tier.label)}
                  className="mt-0.5"
                />
                <div>
                  <div className="text-sm font-medium">{tier.label}</div>
                  <div className="text-xs text-muted-foreground">{tier.description}</div>
                </div>
              </label>
            ))}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditingRoles(null)} disabled={rolesSaving}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveRoles}
              disabled={rolesSaving || !selectedTier}
            >
              {rolesSaving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
