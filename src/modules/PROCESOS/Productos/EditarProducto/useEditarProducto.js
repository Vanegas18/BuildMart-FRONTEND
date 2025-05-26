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
  const { editarProducto, editarProductoConImagen, gestionarOfertaProducto } =
    useProductos();
  const [imageType, setImageType] = useState("url");
  const [imageFile, setImageFile] = useState(null);
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const { categorias, obtenerCategorias } = useCategoriaProductos();
  const [mostrarOferta, setMostrarOferta] = useState(false);
  const [tipoOferta, setTipoOferta] = useState("descuento"); // "descuento" o "precio"

  const isoToLocalDateTime = (value) => {
    if (!value) return null;
    const d = new Date(value);
    const pad = (n) => String(n).padStart(2, "0");
    const YYYY = d.getFullYear();
    const MM = pad(d.getMonth() + 1);
    const DD = pad(d.getDate());
    const hh = pad(d.getHours());
    const mm = pad(d.getMinutes());
    return `${YYYY}-${MM}-${DD}T${hh}:${mm}`;
  };

  // Obtener las categorías de productos
  useEffect(() => {
    obtenerCategorias();
  }, [obtenerCategorias]);

  // Función para calcular precio de oferta automáticamente con validaciones
  const calcularPrecioOferta = (precio, descuento) => {
    if (!precio || !descuento || precio <= 0) return 0;

    // Validar que el descuento esté en un rango razonable (0-99%)
    if (descuento < 0 || descuento >= 100) {
      return 0; // o podrías retornar el precio original
    }

    const precioOferta = precio * (1 - descuento / 100);

    // Asegurar que el precio de oferta no sea negativo o menor a 0.01
    const precioFinal = Math.max(0.01, precioOferta);

    return Math.round(precioFinal * 100) / 100;
  };

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

  // Configuración del formulario con Zod y react-hook-form - CORREGIDO
  const form = useForm({
    resolver: zodResolver(productoSchema),
    mode: "onChange", // Validación mientras el usuario escribe
    reValidateMode: "onChange", // Re-validar en cada cambio
    criteriaMode: "all", // Mostrar todos los errores
    shouldFocusError: true, // Enfocar el primer campo con error
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
      oferta: {
        activa: producto.oferta?.activa || false,
        descuento: producto.oferta?.descuento || 0,
        precioOferta: producto.oferta?.precioOferta || 0,
        fechaInicio: isoToLocalDateTime(producto.oferta?.fechaInicio),
        fechaFin: isoToLocalDateTime(producto.oferta?.fechaFin),
        descripcionOferta: producto.oferta?.descripcionOferta || "",
      },
    },
  });

  // Obtener errores del formulario
  const {
    formState: { errors, isValid, touchedFields },
    watch,
    setValue,
    trigger,
    getValues,
    register,
    handleSubmit,
    reset,
  } = form;

  // inicializar el estado de oferta:
  useEffect(() => {
    if (open && producto.oferta) {
      setMostrarOferta(producto.oferta.activa || false);
      setTipoOferta(producto.oferta.descuento > 0 ? "descuento" : "precio");
    } else if (open) {
      setMostrarOferta(false);
      setTipoOferta("descuento");
    }
  }, [open, producto]);

  // Handler para activar/desactivar oferta - CORREGIDO
  const handleOfertaToggle = (activar) => {
    setMostrarOferta(activar);
    setValue("oferta.activa", activar, { shouldValidate: true });

    if (!activar) {
      // Limpiar campos de oferta cuando se desactiva
      setValue("oferta.descuento", 0, { shouldValidate: true });
      setValue("oferta.precioOferta", 0, { shouldValidate: true });
      setValue("oferta.fechaInicio", null, { shouldValidate: true });
      setValue("oferta.fechaFin", null, { shouldValidate: true });
      setValue("oferta.descripcionOferta", "", { shouldValidate: true });
    }

    // IMPORTANTE: Trigger validation para que los cambios se reflejen
    setTimeout(() => {
      trigger("oferta");
    }, 100);
  };

  // Handler para cambiar tipo de oferta
  const handleTipoOfertaChange = (tipo) => {
    setTipoOferta(tipo);

    if (tipo === "descuento") {
      setValue("oferta.precioOferta", 0, { shouldValidate: true });
    } else {
      setValue("oferta.descuento", 0, { shouldValidate: true });
    }

    // Trigger validation
    setTimeout(() => {
      trigger("oferta");
    }, 100);
  };

  // Handler para calcular precio automáticamente cuando cambia el descuento
  const handleDescuentoChange = (descuento) => {
    const precio = getValues("precio");

    // Validar el descuento antes de procesarlo
    if (descuento < 0) {
      descuento = 0;
      setValue("oferta.descuento", 0, { shouldValidate: true });
    } else if (descuento >= 100) {
      descuento = 99; // Máximo 99% de descuento
      setValue("oferta.descuento", 99, { shouldValidate: true });
    }

    if (tipoOferta === "descuento" && precio && descuento > 0) {
      const precioOferta = calcularPrecioOferta(precio, descuento);
      setValue("oferta.precioOferta", precioOferta, { shouldValidate: true });
    } else if (descuento === 0) {
      setValue("oferta.precioOferta", 0, { shouldValidate: true });
    }

    setValue("oferta.descuento", descuento, { shouldValidate: true });
    
    // Trigger validation después de un pequeño delay
    setTimeout(() => {
      trigger("oferta");
    }, 100);
  };

  // Inicializar las categorías seleccionadas
  useEffect(() => {
    setSelectedCategorias(getInitialCategorias());
  }, [producto]);

  // Efecto para resetear el formulario cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      const formatearFecha = (fecha) => {
        if (!fecha) return null;

        try {
          const date = new Date(fecha);
          if (isNaN(date.getTime())) return null;

          // Formatear manteniendo la hora local
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");

          return `${year}-${month}-${day}T${hours}:${minutes}`;
        } catch (error) {
          return null;
        }
      };

      reset({
        productoId: producto.productoId,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        categorias: getInitialCategorias(),
        precioCompra: producto.precioCompra,
        precio: producto.precio,
        stock: producto.stock,
        estado: producto.estado || "Disponible",
        img: producto.img,
        oferta: {
          activa: producto.oferta?.activa || false,
          descuento: producto.oferta?.descuento || 0,
          precioOferta: producto.oferta?.precioOferta || 0,
          fechaInicio: isoToLocalDateTime(producto.oferta?.fechaInicio),
          fechaFin: isoToLocalDateTime(producto.oferta?.fechaFin),
          descripcionOferta: producto.oferta?.descripcionOferta || "",
        },
      });

      setSelectedCategorias(getInitialCategorias());

      // Resetear el tipo de imagen a URL por defecto
      setImageType("url");
      setImageFile(null);
    }
  }, [open, producto, reset]);

  // Handler para añadir o eliminar categorías seleccionadas
  const handleCategoriaChange = (categoriaId, checked) => {
    const nuevasCategorias = checked
      ? [...selectedCategorias, categoriaId]
      : selectedCategorias.filter((id) => id !== categoriaId);

    // Actualizar tanto el estado local como los valores del formulario
    setSelectedCategorias(nuevasCategorias);
    setValue("categorias", nuevasCategorias, { shouldValidate: true });

    // Forzar validación y re-render
    trigger("categorias");
  };

  // Handler para cambiar el tipo de imagen
  const handleImageTypeChange = (value) => {
    setImageType(value);
    // Limpiar el campo de imagen cuando cambia el tipo
    if (value === "url") {
      setValue("img", producto.img || "", { shouldValidate: true });
    } else {
      setValue("img", "", { shouldValidate: true });
    }
    setImageFile(null);
  };

  // Handler para el cambio de archivo
  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setImageFile(e.target.files[0]);
    }
  };

  // Función de submit con manejo de errores y estado de carga - CORREGIDO
  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      // Log para debug
      console.log("=== DEBUG VALIDACIÓN ===");
      console.log("Errores actuales:", errors);
      console.log("Datos del formulario:", data);
      console.log("Estado mostrarOferta:", mostrarOferta);

      // Usar las categorías del formulario que están sincronizadas
      const categoriasToUse =
        data.categorias && data.categorias.length > 0
          ? data.categorias
          : selectedCategorias;

      // Verificar que hay al menos una categoría seleccionada
      if (!categoriasToUse || categoriasToUse.length === 0) {
        toast.error("Error de validación", {
          description: "Debe seleccionar al menos una categoría",
        });
        setLoading(false);
        return;
      }

      // Preparar datos del producto usando las categorías correctas
      const productData = {
        ...data,
        categorias: categoriasToUse,
        precioCompra: parseFloat(data.precioCompra),
        stock: parseInt(data.stock, 10),
      };

      // Remover oferta de los datos del producto
      delete productData.oferta;

      if (imageType === "url") {
        // Si es URL, enviar datos normales
        await editarProducto(productData);
      } else {
        // Si es archivo, preparar FormData
        const formData = new FormData();

        // Asegúrate de que productoId se envía como string/number y no como FormData completo
        formData.append("productoId", data.productoId.toString());

        // Agregar campos del producto al FormData
        formData.append("nombre", data.nombre);
        formData.append("descripcion", data.descripcion);

        // Enviar categorías - usar categoriasToUse
        categoriasToUse.forEach((categoriaId) => {
          formData.append("categorias[]", categoriaId);
        });

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

        // Pasar productData actualizado
        await editarProductoConImagen(productData, formData);
      }

      console.log("=== DEBUG FECHAS ===");
      console.log("Datos del formulario RAW:", {
        fechaInicio: data.oferta.fechaInicio,
        fechaFin: data.oferta.fechaFin,
      });

      // Preparar datos de oferta con el estado correcto
      const datosOferta = {
        ...data.oferta,
        activa: mostrarOferta, // IMPORTANTE: usar el estado real del toggle
        // Convertir fechas a formato ISO si existen
        fechaInicio: data.oferta.fechaInicio,
        fechaFin: data.oferta.fechaFin,
      };

      console.log("Datos que se envían al backend:", datosOferta);

      // Siempre llamar a gestionarOfertaProducto para actualizar la oferta
      await gestionarOfertaProducto(data.productoId, datosOferta);

      setOpen(false);
      reset();
      setImageFile(null);
      setMostrarOferta(false);

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
    errors, // Exponer los errores directamente
    onSubmit,
    imageType,
    handleImageTypeChange,
    handleFileChange,
    imageFile,
    handleCategoriaChange,
    selectedCategorias,
    mostrarOferta,
    setMostrarOferta,
    tipoOferta,
    setTipoOferta,
    handleOfertaToggle,
    handleTipoOfertaChange,
    handleDescuentoChange,
    calcularPrecioOferta,
  };
};