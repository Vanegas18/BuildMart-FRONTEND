import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pedidoSchema } from "./validationPedidos";
import { usePedidos } from "@/core/context/Pedidos/PedidosContext";
import { useClientes } from "@/core/context/Clientes/ClientesContext";
import { useProductos } from "@/core/context/Productos/ProductosContext";
import { toast } from "sonner";

export const useNuevoPedido = (onPedidoCreado) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { crearPedido } = usePedidos();
  const { clientes, obtenerClientes } = useClientes();
  const { productos, obtenerProductos } = useProductos();

  // Obtener clientes y productos al montar
  useEffect(() => {
    obtenerClientes();
    obtenerProductos();
  }, [obtenerClientes, obtenerProductos]);

  // Formulario
  const form = useForm({
    resolver: zodResolver(pedidoSchema),
    defaultValues: {
      clienteId: "",
      direccionEntrega: "",
      productos: [{ productoId: "", cantidad: 0 }],
    },
    mode: "onChange", // Validación mientras el usuario escribe
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);
      await crearPedido(data);
      toast.success("Pedido creado exitosamente");
      setOpen(false);
      form.reset();
      onPedidoCreado?.();
      setTimeout(() => {
        window.location.reload();
      }, 1500); // Espera 1.5 segundos para que se vea bien el toast
    } catch (error) {
      toast.error("Error al crear el pedido", {
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
