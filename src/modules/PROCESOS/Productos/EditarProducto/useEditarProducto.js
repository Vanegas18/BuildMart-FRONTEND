import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProductos } from "@/core/context/Productos/ProductosContext";
import { productoSchema } from "../NuevoProducto/validacionProducto";
import { toast } from "sonner";
import { useCategoriaProductos } from "@/core/context/CategoriasProductos/CategoriasContext";

// Hook personalizado para manejar la edición de productos
export const useEditarProducto = (onProductoEditado, producto) => {
  // Estados para manejar la apertura del diálogo, carga y categorías
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { editarProducto, editarProductoConImagen } = useProductos();
  const [imageType, setImageType] = useState("url");
  const [imageFile, setImageFile] = useState(null);
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
        estado: producto.estado || true,
        img: producto.img,
      });

      // Resetear el tipo de imagen a URL por defecto
      setImageType("url");
      setImageFile(null);
    }
  }, [open, producto, form]);

  // Handler para cambiar el tipo de imagen
  const handleImageTypeChange = (value) => {
    setImageType(value);
    // Limpiar el campo de imagen cuando cambia el tipo
    if (value === "url") {
      form.setValue("img", producto.img || "");
    } else {
      form.setValue("img", "");
    }
    setImageFile(null);
  };

  // Handler para el cambio de archivo
  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setImageFile(e.target.files[0]);
    }
  };

  // Función de submit con manejo de errores y estado de carga
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);

      if (imageType === "url") {
        // Si es URL, enviar datos normales
        await editarProducto({
          ...data,
          precioCompra: parseFloat(data.precioCompra),
          stock: parseInt(data.stock, 10),
        });
      } else {
        // Si es archivo, preparar FormData
        const formData = new FormData();

        // Asegúrate de que productoId se envía como string/number y no como FormData completo
        formData.append("productoId", data.productoId.toString());

        // Agregar campos del producto al FormData
        formData.append("nombre", data.nombre);
        formData.append("descripcion", data.descripcion);
        formData.append("categoriaId", data.categoriaId);
        formData.append("precioCompra", data.precioCompra.toString());
        formData.append("stock", data.stock.toString());

        // Asegúrate de que el estado se envía correctamente
        if (data.estado !== undefined) {
          formData.append("estado", data.estado.toString());
        }

        // Agregar archivo de imagen si existe
        if (imageFile) {
          formData.append("image", imageFile);
        }

        await editarProductoConImagen(data, formData);
      }

      setOpen(false);
      form.reset();
      setImageFile(null);

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
    imageType,
    handleImageTypeChange,
    handleFileChange,
    imageFile,
  };
};
