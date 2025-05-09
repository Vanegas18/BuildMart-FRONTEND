import React, { useMemo } from "react";
import { Link } from "react-router";
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Recientes</CardTitle>
        <CardDescription>Tus últimos pedidos realizados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pedidos.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">{order.pedidoId}</p>
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
                        order.estado === "pagado"
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
                      {order.estado === "pagado"
                        ? "Pagado"
                        : order.estado === "pendiente"
                        ? "Pendiente"
                        : "Cancelado"}
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
