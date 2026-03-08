"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { successToast } from "@/lib/toast";
import { provisionWorkspace } from "@/lib/actions/auth-actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";

interface Workspace {
  id: string;
  name: string;
}

interface CreateWorkspaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingWorkspaces: Workspace[];
  onSuccess?: () => void;
}

export function CreateWorkspaceModal({ open, onOpenChange, existingWorkspaces, onSuccess }: CreateWorkspaceModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: { name: "" },
  });

  const name = watch("name");
  const isDuplicate = name.trim().length > 0 &&
    existingWorkspaces.some((w) => w.name.toLowerCase() === name.trim().toLowerCase());
  const canSubmit = !!name.trim() && !isDuplicate && !loading;

  function handleFormKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key !== "Enter" || (!e.metaKey && !e.ctrlKey) || !canSubmit) return;
    e.preventDefault();
    e.currentTarget.requestSubmit();
  }

  async function onSubmit(form: { name: string }) {
    if (!form.name.trim() || isDuplicate) return;

    setLoading(true);
    setError(null);

    try {
      await provisionWorkspace(form.name.trim());
      handleOpenChange(false);
      onSuccess?.();
      successToast("Workspace created");
      window.location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      reset();
      setError(null);
    }
    onOpenChange(open);
  }
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Create workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleFormKeyDown}>
          <div className="py-4">
            <FormField
              control={control}
              name="name"
              label="Workspace name"
              placeholder="e.g. My Budget"
              maxLength={100}
              disabled={loading}
              error={
                isDuplicate
                  ? "You already have a workspace with this name."
                  : error ?? undefined
              }
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              {loading ? "Creating…" : "Create workspace"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
