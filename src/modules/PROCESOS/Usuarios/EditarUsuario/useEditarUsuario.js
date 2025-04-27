import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useUsuarios } from "@/core/context";
import { UserSchema } from "../NuevoUsuario/ValidacionUsuario";

// Hook personalizado para manejar la edición de productos
export const useEditarUsuario = (onUsuarioEditado, usuario) => {
  // Estados para manejar la apertura del diálogo, carga y categorías
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { editarUsuario } = useUsuarios();

  // ID del rol de administrador por defecto
  const ROL_ADMINISTRADOR = "67cb9a4fa5866273d8830fad";

  // Configuración del formulario con Zod y react-hook-form
  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      usuarioId: usuario.usuarioId,
      cedula: usuario.cedula,
      nombre: usuario.nombre,
      correo: usuario.correo,
      contraseña: usuario.contraseña,
      telefono: usuario.telefono?.toString(),
      direccion: usuario.direccion,
      rol: usuario.rol,
    },
    mode: "onChange", // Validación mientras el usuario escribe
  });

  // Efecto para resetear el formulario cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      form.reset({
        usuarioId: usuario.usuarioId,
        cedula: usuario.cedula,
        nombre: usuario.nombre,
        correo: usuario.correo,
        contraseña: usuario.contraseña,
        telefono: usuario.telefono?.toString(),
        direccion: usuario.direccion,
        rol: usuario.rol,
      });
    }
  }, [open, usuario, form]);

  // Función de submit con manejo de errores y estado de carga
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);

      await editarUsuario(data);

      setOpen(false);

      form.reset();

      onUsuarioEditado?.();

      // Toast de éxito
      toast.success("Usuario editado exitosamente", {
        description: `Se ha editado ${data.nombre} correctamente`,
      });
    } catch (error) {
      console.error("Error al editar el usuario:", error);

      toast.error("Error al editar el usuario", {
        description:
          error.response?.data?.error ||
          "No se pudo editar el usuario. Intente nuevamente.",
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
