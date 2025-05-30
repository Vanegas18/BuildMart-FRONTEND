import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProductos } from "@/core/context/Productos/ProductosContext";
import { productoSchema } from "./validacionProducto";
import { toast } from "sonner";
import { useCategoriaProductos } from "@/core/context/CategoriasProductos/CategoriasContext";

export const useNuevoProducto = (onProductoCreado) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageType, setImageType] = useState("url");
  const [imageFile, setImageFile] = useState(null);
  const [selectedCategorias, setSelectedCategorias] = useState([]);
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
      categorias: [],
      precioCompra: "",
      precio: "",
      stock: "",
      img: "",
      imageType: "url",
    },
    mode: "onChange", // Validación mientras el usuario escribe
  });

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
      "categoriaIds",
      checked
        ? [...selectedCategorias, categoriaId]
        : selectedCategorias.filter((id) => id !== categoriaId)
    );
  };

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

      // Verificar que hay al menos una categoría seleccionada
      if (selectedCategorias.length === 0) {
        toast.error("Error de validación", {
          description: "Debe seleccionar al menos una categoría.",
        });
        setLoading(false);
        return;
      }

      // Preparar los datos con las categorías seleccionadas
      const productoData = {
        ...data,
        categorias: selectedCategorias,
        precioCompra: parseFloat(data.precioCompra),
        precio: parseFloat(data.precio),
        stock: parseInt(data.stock, 10),
      };

      if (imageType === "url") {
        // Si es URL, enviar datos normales
        const productoData = {
          ...data,
          categorias: selectedCategorias,
          precioCompra: parseFloat(data.precioCompra),
          precio: parseFloat(data.precio),
          stock: parseInt(data.stock, 10),
          imageType: "url", // Añadir esto explícitamente
        };
        await crearProductos(productoData);
      } else {
        // Si es archivo, preparar FormData
        const formData = new FormData();

        // Agregar campos del producto al FormData
        formData.append("nombre", data.nombre);
        formData.append("descripcion", data.descripcion);

        // Añadir cada categoría seleccionada
        selectedCategorias.forEach((categoriaId) => {
          formData.append("categorias[]", categoriaId);
        });

        formData.append("precioCompra", data.precioCompra);
        formData.append("precio", data.precio);
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
      setSelectedCategorias([]);

      onProductoCreado?.();

      // Toast de éxito
      toast.success("Producto creado exitosamente", {
        description: `Se ha añadido ${data.nombre} al inventario.`,
      });
    } catch (error) {
      console.error("Error al crear el producto:", error);

      toast.error("Error al crear el producto", {
        description:
          error.response?.data?.error ||
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
    handleCategoriaChange,
    selectedCategorias,
  };
};
