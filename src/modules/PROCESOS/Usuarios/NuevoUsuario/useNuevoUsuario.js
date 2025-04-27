import { useUsuarios } from "@/core/context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserSchema } from "./ValidacionUsuario";
import { toast } from "sonner";

export const useNuevoUsuario = ({ onUsuarioCreado }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { crearUsuario } = useUsuarios();

  // ID del rol de administrador por defecto
  const ROL_ADMINISTRADOR = "67cb9a4fa5866273d8830fad";

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
      rol: ROL_ADMINISTRADOR,
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

      toast.error("Error al crear el usuario", {
        description:
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
