import { useAuth, usePedidos } from "@/core/context";
import { Button } from "@/shared/components/ui";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { CheckCircle2, Clock, MapPin, Package, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export const PedidosMain = () => {
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

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Pedidos</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Historial de Pedidos</CardTitle>
            <Tabs defaultValue="all" className="w-auto">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="processing">En Proceso</TabsTrigger>
                <TabsTrigger value="completed">Completados</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {pedidosCliente.map((order) => (
              <Card key={order._id} className="border shadow-sm">
                <CardHeader className="bg-gray-50 pb-2 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{order.pedidoId}</p>
                        <p className="text-sm text-gray-500">
                          Realizado el {order.fecha}
                        </p>
                      </div>
                    </div>
                    <div>
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
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {order.productos.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
                            <Package className="h-6 w-6 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">{item.nombre}</p>
                            <p className="text-sm text-gray-500">
                              Cantidad: {item.cantidad}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">{item.precio}</p>
                      </div>
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
                          Total: {order.total}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                          {order.estado === "pagado" && (
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700">
                              Comprar de Nuevo
                            </Button>
                          )}
                          {order.estado === "pendiente" && (
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700">
                              Seguir Envío
                            </Button>
                          )}
                          {order.estado === "cancelado" && (
                            <Button
                              size="sm"
                              className="bg-red-600 hover:bg-red-700">
                              Reintentar Pago
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
