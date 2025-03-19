import { useForm } from "react-hook-form";
import { registerRequest } from "@/api";
import { toast } from "sonner";

export const useRegisterForm = ({ onSuccess, setIsLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await registerRequest(values);

      if (res && res.data) {
        toast.success("¡Cuenta creada exitosamente!");
        onSuccess && onSuccess();
      }
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
      });
    } else if (typeof backendError === "string") {
      const fieldMap = {
        cédula: "cedula",
        nombre: "nombre",
        correo: "correo",
      };

      for (const [key, fieldName] of Object.entries(fieldMap)) {
        if (backendError.includes(key)) {
          setError(fieldName, { type: "server", message: backendError });
          return;
        }
      }

      toast.error(backendError || "Error al crear la cuenta");
    }
  } else {
    toast.error("Ocurrió un error al crear la cuenta");
  }
};
