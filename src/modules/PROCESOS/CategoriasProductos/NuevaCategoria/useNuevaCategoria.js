import { useCategoriaProductos } from "@/core/context/CategoriasProductos/CategoriasContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { categoriaSchema } from "./categoriaSchema";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

export const useNuevaCategoria = (onCategoriaCreada) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { crearCategorias } = useCategoriaProductos();

  // Configuración del formulario con Zod y react-hook-form
  const form = useForm({
    resolver: zodResolver(categoriaSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
    },
  });

  // Función de submit con manejo de errores y estado de carga
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);

      await crearCategorias(data);

      setOpen(false);

      form.reset();

      onCategoriaCreada?.();

      toast.success("Categoría creada exitosamente", {
        description: `Se ha añadido ${data.nombre} al inventario`,
      });
    } catch (error) {
      console.error("Error al crear la categoría:", error);

      toast.error("Error al crear la categoría", {
        description:
          error.message ||
          "No se pudo guardar la categoría. Intente nuevamente.",
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
