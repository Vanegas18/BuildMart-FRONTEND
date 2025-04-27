import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { categoriaProvSchema } from "../NuevaCategoria/categoriaProvSchema";
import { useCatProveedores } from "@/core/context/CatProveedores";

// Hook personalizado para manejar la edición
export const useEditarCategoria = ({ CatProveedor, onCategoriaEditada }) => {
  // Estados para manejar la apertura del diálogo y carga
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { actualizarCatProveedor } = useCatProveedores();

  // Configuración del formulario con Zod y react-hook-form 
  const form = useForm({
    resolver: zodResolver(categoriaProvSchema),
    defaultValues: {
      categoriaProveedorId: CatProveedor.categoriaProveedorId,
      nombre: CatProveedor.nombre,
      descripcion: CatProveedor.descripcion,
    },
    mode: "onChange", // Validación mientras el usuario escribe
  });

  // Efecto para resetear el formulario cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      form.reset({
        categoriaProveedorId: CatProveedor.categoriaProveedorId,
        nombre: CatProveedor.nombre,
        descripcion: CatProveedor.descripcion,
      });
    }
  }, [open, CatProveedor, form]);

  // Función de submit con manejo de errores y estado de carga
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await actualizarCatProveedor(data);

      setOpen(false);

      form.reset();

      onCategoriaEditada?.(); // Llama a la función de callback para refrescar la lista o realizar otra acción

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
