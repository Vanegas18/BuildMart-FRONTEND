// Importaciones de componentes UI
import { Button } from "@/shared/components/ui";
import { CardContent } from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { useState } from "react";
import { Link } from "react-router";
import { useRegisterForm } from "@/modules/Accesso/hooks/useRegisterForm";
import { FormField, PasswordField } from "../../layout";

export const FormRegister = () => {
  // Estado para controlar el estado de carga
  const [isLoading, setIsLoading] = useState(false);

  // Hook personalizado para manejar la lógica del formulario
  const { register, handleSubmit, errors, onFormSubmit } = useRegisterForm({
    setIsLoading,
  });

  return (
    <CardContent>
      {/* Formulario de registro */}
      <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
        {/* Campo de cédula */}
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

        {/* Campo de nombre completo */}
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

        {/* Campo de correo electrónico */}
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

        {/* Campo de contraseña */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <PasswordField
            id="contraseña"
            label="Contraseña"
            register={register}
            errors={errors}
          />
        </div>

        {/* Campo de teléfono */}
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

        {/* Campo de dirección */}
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

        {/* Campo de departamento */}
        <FormField
          id="departamento"
          label="Departamento"
          placeholder="Ej: Antioquia"
          register={register}
          errors={errors}
          rules={{
            required: "El departamento es requerido",
            minLength: {
              value: 4,
              message: "El departamento debe tener al menos 4 caracteres",
            },
          }}
        />

        {/* Campo de ciudad */}
        <FormField
          id="ciudad"
          label="Ciudad"
          placeholder="Ej: Medellín"
          register={register}
          errors={errors}
          rules={{
            required: "La ciudad es requerida",
            minLength: {
              value: 3,
              message: "La ciudad debe tener al menos 3 caracteres",
            },
          }}
        />

        {/* Checkbox de términos y condiciones */}
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-sm font-normal">
            Acepto los{" "}
            <Link to={"/terms"} className="text-blue-600 hover:text-blue-800">
              términos y condiciones
            </Link>
          </Label>
        </div>

        {/* Botón de envío */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}>
          {isLoading ? "Creando cuenta..." : "Registrarse"}
        </Button>
      </form>

      {/* Enlace para iniciar sesión */}
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
