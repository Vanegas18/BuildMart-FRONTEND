import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  errors,
  rules = {},
  maxLength,
}) => {
  return (
    <div className="space-y-2">
      {/* Etiqueta del campo */}
      <Label htmlFor={id}>{label}</Label>
      {/* Campo de entrada */}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength} // Añade esta línea
        {...register(id, rules)}
        className={errors[id] ? "border-red-500" : ""}
      />
      {/* Mensaje de error condicional */}
      {errors[id] && (
        <p className="text-sm text-red-500">{errors[id].message}</p>
      )}
    </div>
  );
};
