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
}

export function LabeledFilter({
  label,
  value,
  onValueChange,
  options,
  testId,
}: LabeledFilterProps) {
  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className="flex items-center gap-2 rounded-md border border-border px-3 h-9">
      <span className="text-sm text-muted-foreground whitespace-nowrap">{label}:</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className="w-auto border-0 bg-transparent shadow-none h-auto px-0 py-0 text-sm font-medium dark:bg-transparent dark:hover:bg-transparent cursor-pointer"
          data-testid={testId}
        >
          <span>{selectedLabel}</span>
        </SelectTrigger>
        <SelectContent position="popper" align="end">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
