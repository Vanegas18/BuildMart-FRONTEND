import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { usePermisos, useRoles } from "@/core/context";
import { rolesSchema } from "../NuevoRol/ValidacionRol";

// Hook personalizado para manejar la edición
export const useEditarRol = ({ onRolEditado, rol }) => {
  // Estados para manejar la apertura del diálogo y carga
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { editarRol } = useRoles();
  const { permisos, obtenerPermisos } = usePermisos();

  // Guardamos el nombre original para usarlo al editar
  const nombreOriginal = rol.nombre;

  // Obtener los permisos al montar el componente
  useEffect(() => {
    obtenerPermisos();
  }, [obtenerPermisos]);

  // Configuración del formulario con Zod y react-hook-form
  const form = useForm({
    resolver: zodResolver(rolesSchema),
    defaultValues: {
      nombre: rol.nombre,
      descripcion: rol.descripcion,
      permisos: Array.isArray(rol.permisos)
        ? rol.permisos.map((p) => (typeof p === "object" ? p._id : p))
        : [],
    },
    mode: "onChange", // Validación mientras el usuario escribe
  });

  // Efecto para resetear el formulario cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      form.reset({
        nombre: rol.nombre,
        descripcion: rol.descripcion,
        permisos: Array.isArray(rol.permisos)
          ? rol.permisos.map((p) => (typeof p === "object" ? p._id : p))
          : [],
      });
    }
  }, [open, rol, form]);

  // Función de submit con manejo de errores y estado de carga
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);

      await editarRol({
        ...data,
        nombreOriginal,
      });

      setOpen(false);

      form.reset();

      onRolEditado?.();

      // Toast de éxito
      toast.success("Rol editado exitosamente", {
        description: `Se ha editado ${data.nombre} correctamente`,
      });
    } catch (error) {
      console.error("Error al editar el rol:", error);

      toast.error("Error al editar el Rol", {
        description:
          error.response?.data?.error ||
          "No se pudo editar el Rol. Intente nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  });

  return {
    open,
    setOpen,
    loading,
    permisos,
    form,
    onSubmit,
  };
};
