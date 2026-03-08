import { useController, Control, FieldValues, FieldPath } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CurrencyInputBaseProps {
  placeholder?: string;
  currency?: string;
  onCurrencyChange?: (currency: string) => void;
  currencies?: string[];
  fixedCurrency?: string;
  disabled?: boolean;
}

interface CurrencyInputControlledProps extends CurrencyInputBaseProps {
  value: string;
  onChange: (value: string) => void;
  sign: 1 | -1;
  onSignChange: (sign: 1 | -1) => void;
  control?: undefined;
  name?: undefined;
  signName?: undefined;
}

interface CurrencyInputRHFProps<T extends FieldValues = FieldValues> extends CurrencyInputBaseProps {
  control: Control<T>;
  name: FieldPath<T>;
  signName: FieldPath<T>;
  currencyName?: FieldPath<T>;
  value?: undefined;
  onChange?: undefined;
  sign?: undefined;
  onSignChange?: undefined;
}

type CurrencyInputProps<T extends FieldValues = FieldValues> = CurrencyInputControlledProps | CurrencyInputRHFProps<T>;

export function CurrencyInput<T extends FieldValues = FieldValues>(props: CurrencyInputProps<T>) {
  const {
    placeholder = "0.00",
    currencies,
    fixedCurrency,
    disabled,
  } = props;

  let value: string;
  let onChange: (v: string) => void;
  let sign: 1 | -1;
  let onSignChange: (s: 1 | -1) => void;
  let currency = props.currency;
  let onCurrencyChange = props.onCurrencyChange;

  if (props.control && props.name && props.signName) {
    const valCtrl = useController({ control: props.control, name: props.name });
    const signCtrl = useController({ control: props.control, name: props.signName });
    value = valCtrl.field.value;
    onChange = valCtrl.field.onChange;
    sign = signCtrl.field.value;
    onSignChange = signCtrl.field.onChange;
    if (props.currencyName) {
      const curCtrl = useController({ control: props.control, name: props.currencyName });
      currency = curCtrl.field.value;
      onCurrencyChange = curCtrl.field.onChange;
    }
  } else {
    const controlled = props as CurrencyInputControlledProps;
    value = controlled.value;
    onChange = controlled.onChange;
    sign = controlled.sign;
    onSignChange = controlled.onSignChange;
  }

  return (
    <div className="flex gap-2">
      <div className="flex flex-1">
        <button
          type="button"
          className="flex items-center justify-center px-2.5 border border-r-0 border-input rounded-l-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={() => onSignChange(sign === 1 ? -1 : 1)}
          title="Flip sign"
          disabled={disabled}
        >
          {sign === 1 ? "+" : "−"}
        </button>
        <Input
          type="number"
          step="0.01"
          min="0"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            onChange(v.startsWith("-") ? v.slice(1) : v);
          }}
          placeholder={placeholder}
          className="rounded-l-none"
          disabled={disabled}
        />
      </div>
      {fixedCurrency && (
        <span className="flex items-center text-sm text-muted-foreground px-2">
          {fixedCurrency}
        </span>
      )}
      {currencies && currency && onCurrencyChange && (
        <Select value={currency} onValueChange={onCurrencyChange} disabled={disabled}>
          <SelectTrigger className="w-[90px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            {currencies.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
