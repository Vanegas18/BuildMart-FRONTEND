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
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, rules)}
        className={errors[id] ? "border-red-500" : ""}
      />
      {errors[id] && (
        <p className="text-sm text-red-500">{errors[id].message}</p>
      )}
    </div>
  );
};
