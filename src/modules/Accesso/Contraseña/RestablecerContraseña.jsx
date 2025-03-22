import { useState, useEffect } from "react";
import { HeaderAccess } from "../Layout";
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
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { resetPasswordRequest, verifyTokenRequest } from "@/core/api";

export const RestablecerContraseña = () => {
  // Parámetros y navegación
  const { token } = useParams();
  const navigate = useNavigate();

  // Estados del componente
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificando, setVerificando] = useState(true);
  const [tokenValido, setTokenValido] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Verificar token al cargar el componente
  useEffect(() => {
    const verificarToken = async () => {
      try {
        await verifyTokenRequest();
        setTokenValido(true);
      } catch (err) {
        setError("El enlace de recuperación no es válido o ha expirado");
      } finally {
        setVerificando(false);
      }
    };

    if (token) {
      verificarToken();
    } else {
      setError("No se proporcionó un token de recuperación");
      setVerificando(false);
    }
  }, [token]);

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    // Validar que las contraseñas coincidan
    if (nuevaContraseña !== confirmarContraseña) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Validar longitud mínima
    if (nuevaContraseña.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setLoading(true);

    try {
      const response = await resetPasswordRequest({
        token,
        nuevaContraseña,
      });

      setMensaje(response.data.message);
      setIsSubmitted(true);

      // Redireccionar al login después de 3 segundos
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.error || "Error al restablecer la contraseña"
      );
    } finally {
      setLoading(false);
    }
  };

  // Vista de carga mientras se verifica el token
  if (verificando) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <HeaderAccess />
        <main className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="mt-4 text-gray-600">Verificando enlace...</p>
          </div>
        </main>
      </div>
    );
  }

  // Vista de error si el token no es válido
  if (!tokenValido) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <HeaderAccess />
        <main className="flex-1 flex items-center justify-center p-4 md:p-8">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-red-600">
                Enlace no válido
              </CardTitle>
              <CardDescription>
                El enlace que has utilizado no es válido o ha expirado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="bg-red-50 border-red-200">
                <AlertTitle className="text-red-800">Error</AlertTitle>
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
              <Button
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate("/forgot-password")}>
                Solicitar nuevo enlace
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link
                to="/login"
                className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Iniciar Sesión
              </Link>
            </CardFooter>
          </Card>
        </main>
      </div>
    );
  }

  // Vista principal para restablecer contraseña
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
                    Contraseña actualizada
                  </AlertTitle>
                  <AlertDescription className="text-green-700">
                    {mensaje || "Tu contraseña ha sido restablecida con éxito."}
                    <div className="mt-2">Redireccionando al login...</div>
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="nuevaContraseña">Nueva contraseña</Label>
                  <Input
                    id="nuevaContraseña"
                    type="password"
                    value={nuevaContraseña}
                    onChange={(e) => setNuevaContraseña(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmarContraseña">
                    Confirmar contraseña
                  </Label>
                  <Input
                    id="confirmarContraseña"
                    type="password"
                    value={confirmarContraseña}
                    onChange={(e) => setConfirmarContraseña(e.target.value)}
                    placeholder="Repite tu contraseña"
                    required
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
