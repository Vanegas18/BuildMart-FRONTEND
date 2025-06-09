import { useState } from "react";
import { resetPasswordRequest } from "@/core/api/Acceso";
import { toast } from "sonner";

export const usePasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const resetPassword = async (data, token) => {
    // Validación de contraseñas
    if (data.nuevaContraseña !== data.confirmarContraseña) {
      setError("Las contraseñas no coinciden");
      toast.error("Las contraseñas no coinciden");
      return;
    }

    // Validación de longitud mínima
    if (data.nuevaContraseña.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await resetPasswordRequest({
        token: token,
        nuevaContraseña: data.nuevaContraseña,
      });

      if (response.data) {
        setIsSubmitted(true);
        setMessage(
          response.data.message || "Contraseña restablecida exitosamente"
        );
        toast.success("Contraseña restablecida exitosamente");

        // Redirigir después de 3 segundos
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Error al restablecer la contraseña. Inténtalo de nuevo.";

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    isSubmitted,
    message,
    resetPassword,
    setError, // Para limpiar errores si es necesario
  };
};
