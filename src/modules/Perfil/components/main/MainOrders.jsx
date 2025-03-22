import React, { useMemo } from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { Button } from "@/shared/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export const MainOrders = () => {
  // Memorizamos los datos de los pedidos para evitar recrearlos en cada renderizado
  const orders = useMemo(
    () => [
      {
        id: "ORD-7352",
        date: "12/03/2023",
        items: 3,
        total: "$1,240",
        status: "Entregado",
      },
      {
        id: "ORD-7351",
        date: "28/02/2023",
        items: 2,
        total: "$890",
        status: "En camino",
      },
      {
        id: "ORD-7350",
        date: "15/02/2023",
        items: 5,
        total: "$2,470",
        status: "Procesando",
      },
    ],
    []
  ); // Array vacío porque los datos son estáticos

  // Función para determinar los estilos según el estado del pedido
  const getStatusStyle = (status) => {
    switch (status) {
      case "Entregado":
        return "bg-green-100 text-green-600";
      case "En camino":
        return "bg-blue-100 text-blue-600";
      case "Procesando":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Recientes</CardTitle>
        <CardDescription>Tus últimos pedidos realizados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-gray-500">
                  {order.date} • {order.items} productos
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">{order.total}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(
                      order.status
                    )}`}>
                    {order.status}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={`Ver detalles del pedido ${order.id}`}>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          ))}
          <Link to="pedidos">
            <Button variant="outline" className="w-full">
              Ver todos los pedidos
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(MainOrders);
