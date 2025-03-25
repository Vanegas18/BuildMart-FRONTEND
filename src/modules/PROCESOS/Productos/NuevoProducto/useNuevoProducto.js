import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCategories } from "@/core/api";
import { useProductos } from "@/core/context/Productos/ProductosContext";
import { productoSchema } from "./validacionProducto";
import { toast } from "sonner";

export const useNuevoProducto = (onProductoCreado) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const { crearProductos } = useProductos();

  // Efecto para cargar las categorías al montar el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const resp = await getCategories();
        setCategorias(resp.data);
      } catch (error) {
        // Toast de error al cargar categorías
        toast.error("No se pudieron cargar las categorías", {
          description: "Intente recargar la página o contacte soporte",
        });
        console.error("Error al obtener las categorias:", error);
      }
    };
    fetchCategorias();
  }, []);

  // Configuración del formulario con Zod y react-hook-form
  const form = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      categoriaId: "",
      precio: "",
      stock: "",
      img: "",
    },
  });

  // Función de submit con manejo de errores y estado de carga
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);

      await crearProductos(data);

      setOpen(false);

      form.reset();

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
  };
};
