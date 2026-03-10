import { cn } from "@/lib/utils";

interface RadioListOption {
  value: string;
  label: string;
}

interface RadioListProps {
  title?: string;
  options: RadioListOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RadioList({ title, options, value, onChange, className }: RadioListProps) {
  return (
    <div className={cn("rounded-lg border border-border", className)}>
      {title && (
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
      )}
      <div className="flex flex-col">
        {options.map((opt, i) => (
          <button
            key={opt.value}
            type="button"
            className={cn(
              "flex items-center justify-between px-4 py-3 text-left text-sm transition-colors hover:bg-muted/50 cursor-pointer",
              i < options.length - 1 && "border-b border-border",
              value === opt.value && "bg-muted/40"
            )}
            onClick={() => onChange(opt.value)}
          >
            <span>{opt.label}</span>
            <div
              className={cn(
                "size-4 rounded-full border-2 flex items-center justify-center",
                value === opt.value ? "border-primary" : "border-muted-foreground/30"
              )}
            >
              {value === opt.value && (
                <div className="size-2 rounded-full bg-primary" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
