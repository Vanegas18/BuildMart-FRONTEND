import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { usePermisos, useRoles } from "@/core/context";
import { rolesSchema } from "./ValidacionRol";

export const useNuevoRol = (onRolCreado) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { crearRol } = useRoles();
  const { permisos, obtenerPermisos } = usePermisos();

  // Obtener las categorías de productos
  useEffect(() => {
    obtenerPermisos();
  }, [obtenerPermisos]);

  // Configuración del formulario con Zod y react-hook-form
  const form = useForm({
    resolver: zodResolver(rolesSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      permisos: [],
    },
  });

  // Función de submit con manejo de errores y estado de carga
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);

      await crearRol(data);

      setOpen(false);

      form.reset();

      onRolCreado?.();

      // Toast de éxito
      toast.success("Rol creado exitosamente", {
        description: `Se ha añadido ${data.nombre}`,
      });
    } catch (error) {
      console.error("Error al crear el rol:", error);

      toast.error("Error al crear el rol", {
        description:
          error.message || "No se pudo guardar el rol. Intente nuevamente.",
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
