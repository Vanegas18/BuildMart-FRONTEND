import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { forgotPasswordRequest } from "@/core/api";
import { FormField, HeaderAccess } from "../../layout";
import { useForm } from "react-hook-form";

export const RecuperarContraseña = () => {
  // Hook de navegación
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: { correo: "" },
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Manejador de envío del formulario
  const onSubmit = async (data) => {
    setError("");
    setMensaje("");

    try {
      const response = await forgotPasswordRequest({ correo: data.correo });
      setMensaje(response.data.message);
      setIsSubmitted(true);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Error al solicitar recuperación de contraseña"
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header del componente */}
      <HeaderAccess />

      {/* Contenido principal */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md">
          {/* Cabecera de la tarjeta */}
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Recuperar Contraseña
            </CardTitle>
            <CardDescription>
              Ingresa tu correo electrónico para recuperar tu contraseña
            </CardDescription>
          </CardHeader>

          {/* Contenido de la tarjeta */}
          <CardContent>
            {/* Alerta de error */}
            {error && (
              <Alert className="mb-4 bg-red-50 border-red-200">
                <AlertTitle className="text-red-800">Error</AlertTitle>
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Vista condicional: Solicitud enviada o formulario */}
            {isSubmitted ? (
              // Vista de confirmación de envío
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <Send className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">
                    Solicitud enviada
                  </AlertTitle>
                  <AlertDescription className="text-green-700">
                    Hemos enviado un correo a <strong>{watch("correo")}</strong>{" "}
                    con instrucciones para restablecer tu contraseña. Por favor
                    revisa tu bandeja de entrada y sigue las instrucciones.
                  </AlertDescription>
                </Alert>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate("/login")}>
                  Volver a Iniciar Sesión
                </Button>
              </div>
            ) : (
              // Formulario de recuperación
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
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
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}>
                  {isSubmitted ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Recuperar Contraseña"
                  )}
                </Button>
              </form>
            )}
          </CardContent>

          {/* Pie de la tarjeta */}
          <CardFooter className="flex justify-center">
            {!isSubmitted && (
              <Link
                to={"/login"}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Iniciar Sesión
              </Link>
            )}
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};
