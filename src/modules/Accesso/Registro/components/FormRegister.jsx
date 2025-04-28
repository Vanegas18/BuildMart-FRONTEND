// Importaciones de componentes UI
import { Button } from "@/shared/components/ui";
import { CardContent } from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom"; // Corregido a react-router-dom
import { useRegisterForm } from "@/modules/Accesso/hooks/useRegisterForm";
import { FormField, PasswordField } from "../../layout";
import { Separator } from "@/shared/components/ui/separator";
import { User } from "lucide-react";

export const FormRegister = () => {
  // Estado para controlar el estado de carga
  const [isLoading, setIsLoading] = useState(false);

  // Hook personalizado para manejar la lógica del formulario
  const { register, handleSubmit, errors, onFormSubmit } = useRegisterForm({
    setIsLoading,
  });

  return (
    <CardContent className="max-h-[80vh] overflow-y-auto w-full max-w-4xl mx-auto mt-4">
      {/* Encabezado del formulario */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center text-gray-800">
          <User className="mr-2 h-5 w-5" />
          Registro de Cliente
        </h2>
        <p className="text-gray-600 mt-1">
          Complete el formulario para crear su cuenta y registrarse como
          cliente.
        </p>
        <Separator className="my-3" />
      </div>

      {/* Formulario de registro */}
      <form className="space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
        {/* Sección de Información Básica */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">
            Información Personal
          </h3>

          {/* Campo de cédula */}
          <FormField
            id="cedula"
            label="Número de Identificación"
            type="number"
            placeholder="1234567890"
            register={register}
            errors={errors}
            rules={{
              required: "El número de identificación es requerido",
              pattern: {
                value: /^\d{7,15}$/,
                message: "Debe contener entre 7 y 15 dígitos numéricos",
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

          {/* Campo de contraseña */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="contraseña">Contraseña</Label>
            </div>
            <PasswordField
              id="contraseña"
              register={register}
              errors={errors}
              rules={{
                required: "La contraseña es requerida",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "La contraseña debe incluir mayúsculas, minúsculas, números y caracteres especiales",
                },
              }}
            />
          </div>
        </div>

        {/* Términos y condiciones */}
        <div className="pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm font-normal">
              Acepto los{" "}
              <Link to="/legal" className="text-blue-600 hover:text-blue-800">
                términos y condiciones
              </Link>
            </Label>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="border-gray-300 hover:bg-gray-100 transition-all sm:flex-1"
            onClick={() => window.history.back()}>
            Cancelar
          </Button>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all sm:flex-1"
            disabled={isLoading}>
            {isLoading ? "Creando cuenta..." : "Registrarse"}
          </Button>
        </div>
      </form>

      {/* Enlace para iniciar sesión */}
      <div className="mt-6 text-center text-sm">
        <span className="text-gray-500">¿Ya tienes una cuenta?</span>{" "}
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-800 font-medium">
          Iniciar sesión
        </Link>
      </div>
    </CardContent>
  );
};
