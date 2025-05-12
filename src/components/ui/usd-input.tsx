import { Controller, useFormContext } from "react-hook-form";
import { Input } from "./input";

interface USDInputProps {
  name: string;
  placeholder?: string;
  errorMessage?: string;
}

export function USDInput({ name, placeholder, errorMessage }: USDInputProps) {
  const { control } = useFormContext();

  const formatCurrency = (val: string) => {
    const numeric = val.replace(/\D/g, "");
    const asNumber = Number(numeric) / 100;
    return asNumber.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="space-y-1.5">
          <Input
            id={name}
            type="text"
            placeholder={placeholder}
            value={field.value}
            onChange={(e) => {
              let rawValue = e.target.value;
              const formattedValue = formatCurrency(rawValue);

              rawValue = formattedValue;
              field.onChange(rawValue);
            }}
          />

          {errorMessage && (
            <span className="text-xs text-red-500">{errorMessage}</span>
          )}
        </div>
      )}
    />
  );
}
