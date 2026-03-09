"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useMutation, useLazyQuery } from "@apollo/client/react";
import { Check, Loader2, Monitor, Moon, Sun, User, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form-field";
import { Skeleton } from "@/components/ui/skeleton";
import { TabbedDialog } from "@/components/ui/tabbed-dialog";
import { errorToast } from "@/lib/toast";
import { graphql } from "@/__generated__/gql";

const SELF_QUERY = graphql(`
  query PersonalSettingsSelf {
    self {
      id
      givenName
      familyName
      email
    }
  }
`);

const UPDATE_SELF_MUTATION = graphql(`
  mutation UpdateSelf($input: UpdateUserInput!) {
    updateSelf(input: $input) {
      id
      givenName
      familyName
      email
    }
  }
`);

const DELETE_SELF_MUTATION = graphql(`
  mutation DeleteSelf {
    deleteSelf
  }
`);

interface PersonalSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MIN_SPINNER_MS = 450;

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: Sun, description: "Clean and bright", activeColor: "text-amber-400" },
  { value: "dark", label: "Dark", icon: Moon, description: "Easy on the eyes", activeColor: "text-purple-400" },
  { value: "system", label: "System", icon: Monitor, description: "Match your device", activeColor: "text-foreground" },
] as const;

export function PersonalSettingsModal({ open, onOpenChange }: PersonalSettingsModalProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveIndicator, setSaveIndicator] = useState<"idle" | "saving" | "success">("idle");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { control, handleSubmit, reset, formState: { isDirty } } = useForm({
    defaultValues: { givenName: "", familyName: "", email: "" },
  });

  const [fetchSelf, { loading }] = useLazyQuery(SELF_QUERY, { fetchPolicy: "network-only" });
  const [updateSelf] = useMutation(UPDATE_SELF_MUTATION);
  const [deleteSelf] = useMutation(DELETE_SELF_MUTATION);

  useEffect(() => setMounted(true), []);
  const currentTheme = mounted ? theme : undefined;

  async function wait(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (!open) {
      setSaveIndicator("idle");
      return;
    }

    fetchSelf().then(({ data }) => {
      if (data?.self) {
        const { givenName, familyName, email } = data.self;
        reset({ givenName, familyName, email });
      }
    });
  }, [open, fetchSelf, reset]);

  const canSubmit = isDirty && !saving;

  async function onSubmit(form: { givenName: string; familyName: string; email: string }) {
    setSaving(true);
    setSaveIndicator("saving");
    let saved = false;
    const start = Date.now();
    try {
      const { data } = await updateSelf({
        variables: { input: form },
      });
      if (data?.updateSelf) {
        const { givenName, familyName, email } = data.updateSelf;
        reset({ givenName, familyName, email });
      }
      router.refresh();
      const elapsed = Date.now() - start;
      if (elapsed < MIN_SPINNER_MS) {
        await wait(MIN_SPINNER_MS - elapsed);
      }
      setSaveIndicator("success");
      saved = true;
    } catch {
      errorToast("Something went wrong");
    } finally {
      setSaving(false);
      if (!saved) {
        setSaveIndicator("idle");
      }
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteSelf();
      await signOut({ callbackUrl: "/login" });
    } catch {
      errorToast("Something went wrong");
    } finally {
      setDeleting(false);
    }
  }

  const profileContent = loading ? (
    <div className="space-y-4 pt-2">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-28 ml-auto" />
    </div>
  ) : (
    <div className="space-y-6 pt-2">
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={control} name="givenName" label="First name" disabled={saving} />
        <FormField control={control} name="familyName" label="Last name" disabled={saving} />
        <FormField control={control} name="email" label="Email" type="email" disabled={saving} />
        <div className="flex items-center justify-end gap-2">
          {saveIndicator === "saving" && (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
          {saveIndicator === "success" && (
            <Check className="h-4 w-4 text-emerald-500" />
          )}
          <Button type="submit" disabled={!canSubmit}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </Form>

      <div className="rounded-lg border border-red-500/20 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-medium text-red-400">Delete account</h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and remove you from all workspaces.
            </p>
          </div>
          <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );

  const appearanceContent = (
    <div className="space-y-6 pt-2">
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium">Theme</h3>
          <p className="text-sm text-muted-foreground">
            Choose how Balanced looks to you.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {THEME_OPTIONS.map((option, i) => {
            const isSelected = currentTheme === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTheme(option.value)}
                className={`group relative flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isSelected
                    ? "border-foreground/20 bg-gradient-to-br from-gradient-from/10 to-gradient-to/10 shadow-md"
                    : "border-transparent bg-muted/50 hover:border-border hover:bg-muted"
                }`}
                style={{ animationDelay: `${i * 75}ms` }}
              >
                <div
                  className={`relative flex h-16 w-full items-center justify-center rounded-lg transition-transform duration-300 ${
                    isSelected ? "scale-105" : "group-hover:scale-[1.02]"
                  } ${
                    option.value === "light"
                      ? "bg-white text-zinc-900 shadow-inner"
                      : option.value === "dark"
                        ? "bg-zinc-900 text-zinc-100 shadow-inner"
                        : "bg-gradient-to-br from-white to-zinc-900 shadow-inner"
                  }`}
                >
                  <div className="flex w-3/4 flex-col gap-1">
                    {[3/4, 1/2, 2/3].map((w, j) => (
                      <div
                        key={j}
                        className={`h-1.5 rounded-full ${
                          option.value === "light" ? "bg-zinc-200" : option.value === "dark" ? "bg-zinc-700" : "bg-zinc-400"
                        }`}
                        style={{ width: `${w * 100}%` }}
                      />
                    ))}
                  </div>
                  {isSelected && (
                    <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background shadow-sm">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <option.icon className={`h-3.5 w-3.5 transition-colors duration-300 ${isSelected ? option.activeColor : "text-muted-foreground"}`} />
                    <span className={`text-sm font-medium transition-colors ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                      {option.label}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const deleteConfirmation = (
    <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          This will permanently delete your account and remove you from all workspaces.
        </p>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setDeleteOpen(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting…" : "Delete account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <TabbedDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Personal settings"
      tabs={[
        { id: "profile", label: "Profile", icon: User, content: profileContent },
        { id: "appearance", label: "Appearance", icon: Palette, content: appearanceContent },
      ]}
      extra={deleteConfirmation}
    />
  );
}
