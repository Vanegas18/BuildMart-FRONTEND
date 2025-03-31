import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCategories } from "@/core/api";
import { useProductos } from "@/core/context/Productos/ProductosContext";
import { productoSchema } from "../NuevoProducto/validacionProducto";
import { toast } from "sonner";
import { useCategoriaProductos } from "@/core/context/CategoriasProductos/CategoriasContext";

// Hook personalizado para manejar la edición de productos
export const useEditarProducto = (onProductoEditado, producto) => {
  // Estados para manejar la apertura del diálogo, carga y categorías
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { editarProducto } = useProductos();
  const { categorias, obtenerCategorias } = useCategoriaProductos();

  // Obtener las categorías de productos
  useEffect(() => {
    obtenerCategorias();
  }, [obtenerCategorias]);

  // Configuración del formulario con Zod y react-hook-form
  const form = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      productoId: producto.productoId,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      categoriaId: producto.categoriaId._id, // Extraer solo el ID de la categoría
      precioCompra: producto.precioCompra,
      stock: producto.stock,
      estado: producto.estado,
      img: producto.img,
    },
  });

  // Efecto para resetear el formulario cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      form.reset({
        productoId: producto.productoId,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        categoriaId: producto.categoriaId._id,
        precioCompra: producto.precioCompra,
        stock: producto.stock,
        estado: producto.estado,
        img: producto.img,
      });
    }
  }, [open, producto, form]);

  // Función de submit con manejo de errores y estado de carga
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);

      await editarProducto(data);

      setOpen(false);

      form.reset();

      onProductoEditado?.();

      // Toast de éxito
      toast.success("Producto editado exitosamente", {
        description: `Se ha editado ${data.nombre} correctamente`,
      });
    } catch (error) {
      console.error("Error al editar el producto:", error);

      toast.error("Error al editar el producto", {
        description:
          error.message || "No se pudo editar el producto. Intente nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  });

  return {
    open,
    setOpen,
    loading,
    categorias,
    form,
    onSubmit,
  };
};
