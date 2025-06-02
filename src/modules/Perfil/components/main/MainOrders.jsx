import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ChevronRight, Clock, XCircle } from "lucide-react";
import { Button } from "@/shared/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Badge } from "@/shared/components/ui/badge";

export const MainOrders = ({ pedidos }) => {
  // Usamos useMemo para obtener los últimos 8 pedidos
  const ultimosPedidos = useMemo(() => {
    // Creamos una copia para no modificar el array original
    return [...pedidos]
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Ordenamos por fecha, más reciente primero
      .slice(0, 8); // Tomamos solo los primeros 8
  }, [pedidos]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Recientes</CardTitle>
        <CardDescription>Tus últimos pedidos realizados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ultimosPedidos.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">
                  PED-{order.pedidoId.toString().padStart(4, "0")}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.fecha).toLocaleDateString()} •{" "}
                  {order.productos.length} productos
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">${FormateoPrecio(order.total)}</p>
                  <span>
                    <Badge
                      className={
                        order.estado === "confirmado"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : order.estado === "pendiente"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }>
                      {order.estado === "pagado" ? (
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                      ) : order.estado === "pendiente" ? (
                        <Clock className="mr-1 h-3 w-3" />
                      ) : (
                        <XCircle className="mr-1 h-3 w-3" />
                      )}
                      {order.estado === "confirmado"
                        ? "Confirmado"
                        : order.estado === "pendiente"
                        ? "Pendiente"
                        : "Rechazado"}
                    </Badge>
                  </span>
                </div>
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
