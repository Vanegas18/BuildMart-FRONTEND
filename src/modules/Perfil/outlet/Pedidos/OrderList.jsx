import { OrderCard } from "./OrderCard";
import { useMemo } from "react";
import { getOrders } from "./data/ordersData";

export const OrderList = ({ filter, searchQuery }) => {
  // Memorizamos la obtención de órdenes para evitar recalcular en cada render
  const orders = useMemo(() => getOrders(), []);

  // Memorizamos el filtrado para evitar recalcular cuando otros componentes se actualicen
  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        // Filtrado por estado
        if (filter === "all") return true;
        if (filter === "processing")
          return order.status === "Procesando" || order.status === "En camino";
        if (filter === "completed") return order.status === "Entregado";
        return true;
      })
      .filter((order) => {
        // Filtrado por búsqueda
        if (!searchQuery) return true;
        const searchLower = searchQuery.toLowerCase();
        return (
          order.id.toLowerCase().includes(searchLower) ||
          order.items.some((item) =>
            item.name.toLowerCase().includes(searchLower)
          )
        );
      });
  }, [orders, filter, searchQuery]);

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
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};
