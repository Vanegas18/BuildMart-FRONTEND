import { usePermisos } from "@/core/context";
import { useState } from "react";
import { permissionsSchema } from "../NuevoPermiso/ValidacionPermiso";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useEditarPermiso = (onPermisoEditado, permiso) => {
  // Estados para manejar la apertura del diálogo, carga y categorías
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { editarPermiso } = usePermisos();

  // Guardamos el nombre original para usarlo al editar
  const nombreOriginal = permiso.nombreGrupo;

  // Configuración del formulario con Zod y react-hook-form
  const form = useForm({
    resolver: zodResolver(permissionsSchema),
    defaultValues: {
      nombreGrupo: permiso.nombreGrupo,
      permisos: permiso.permisos,
    },
  });

  // Función de submit con manejo de errores y estado de carga
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);

      await editarPermiso({
        ...data,
        nombreOriginal,
      });

      setOpen(false);

      form.reset();

      onPermisoEditado?.();

      // Toast de éxito
      toast.success("Permiso editado exitosamente", {
        description: `Se ha editado ${data.nombreGrupo}`,
      });
    } catch (error) {
      console.error("Error al editar el permiso:", error);

      toast.error("Error al editar el permiso", {
        description:
          error.message || "No se pudo guardar el permiso. Intente nuevamente.",
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
