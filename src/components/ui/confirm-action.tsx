import { Button } from "@/components/ui/button";

interface ConfirmActionProps {
  message?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  loadingLabel?: string;
  variant?: "destructive" | "default";
}

export function ConfirmAction({
  message = "Are you sure? This action cannot be undone.",
  confirmLabel = "Yes, Remove",
  onConfirm,
  onCancel,
  loading = false,
  loadingLabel,
  variant = "destructive",
}: ConfirmActionProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 flex flex-col gap-2 pt-2">
      <p className="text-sm text-muted-foreground text-center">{message}</p>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          className="flex-1"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant={variant}
          className="flex-1"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? (loadingLabel ?? "Deleting…") : confirmLabel}
        </Button>
      </div>
    </div>
  );
}
