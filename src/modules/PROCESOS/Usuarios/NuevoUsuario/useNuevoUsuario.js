// Actualización del hook useNuevoUsuario.js
import { useUsuarios } from "@/core/context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserSchema } from "./ValidacionUsuario";
import { toast } from "sonner";

// Asegúrate de definir esta constante o importarla desde donde corresponda
const ROL_ADMINISTRADOR = "64f7dca88e91f9c93cea8b13"; // Reemplaza con el ID real del rol administrador

export const useNuevoUsuario = ({ onUsuarioCreado }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { crearUsuario } = useUsuarios();

  // Configuración del formulario con Zod y react-hook-form
  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      cedula: "",
      nombre: "",
      correo: "",
      contraseña: "Administrador123,",
      telefono: "",
      direccion: "",
      rol: "", // Debe ser un string vacío inicialmente
    },
    mode: "onChange", // Validación mientras el usuario escribe
  });

  // Función de submit con manejo de errores y estado de carga
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);

      // Asegura que si no hay rol seleccionado, se asigne el rol de administrador
      if (!data.rol || data.rol === "") {
        data.rol = ROL_ADMINISTRADOR;
      }

      console.log("Datos a enviar:", data); // Para depuración
      console.log("Datos a enviar completos:", JSON.stringify(data));
      await crearUsuario(data);

      setOpen(false);
      form.reset();
      
      onUsuarioCreado?.();

      // Toast de éxito
      toast.success("Usuario creado exitosamente", {
        description: `Se ha añadido ${data.nombre}`,
      });
    } catch (error) {
      console.error("Error al crear el usuario:", error);

      // Mostrar error específico en la consola para depuración
      if (error.response?.data?.error?.issues) {
        console.log("Errores de validación:", error.response.data.error.issues);
      }

      toast.error("Error al crear el usuario", {
        description:
          error.response?.data?.error?.message ||
          error.response?.data?.error ||
          "No se pudo guardar el usuario. Intente nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  });

  return {
    open,
    setOpen,
    loading,
    form,
    onSubmit,
  };
};
