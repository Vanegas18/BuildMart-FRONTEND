import { OrderCard } from "./OrderCard";
import { useMemo } from "react";
import { getOrders } from "./data/ordersData";

export const OrderList = ({ filter, searchQuery }) => {
  const orders = getOrders();

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        if (filter === "all") return true;
        if (filter === "processing")
          return order.status === "Procesando" || order.status === "En camino";
        if (filter === "completed") return order.status === "Entregado";
        return true;
      })
      .filter((order) => {
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

  return (
    <div className="space-y-6">
      {filteredOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};
