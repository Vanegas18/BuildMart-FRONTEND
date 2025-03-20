import { Button } from "@/components/ui";
import { CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { FormField } from "./FormField";
import { PasswordField } from "./PasswordField";

export const FormRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors, onFormSubmit } = useRegisterForm({
    setIsLoading,
  });

  return (
    <CardContent>
      <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
        <FormField
          id="cedula"
          label="Cédula"
          type="number"
          placeholder="1234567890"
          register={register}
          errors={errors}
          rules={{
            required: "La cédula es requerida",
            pattern: {
              value: /^\d{7,15}$/,
              message: "La cedula debe contener entre 7 y 15 dígitos numéricos",
            },
          }}
        />

        <FormField
          id="nombre"
          label="Nombre completo"
          placeholder="Juan Pérez González"
          register={register}
          errors={errors}
          rules={{
            required: "El nombre es requerido",
            minLength: {
              value: 10,
              message: "El nombre debe tener al menos 10 caracteres",
            },
          }}
        />

        <FormField
          id="correo"
          label="Correo electrónico"
          type="email"
          placeholder="tu@ejemplo.com"
          register={register}
          errors={errors}
          rules={{
            required: "El correo es requerido",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "El correo es inválido",
            },
          }}
        />

        <PasswordField
          id="contraseña"
          label="Contraseña"
          register={register}
          errors={errors}
        />

        <FormField
          id="telefono"
          label="Teléfono"
          type="tel"
          placeholder="+58 412 1234567"
          register={register}
          errors={errors}
          rules={{
            required: "El teléfono es requerido",
            pattern: {
              value: /^\d{7,15}$/,
              message:
                "El teléfono debe contener entre 7 y 15 dígitos numéricos",
            },
          }}
        />

        <FormField
          id="direccion"
          label="Dirección"
          placeholder="Av. Principal, Edificio/Casa, Ciudad"
          register={register}
          errors={errors}
          rules={{
            required: "La dirección es requerida",
            minLength: {
              value: 15,
              message: "La dirección debe tener al menos 15 caracteres",
            },
          }}
        />

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-sm font-normal">
            Acepto los{" "}
            <Link to={"/terms"} className="text-blue-600 hover:text-blue-800">
              términos y condiciones
            </Link>
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}>
          {isLoading ? "Creando cuenta..." : "Registrarse"}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        <span className="text-gray-500">¿Ya tienes una cuenta?</span>{" "}
        <Link
          to={"/login"}
          className="text-blue-600 hover:text-blue-800 font-medium">
          Iniciar sesión
        </Link>
      </div>
    </CardContent>
  );
};
