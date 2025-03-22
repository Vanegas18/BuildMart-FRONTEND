import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui";
import { Eye, EyeOff } from "lucide-react";

export const PasswordField = ({ id, label, register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          {...register(id, {
            required: "La contraseña es requerida",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
            validate: {
              hasUpperCase: (value) =>
                /[A-Z]/.test(value) ||
                "La contraseña debe incluir al menos una letra mayúscula",
              hasNumber: (value) =>
                /[0-9]/.test(value) ||
                "La contraseña debe incluir al menos un número",
              hasSpecialChar: (value) =>
                /[^A-Za-z0-9]/.test(value) ||
                "La contraseña debe incluir al menos un carácter especial",
            },
          })}
          className={errors[id] ? "border-red-500" : ""}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-gray-500" />
          ) : (
            <Eye className="h-4 w-4 text-gray-500" />
          )}
        </Button>
      </div>
      {errors[id] && (
        <p className="text-sm text-red-500">{errors[id].message}</p>
      )}
    </>
  );
};
