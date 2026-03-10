import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface LabeledFilterOption {
  value: string;
  label: string;
}

interface LabeledFilterProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: LabeledFilterOption[];
  testId?: string;
  labelPosition?: "inside" | "outside";
}

export function LabeledFilter({
  label,
  value,
  onValueChange,
  options,
  testId,
  labelPosition = "inside",
}: LabeledFilterProps) {
  const selectedLabel = options.find((o) => o.value === value)?.label;

  const selectContent = (
    <SelectContent position="popper" align="end">
      {options.map((opt) => (
        <SelectItem key={opt.value} value={opt.value}>
          {opt.label}
        </SelectItem>
      ))}
    </SelectContent>
  );

  if (labelPosition === "inside") {
    return (
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className="h-9 gap-2 border-border px-3 text-sm shadow-none cursor-pointer"
          data-testid={testId}
        >
          <span className="text-muted-foreground whitespace-nowrap">{label}:</span>
          <span className="font-medium">{selectedLabel}</span>
        </SelectTrigger>
        {selectContent}
      </Select>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">{label}:</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className="h-9 border-border px-3 text-sm font-medium shadow-none cursor-pointer"
          data-testid={testId}
        >
          <span>{selectedLabel}</span>
        </SelectTrigger>
        {selectContent}
      </Select>
    </div>
  );
}
