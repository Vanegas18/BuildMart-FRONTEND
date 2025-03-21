import { Button } from "@/components/ui";
import { CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router";
import { useLoginForm } from "@/hooks/useRegisterForm";
import { FormField, PasswordField } from "../Layout";

export const FormLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, onFormSubmit, errors, handleSubmit } = useLoginForm({
    setIsLoading,
  });

  return (
    <>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
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

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <Link
                to={"/recuperar-contrasena"}
                className="text-sm text-blue-600 hover:text-blue-800">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <PasswordField
              id="contraseña"
              label="Contraseña"
              register={register}
              errors={errors}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm font-normal">
              Recordar mi sesión
            </Label>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <span className="mr-2">Conectando...</span>
                <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
              </div>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-500">¿No tienes una cuenta?</span>{" "}
          <Link
            to={"/register"}
            className="text-blue-600 hover:text-blue-800 font-medium">
            Regístrate
          </Link>
        </div>
      </CardContent>
    </>
  );
};
