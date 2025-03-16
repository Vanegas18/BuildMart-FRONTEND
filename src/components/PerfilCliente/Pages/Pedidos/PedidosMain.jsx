import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge, MapPin, Package } from "lucide-react";

export const PedidosMain = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Pedidos</h1>
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Buscar pedido..."
            className="w-64"
          />
        </div>
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
            {[
              {
                id: "ORD-7352",
                date: "12/03/2023",
                items: [
                  { name: "Panel Solar 400W", quantity: 2, price: "$500" },
                  { name: "Kit Instalación", quantity: 1, price: "$240" },
                ],
                total: "$1,240",
                status: "Entregado",
                address: "Calle Principal 123, Madrid",
                tracking: "SP12345678",
              },
              {
                id: "ORD-7351",
                date: "28/02/2023",
                items: [
                  {
                    name: "Ventana PVC Doble Acristalamiento",
                    quantity: 2,
                    price: "$400",
                  },
                  { name: "Sellador Silicona", quantity: 1, price: "$90" },
                ],
                total: "$890",
                status: "En camino",
                address: "Calle Principal 123, Madrid",
                tracking: "SP87654321",
              },
              {
                id: "ORD-7350",
                date: "15/02/2023",
                items: [
                  { name: "Kit Baño Completo", quantity: 1, price: "$980" },
                  { name: "Grifería Premium", quantity: 1, price: "$450" },
                  { name: "Espejo LED", quantity: 1, price: "$320" },
                  { name: "Accesorios Baño", quantity: 1, price: "$120" },
                  { name: "Toallero Eléctrico", quantity: 1, price: "$600" },
                ],
                total: "$2,470",
                status: "Procesando",
                address: "Calle Principal 123, Madrid",
                tracking: "Pendiente",
              },
              {
                id: "ORD-7349",
                date: "05/02/2023",
                items: [
                  { name: "Pintura Interior 20L", quantity: 1, price: "$180" },
                  { name: "Kit Rodillos y Brochas", quantity: 1, price: "$45" },
                  { name: "Cinta de Pintor", quantity: 3, price: "$15" },
                ],
                total: "$270",
                status: "Entregado",
                address: "Calle Principal 123, Madrid",
                tracking: "SP11223344",
              },
            ].map((order) => (
              <Card key={order.id} className="border shadow-sm">
                <CardHeader className="bg-gray-50 pb-2 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-500">
                          Realizado el {order.date}
                        </p>
                      </div>
                    </div>
                    <div
                      className={
                        order.status === "Entregado"
                          ? "p-2 bg-green-100 text-green-800 hover:bg-green-100"
                          : order.status === "En camino"
                          ? "p-2 bg-blue-100 text-blue-800 hover:bg-blue-100"
                          : "p-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }>
                      {order.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
                            <Package className="h-6 w-6 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              Cantidad: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">{item.price}</p>
                      </div>
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
                        <div className="text-lg font-bold">
                          Total: {order.total}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                          {order.status === "Entregado" && (
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700">
                              Comprar de Nuevo
                            </Button>
                          )}
                          {order.status === "En camino" && (
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700">
                              Seguir Envío
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
