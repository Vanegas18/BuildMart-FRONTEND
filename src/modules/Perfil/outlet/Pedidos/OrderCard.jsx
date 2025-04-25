import { Button } from "@/shared/components/ui";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { CheckCircle2, Clock, MapPin, Package, XCircle } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { OrderItem } from ".";
import { memo, useMemo } from "react";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { NavLink } from "react-router";

// Memorizamos el componente para evitar re-renders innecesarios
export const OrderCard = memo(({ order }) => {
  // Memorizamos los botones de acción según el estado
  const actionButtons = useMemo(
    () => (
      <div className="flex gap-2">
        {order.estado === "pagado" && (
          <NavLink to={"/catalogo"}>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Comprar de Nuevo
            </Button>
          </NavLink>
        )}
        {order.estado === "pendiente" && (
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Seguir Envío
          </Button>
        )}
        {order.estado === "cancelado" && (
          <NavLink to={"/catalogo"}>
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              Comprar de Nuevo
            </Button>
          </NavLink>
        )}
      </div>
    ),
    [order.estado]
  );

  return (
    <Card key={order._id} className="border shadow-sm">
      <CardHeader className="bg-gray-50 pb-2 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="font-medium">{order.pedidoId}</p>
              <p className="text-sm text-gray-500">
                Realizado el {new Date(order.fecha).toLocaleDateString()}
              </p>
            </div>
          </div>
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
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {order.productos.map((item, i) => (
            <OrderItem key={i} item={item} />
          ))}

          <div className="border-t pt-4 mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                {/* <span>{order.address}</span> */}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                Total: ${FormateoPrecio(order.total)}
              </div>
              {actionButtons}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
