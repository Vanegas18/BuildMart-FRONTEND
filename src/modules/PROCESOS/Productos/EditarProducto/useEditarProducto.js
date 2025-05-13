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
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const { categorias, obtenerCategorias } = useCategoriaProductos();

  // Obtener las categorías de productos
  useEffect(() => {
    obtenerCategorias();
  }, [obtenerCategorias]);

  // Determinamos las categorías iniciales del producto
  const getInitialCategorias = () => {
    // Si hay categorias como array
    if (producto.categorias && Array.isArray(producto.categorias)) {
      return producto.categorias.map((cat) =>
        typeof cat === "object" ? cat._id : cat
      );
    }
    // Si existe categoriaId como objeto (retrocompatibilidad)
    else if (producto.categoriaId && typeof producto.categoriaId === "object") {
      return [producto.categoriaId._id];
    }
    // Si existe categoriaId como string (retrocompatibilidad)
    else if (producto.categoriaId) {
      return [producto.categoriaId];
    }
    // Si existe categoriasToRender del ProductTableRow
    else if (producto.categoriasToRender) {
      return Array.isArray(producto.categoriasToRender)
        ? producto.categoriasToRender.map((cat) =>
            typeof cat === "object" ? cat._id : cat
          )
        : [producto.categoriasToRender];
    }
    // Si no hay ninguna categoría
    return [];
  };

  // Configuración del formulario con Zod y react-hook-form
  const form = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      productoId: producto.productoId,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      categorias: getInitialCategorias(),
      precioCompra: producto.precioCompra,
      precio: producto.precio,
      stock: producto.stock,
      estado: producto.estado,
      img: producto.img,
    },
    mode: "onChange", // Validación mientras el usuario escribe
  });

  // Inicializar las categorías seleccionadas
  useEffect(() => {
    setSelectedCategorias(getInitialCategorias());
  }, [producto]);

  // Efecto para resetear el formulario cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      form.reset({
        productoId: producto.productoId,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        categorias: getInitialCategorias(),
        precioCompra: producto.precioCompra,
        precio: producto.precio,
        stock: producto.stock,
        estado: producto.estado || "Disponible",
        img: producto.img,
      });

      setSelectedCategorias(getInitialCategorias());

      // Resetear el tipo de imagen a URL por defecto
      setImageType("url");
      setImageFile(null);
    }
  }, [open, producto, form]);

  // Handler para añadir o eliminar categorías seleccionadas
  const handleCategoriaChange = (categoriaId, checked) => {
    setSelectedCategorias((prev) => {
      if (checked) {
        return [...prev, categoriaId];
      } else {
        return prev.filter((id) => id !== categoriaId);
      }
    });

    // Actualizar el valor en el formulario
    form.setValue(
      "categorias",
      checked
        ? [...selectedCategorias, categoriaId]
        : selectedCategorias.filter((id) => id !== categoriaId)
    );
  };

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

      // Verificar que hay al menos una categoría seleccionada
      if (selectedCategorias.length === 0) {
        toast.error("Error de validación", {
          description: "Debe seleccionar al menos una categoría",
        });
        setLoading(false);
        return;
      }

      if (imageType === "url") {
        // Si es URL, enviar datos normales
        await editarProducto({
          ...data,
          categorias: selectedCategorias,
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

        // Añadir cada categoría seleccionada
        // Solución: Enviar categorías como array en formato JSON
        formData.append("categorias", JSON.stringify(selectedCategorias));

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
          error.response?.data?.error ||
          "No se pudo editar el producto. Intente nuevamente.",
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
    handleCategoriaChange,
    selectedCategorias,
  };
};
