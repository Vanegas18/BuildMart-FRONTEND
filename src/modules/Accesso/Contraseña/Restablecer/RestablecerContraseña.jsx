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
import { ArrowLeft, Check, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Label } from "@/shared/components/ui/label";
import { useForm } from "react-hook-form";
import { usePasswordReset } from "../../hooks";
import { HeaderAccess, PasswordField } from "../../layout";

// Componente para mostrar token inválido
const InvalidTokenView = ({ error, navigate }) => (
  <div className="flex min-h-screen flex-col bg-gray-50">
    <HeaderAccess />
    <main className="flex-1 flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-red-600">
            Token Inválido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="bg-red-50 border-red-200">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Error</AlertTitle>
            <AlertDescription className="text-red-700">
              {error || "El enlace de recuperación no es válido o ha expirado."}
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            to="/forgot-password"
            className="flex items-center text-sm text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Solicitar nuevo enlace
          </Link>
        </CardFooter>
      </Card>
    </main>
  </div>
);

export const RestablecerContraseña = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onSubmit",
    defaultValues: { nuevaContraseña: "", confirmarContraseña: "" },
  });

  const { loading, error, isSubmitted, message, resetPassword, setError } =
    usePasswordReset();

  // Verificar si el token es válido
  const token = new URLSearchParams(location.search).get("token");

  if (!token) {
    return (
      <InvalidTokenView
        error="No se proporcionó un token de recuperación"
        navigate={navigate}
      />
    );
  }

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    await resetPassword(data, token);
  };

  // Validaciones personalizadas
  const nuevaContraseña = watch("nuevaContraseña");

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <HeaderAccess />

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Restablecer Contraseña
            </CardTitle>
            <CardDescription>
              Crea una nueva contraseña para tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Alerta de error */}
            {error && (
              <Alert className="mb-4 bg-red-50 border-red-200">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Error</AlertTitle>
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Vista condicional: Éxito o formulario */}
            {isSubmitted ? (
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">
                    ¡Contraseña actualizada!
                  </AlertTitle>
                  <AlertDescription className="text-green-700">
                    {message || "Tu contraseña ha sido restablecida con éxito."}
                    <div className="mt-2 text-sm">
                      Redireccionando al inicio de sesión en 3 segundos...
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label htmlFor="nuevaContraseña">Nueva contraseña</Label>
                  <PasswordField
                    id="nuevaContraseña"
                    label="Contraseña"
                    register={register}
                    errors={errors}
                    validation={{
                      required: "La contraseña es requerida",
                      minLength: {
                        value: 6,
                        message:
                          "La contraseña debe tener al menos 6 caracteres",
                      },
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmarContraseña">
                    Confirmar contraseña
                  </Label>
                  <PasswordField
                    id="confirmarContraseña"
                    label="Confirmar contraseña"
                    register={register}
                    errors={errors}
                    validation={{
                      required: "Confirma tu contraseña",
                      validate: (value) =>
                        value === nuevaContraseña ||
                        "Las contraseñas no coinciden",
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    "Restablecer Contraseña"
                  )}
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex justify-center">
            {!isSubmitted && (
              <Link
                to="/login"
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
