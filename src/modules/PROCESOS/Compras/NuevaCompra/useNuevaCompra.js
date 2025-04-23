import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod"; // Importar zodResolver
import { compraSchema } from "./validationCompra"; // Importar el esquema de validación
import { useProveedores } from "@/core/context/Proveedores/ProveedoresContext";
import { useProductos } from "@/core/context/Productos/ProductosContext";
import { useCompras } from "@/core/context/Compras/ComprasContext"; // Asegúrate de tener este contexto creado

export const useNuevaCompra = (onCompraCreada) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { crearCompra } = useCompras(); // Crear compra
  const { proveedores, obtenerProveedores } = useProveedores(); // Obtener proveedores
  const { productos, obtenerProductos } = useProductos(); // Obtener productos

  // Obtener proveedores y productos al montar
  useEffect(() => {
    obtenerProveedores();
    obtenerProductos();
  }, [obtenerProveedores, obtenerProductos]);

  // Formulario con validaciones usando Zod
  const form = useForm({
    resolver: zodResolver(compraSchema), // Usar zodResolver con el esquema de validación
    defaultValues: {
      proveedorId: "",
      fecha: "", // Campo de fecha agregado
      productos: [{ productoId: "", cantidad: 1 }],
    },
  });

  // Formatear los datos antes de enviarlos a la API
  const formatDataForAPI = (data) => {
    return {
      proveedor: data.proveedorId,
      fecha: new Date(data.fecha),
      productos: data.productos.map((producto) => ({
        producto: producto.productoId,
        cantidad: producto.cantidad,
      })),
      total: data.productos.reduce((acc, producto) => {
        const productoSeleccionado = productos.find((p) => p._id === producto.productoId);
        const precioCompra = productoSeleccionado?.precioCompra || 0; // Usar precioCompra
        return acc + precioCompra * producto.cantidad;
      }, 0),
      estado: "Pendiente",
    };
  };

  // Función de submit
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);
      const formattedData = formatDataForAPI(data); // Formatear datos
      await crearCompra(formattedData); // Enviar los datos a la API
      toast.success("Compra creada exitosamente");
      setOpen(false);
      form.reset(); // Resetear formulario
      onCompraCreada?.(); // Ejecutar callback
    } catch (error) {
      toast.error("Error al crear la compra", {
        description: error.response?.data?.message || "Inténtalo nuevamente",
      });
    } finally {
      setLoading(false);
    }
  });

  // 🔥 Filtrar solo proveedores activos
  const proveedoresActivos = proveedores.filter((proveedor) => proveedor.estado === "Activo");

  // 🟢 Filtrar solo productos disponibles
  const productosDisponibles = productos.filter(
    (producto) => producto.estado === "Activo" || producto.estado === "En oferta"
  );

  return {
    open,
    setOpen,
    loading,
    form,
    onSubmit,
    proveedores: proveedoresActivos,
    productos: productosDisponibles,
  };
};