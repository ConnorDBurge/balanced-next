import { useController, Control, FieldValues, FieldPath } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldBaseProps {
  id?: string;
  label: string;
  placeholder?: string;
  maxLength?: number;
  error?: string;
  description?: string;
  optional?: boolean;
  type?: string;
  disabled?: boolean;
}

interface FormFieldControlledProps extends FormFieldBaseProps {
  value: string;
  onChange: (value: string) => void;
  control?: undefined;
  name?: undefined;
}

interface FormFieldRHFProps<T extends FieldValues = FieldValues> extends FormFieldBaseProps {
  control: Control<T>;
  name: FieldPath<T>;
  value?: undefined;
  onChange?: undefined;
}

type FormFieldProps<T extends FieldValues = FieldValues> = FormFieldControlledProps | FormFieldRHFProps<T>;

export function FormField<T extends FieldValues = FieldValues>(props: FormFieldProps<T>) {
  const {
    id,
    label,
    placeholder,
    maxLength,
    description,
    optional,
    type = "text",
    disabled,
  } = props;

  let value: string;
  let onChange: (v: string) => void;
  let rhfError: string | undefined;

  if (props.control && props.name) {
    const { field, fieldState } = useController({ control: props.control, name: props.name });
    value = field.value ?? "";
    onChange = field.onChange;
    rhfError = fieldState.error?.message;
  } else {
    value = (props as FormFieldControlledProps).value;
    onChange = (props as FormFieldControlledProps).onChange;
  }

  const error = props.error ?? rhfError;

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-xs text-muted-foreground uppercase tracking-wider">
        {label}
        {optional && <span className="normal-case font-normal"> (optional)</span>}
      </Label>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
      />
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
