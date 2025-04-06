import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCategories } from "@/core/api";
import { useProductos } from "@/core/context/Productos/ProductosContext";
import { productoSchema } from "./validacionProducto";
import { toast } from "sonner";
import { useCategoriaProductos } from "@/core/context/CategoriasProductos/CategoriasContext";

export const useNuevoProducto = (onProductoCreado) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageType, setImageType] = useState("url");
  const [imageFile, setImageFile] = useState(null);
  const { crearProductos, crearProductosConImagen } = useProductos();
  const { categorias, obtenerCategorias } = useCategoriaProductos();

  // Obtener las categorías de productos
  useEffect(() => {
    obtenerCategorias();
  }, [obtenerCategorias]);

  // Configuración del formulario con Zod y react-hook-form
  const form = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      categoriaId: "",
      precioCompra: "",
      stock: "",
      img: "",
      imageType: "url",
    },
  });

  // Handler para cambiar el tipo de imagen
  const handleImageTypeChange = (value) => {
    setImageType(value);
    // Limpiar el campo de imagen cuando cambia el tipo
    form.setValue("img", "");
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
        await crearProductos({
          ...data,
          precioCompra: parseFloat(data.precioCompra),
          stock: parseInt(data.stock, 10),
        });
      } else {
        // Si es archivo, preparar FormData
        const formData = new FormData();

        // Agregar campos del producto al FormData
        formData.append("nombre", data.nombre);
        formData.append("descripcion", data.descripcion);
        formData.append("categoriaId", data.categoriaId);
        formData.append("precioCompra", data.precioCompra);
        formData.append("stock", data.stock);

        // Agregar archivo de imagen si existe
        if (imageFile) {
          formData.append("image", imageFile);
        }

        await crearProductosConImagen(formData);
      }

      setOpen(false);

      form.reset();
      setImageFile(null);

      onProductoCreado?.();

      // Toast de éxito
      toast.success("Producto creado exitosamente", {
        description: `Se ha añadido ${data.nombre} al inventario`,
      });
    } catch (error) {
      console.error("Error al crear el producto:", error);

      toast.error("Error al crear el producto", {
        description:
          error.message ||
          "No se pudo guardar el producto. Intente nuevamente.",
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
