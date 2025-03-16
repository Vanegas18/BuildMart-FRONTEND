import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { OrderItem } from ".";

export const OrderCard = ({ order }) => {
  return (
    <Card key={order.id} className="border shadow-sm">
      <CardHeader className="bg-gray-50 pb-2 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="font-medium">{order.id}</p>
              <p className="text-sm text-gray-500">Realizado el {order.date}</p>
            </div>
          </div>
          <Badge
            className={
              order.status === "Entregado"
                ? "p-2 bg-green-100 text-green-800 hover:bg-green-100"
                : order.status === "En camino"
                ? "p-2 bg-blue-100 text-blue-800 hover:bg-blue-100"
                : "p-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
            }>
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {order.items.map((item, i) => (
            <OrderItem key={i} item={item} />
          ))}

          <div className="border-t pt-4 mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>{order.address}</span>
              </div>
              {order.tracking !== "Pendiente" && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Package className="h-4 w-4" />
                  <span>Tracking: {order.tracking}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">Total: {order.total}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Ver Detalles
                </Button>
                {order.status === "Entregado" && (
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Comprar de Nuevo
                  </Button>
                )}
                {order.status === "En camino" && (
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Seguir Envío
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
