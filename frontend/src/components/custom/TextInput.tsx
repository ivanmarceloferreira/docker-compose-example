import { Controller, useController, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

export function TextInput({
  name,
  rules,
  type,
  placeholder,
  label,
}: {
  name: string;
  rules?: object;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
}) {
  const { control } = useFormContext();
  const {
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const errorMessage =
    error?.type === "required" ? "Campo Obrigatório" : error?.message;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <div>
          <p className="pb-1 font-medium">{label}</p>
          <Input
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            error={error}
            ref={ref}
          />
          {error && (
            <span className="text-xs text-red-600">{errorMessage}</span>
          )}
        </div>
      )}
    />
  );
}
