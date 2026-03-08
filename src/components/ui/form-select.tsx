import { useController, Control, FieldValues, FieldPath } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectBaseProps {
  label?: string;
  options: FormSelectOption[];
  triggerClassName?: string;
  contentAlign?: "start" | "center" | "end";
  testId?: string;
  disabled?: boolean;
}

interface FormSelectControlledProps extends FormSelectBaseProps {
  value: string;
  onValueChange: (value: string) => void;
  control?: undefined;
  name?: undefined;
}

interface FormSelectRHFProps<T extends FieldValues = FieldValues> extends FormSelectBaseProps {
  control: Control<T>;
  name: FieldPath<T>;
  value?: undefined;
  onValueChange?: undefined;
}

type FormSelectProps<T extends FieldValues = FieldValues> = FormSelectControlledProps | FormSelectRHFProps<T>;

export function FormSelect<T extends FieldValues = FieldValues>(props: FormSelectProps<T>) {
  const {
    label,
    options,
    triggerClassName,
    contentAlign,
    testId,
    disabled,
  } = props;

  let value: string;
  let onValueChange: (v: string) => void;

  if (props.control && props.name) {
    const { field } = useController({ control: props.control, name: props.name });
    value = field.value;
    onValueChange = field.onChange;
  } else {
    value = (props as FormSelectControlledProps).value;
    onValueChange = (props as FormSelectControlledProps).onValueChange;
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label className="text-xs text-muted-foreground uppercase tracking-wider">
          {label}
        </Label>
      )}
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className={triggerClassName} data-testid={testId}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent align={contentAlign}>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
