import { useCategoriaProductos } from "@/core/context/CategoriasProductos/CategoriasContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { categoriaSchema } from "../NuevaCategoria/categoriaSchema";
import { toast } from "sonner";

// Hook personalizado para manejar la edición
export const useEditarCategoria = ({ onCategoriaEditada, categoria }) => {
  // Estados para manejar la apertura del diálogo y carga
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { editarCategoria } = useCategoriaProductos();

  // Configuración del formulario con Zod y react-hook-form
  const form = useForm({
    resolver: zodResolver(categoriaSchema),
    defaultValues: {
      categoriaId: categoria.categoriaId,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
    },
  });

  // Efecto para resetear el formulario cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      form.reset({
        categoriaId: categoria.categoriaId,
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
      });
    }
  }, [open, categoria, form]);

  // Función de submit con manejo de errores y estado de carga
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await editarCategoria(data);

      setOpen(false);

      form.reset();
      
      onCategoriaEditada?.();

      // Toast de éxito
      toast.success("Categoría editada exitosamente", {
        description: `Se ha editado ${data.nombre} correctamente`,
      });
    } catch (error) {
      console.error("Error al editar la categoria:", error);

      toast.error("Error al editar la Categoría", {
        description:
          error.response?.data?.error ||
          "No se pudo editar la Categoría. Intente nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    open,
    setOpen,
    loading,
    form,
    onSubmit,
  };
};
