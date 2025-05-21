import { useAuth, usePedidos } from "@/core/context";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Button } from "@/shared/components/ui";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { usePedidoDetalle } from "./usePedidoDetalle";

export const Pedidos = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("all");
  const [paginaActual, setPaginaActual] = useState(1);
  const pedidosPorPagina = 5;

  const { user } = useAuth();
  const { pedidos, obtenerPedidos } = usePedidos();
  const { abrirDetallePedido, DetallePedidoDialog } = usePedidoDetalle();

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
    .filter((pedido) => {
      // Validamos que clienteId exista y tenga _id antes de acceder a ella
      return pedido && pedido.clienteId && pedido.clienteId._id === user?.id;
    })
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  // Filtrar pedidos según la pestaña seleccionada
  const pedidosFiltrados = pedidosCliente.filter((pedido) => {
    if (filtroEstado === "all") return true;
    if (filtroEstado === "processing") return pedido.estado === "pendiente";
    if (filtroEstado === "completed") return pedido.estado === "pagado";
    if (filtroEstado === "cancelled") return pedido.estado === "cancelado";
    return true;
  });

  // Calcular el total de páginas
  const totalPaginas = Math.ceil(pedidosFiltrados.length / pedidosPorPagina);

  // Obtener los pedidos de la página actual
  const pedidosPaginados = pedidosFiltrados.slice(
    (paginaActual - 1) * pedidosPorPagina,
    paginaActual * pedidosPorPagina
  );

  // Manejar cambio de páginas
  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  // Cambiar filtro y resetear a página 1
  const handleTabChange = (value) => {
    setFiltroEstado(value);
    setPaginaActual(1);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Pedidos</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Historial de Pedidos</CardTitle>
            <Tabs
              defaultValue="all"
              className="w-auto"
              onValueChange={handleTabChange}>
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="processing">En Proceso</TabsTrigger>
                <TabsTrigger value="completed">Completados</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelados</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : pedidosPaginados.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No hay pedidos que mostrar
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {pedidosPaginados.map((order) => (
                  <Card key={order._id} className="border shadow-sm">
                    <CardHeader className="bg-gray-50 pb-2 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="flex items-center">
                              <Package className="h-4 w-4 text-blue-600 mr-1" />
                              <p className="font-medium">
                                PED-{order.pedidoId.toString().padStart(4, "0")}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">
                              Realizado el{" "}
                              {new Date(order.fecha).toLocaleDateString(
                                "es-ES",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
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
                        {order.productos.slice(0, 2).map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
                                <Package className="h-6 w-6 text-gray-500" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {item.productoId.nombre}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Cantidad: {item.cantidad}
                                </p>
                              </div>
                            </div>
                            <p className="font-medium">
                              ${FormateoPrecio(item.productoId.precio)}
                            </p>
                          </div>
                        ))}

                        {/* Mostrar indicador si hay más productos */}
                        {order.productos.length > 2 && (
                          <div className="text-sm text-blue-600 italic">
                            +{order.productos.length - 2} productos más
                          </div>
                        )}

                        <div className="border-t pt-4 mt-4">
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold">
                              Total: ${FormateoPrecio(order.total)}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => abrirDetallePedido(order)}
                                className="flex items-center">
                                <Info className="h-4 w-4 mr-1" />
                                Ver Detalles
                              </Button>
                              {order.estado === "pagado" && (
                                <NavLink to={"/catalogo"}>
                                  <Button
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700">
                                    Comprar de Nuevo
                                  </Button>
                                </NavLink>
                              )}
                              {order.estado === "cancelado" && (
                                <NavLink to={"/catalogo"}>
                                  <Button
                                    size="sm"
                                    className="bg-red-600 hover:bg-red-700">
                                    Comprar de Nuevo
                                  </Button>
                                </NavLink>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Controles de paginación */}
              {totalPaginas > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    Mostrando {(paginaActual - 1) * pedidosPorPagina + 1} -{" "}
                    {Math.min(
                      paginaActual * pedidosPorPagina,
                      pedidosFiltrados.length
                    )}{" "}
                    de {pedidosFiltrados.length} pedidos
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => cambiarPagina(paginaActual - 1)}
                      disabled={paginaActual === 1}>
                      <ChevronLeft className="h-4 w-4" />
                      <span className="ml-1">Anterior</span>
                    </Button>

                    <div className="flex items-center gap-1">
                      {[...Array(totalPaginas)].map((_, i) => (
                        <Button
                          key={i}
                          variant={
                            paginaActual === i + 1 ? "default" : "outline"
                          }
                          size="sm"
                          className={`w-8 h-8 p-0 ${
                            paginaActual === i + 1 ? "bg-blue-600" : ""
                          }`}
                          onClick={() => cambiarPagina(i + 1)}>
                          {i + 1}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => cambiarPagina(paginaActual + 1)}
                      disabled={paginaActual === totalPaginas}>
                      <span className="mr-1">Siguiente</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Componente Dialog para mostrar los detalles */}
      <DetallePedidoDialog />
    </>
  );
};
