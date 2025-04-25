import { useAuth, usePedidos } from "@/core/context";
import { OrderCard } from "./OrderCard";
import { useEffect, useMemo, useState } from "react";

export const OrderList = ({ filter, searchQuery }) => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { pedidos, obtenerPedidos } = usePedidos();

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      try {
        await obtenerPedidos();
      } catch (error) {
        setError("No se pudieron cargar los pedidos");
        console.error("Error al cargar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [obtenerPedidos]);

  const pedidosCliente = pedidos
    .filter((pedido) => pedido.clienteId._id === user.id)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  // Memorizamos el filtrado para evitar recalcular cuando otros componentes se actualicen
  const filteredOrders = useMemo(() => {
    return pedidosCliente
      .filter((pedidosCliente) => {
        // Filtrado por estado
        if (filter === "all") return true;
        if (filter === "processing")
          return pedidosCliente.estado === "pendiente";
        if (filter === "completed") return pedidosCliente.estado === "pagado";
        if (filter === "canceled") return pedidosCliente.estado === "cancelado";
        return true;
      })
      .filter((pedidosCliente) => {
        // Filtrado por búsqueda
        if (!searchQuery) return true;
        const searchLower = searchQuery.toLowerCase();
        return (
          pedidosCliente.id.toLowerCase().includes(searchLower) ||
          pedidosCliente.items.some((item) =>
            item.name.toLowerCase().includes(searchLower)
          )
        );
      });
  }, [pedidosCliente, filter, searchQuery]);

  // Si no hay órdenes que mostrar después del filtrado
  if (filteredOrders.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No se encontraron pedidos con los criterios de búsqueda actuales.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredOrders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};
