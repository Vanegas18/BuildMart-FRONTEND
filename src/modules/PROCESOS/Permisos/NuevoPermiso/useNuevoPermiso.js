import { usePermisos } from "@/core/context";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { permissionsSchema } from "./ValidacionPermiso";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export const useNuevoPermiso = (onPermisoCreado) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { crearPermiso } = usePermisos();

  // Configuración del formulario con Zod y react-hook-form
  const form = useForm({
    resolver: zodResolver(permissionsSchema),
    defaultValues: {
      nombreGrupo: "",
      permisos: [],
    },
  });

  // Función de submit con manejo de errores y estado de carga
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);

      await crearPermiso(data);

      setOpen(false);

      form.reset();

      onPermisoCreado?.();

      // Toast de éxito
      toast.success("Permiso creado exitosamente", {
        description: `Se ha añadido ${data.nombreGrupo}`,
      });
    } catch (error) {
      console.error("Error al crear el permiso:", error);

      toast.error("Error al crear el permiso", {
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
