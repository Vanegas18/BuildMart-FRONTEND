import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPasswordRequest } from "@/core/api";

export const usePasswordReset = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetPassword = async (data) => {
    if (data.nuevaContraseña !== data.confirmarContraseña) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const token = new URLSearchParams(location.search).get("token");
      const response = await resetPasswordRequest({
        token,
        nuevaContraseña: data.nuevaContraseña,
      });

      setMessage(response.data.message || "Contraseña restablecida con éxito");
      setIsSubmitted(true);

      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(
        err.response?.data?.error || "Error al restablecer la contraseña"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, message, isSubmitted, resetPassword };
};
