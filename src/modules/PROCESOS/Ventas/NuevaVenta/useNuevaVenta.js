import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod"; // Importar zodResolver
import { ventaSchema } from "./validationVenta"; // Importar el esquema de validación
import { useClientes } from "@/core/context/Clientes/ClientesContext";
import { useProductos } from "@/core/context/Productos/ProductosContext";
import { useVentas } from "@/core/context/Ventas/VentasContext"; // Asegúrate de tener este contexto creado

export const useNuevaVenta = (onVentaCreada) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { crearVenta } = useVentas(); // Crear venta
  const { clientes, obtenerClientes } = useClientes(); // Obtener clientes
  const { productos, obtenerProductos } = useProductos(); // Obtener productos

  // Obtener clientes y productos al montar
  useEffect(() => {
    obtenerClientes();
    obtenerProductos();
  }, [obtenerClientes, obtenerProductos]);

  // Formulario con validaciones usando Zod
  const form = useForm({
    resolver: zodResolver(ventaSchema), // Usar zodResolver con el esquema de validación
    defaultValues: {
      clienteId: "",
      direccionEntrega: "",
      productos: [{ productoId: "", cantidad: 1 }],
    },
    mode: "onChange", // Validación mientras el usuario escribe
  });

  // Formatear los datos antes de enviarlos a la API
  const formatDataForAPI = (data) => {
    return {
      clienteId: data.clienteId,
      direccionEntrega: data.direccionEntrega,
      productos: data.productos.map((producto) => ({
        producto: producto.productoId, // Cambiar "productoId" por "producto"
        cantidad: producto.cantidad,
      })),
    };
  };

  // Función de submit
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);
      const formattedData = formatDataForAPI(data); // Formatear datos
      await crearVenta(formattedData); // Enviar los datos a la API
      toast.success("Venta creada exitosamente");
      setOpen(false);
      form.reset(); // Resetear formulario
      onVentaCreada?.(); // Ejecutar callback
    } catch (error) {
      toast.error("Error al crear la venta", {
        description: error.message || "Inténtalo nuevamente",
      });
    } finally {
      setLoading(false);
    }
  });

  // 🔥 Filtrar solo clientes activos
  const clientesActivos = clientes.filter(
    (cliente) => cliente.estado === "Activo"
  );

  // 🟢 Filtrar solo productos disponibles
  const productosDisponibles = productos.filter(
    (producto) =>
      producto.estado === "Activo" || producto.estado === "En oferta"
  );

  return {
    open,
    setOpen,
    loading,
    form,
    onSubmit,
    clientes: clientesActivos,
    productos: productosDisponibles,
  };
};
