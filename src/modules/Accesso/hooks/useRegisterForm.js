import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "../../../core/context/Acceso/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useRegisterForm = ({ setIsLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const onFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      await signup(values);
    } catch (error) {
      handleFormError(error, setError);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onFormSubmit,
  };
};

export const useLoginForm = ({ setIsLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();
  const { signin, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const onFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      await signin(values);
    } catch (error) {
      console.log(error);
      handleFormError(error, setError);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onFormSubmit,
  };
};

const handleFormError = (error, setError) => {
  console.error("Error al registrar:", error);

  if (error.response && error.response.data) {
    const { error: backendError } = error.response.data;

    if (backendError?.issues) {
      backendError.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        setError(fieldName, {
          type: "server",
          message: issue.message,
        });
        // Mostrar toast para cada error
        toast.error(issue.message);
      });
    } else if (typeof backendError === "string") {
      // Mapa mejorado para detectar campos en mensajes de error
      const errorPatterns = {
        cedula:
          /(cédula|cedula)(?:\s+ya\s+está\s+registrada|\s+duplicada|\s+existe)/i,
        nombre: /(nombre)(?:\s+ya\s+está\s+registrado|\s+duplicado|\s+existe)/i,
        correo: /(correo)(?:\s+ya\s+está\s+registrado|\s+duplicado|\s+existe)/i,
        telefono:
          /(teléfono|telefono)(?:\s+ya\s+está\s+registrado|\s+duplicado|\s+existe)/i,
      };

      // Verificar cada campo contra el mensaje de error
      let errorAssigned = false;
      for (const [fieldName, pattern] of Object.entries(errorPatterns)) {
        if (pattern.test(backendError)) {
          setError(fieldName, {
            type: "server",
            message: backendError,
          });
          errorAssigned = true;
          // Siempre mostrar el toast, incluso si se asignó al campo
          toast.error(backendError);
          break;
        }
      }

      // Si no se pudo asignar a un campo específico, mostrar toast
      if (!errorAssigned) {
        toast.error(backendError || "Error al crear la cuenta");
      }
    }
  } else {
    toast.error("Ocurrió un error al crear la cuenta");
  }
};
