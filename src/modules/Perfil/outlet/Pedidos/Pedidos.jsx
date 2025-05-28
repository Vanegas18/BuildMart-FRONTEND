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
  Loader2,
  Tag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { usePedidoDetalle } from "./usePedidoDetalle";
import { toast } from "sonner";

export const Pedidos = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("all");
  const [paginaActual, setPaginaActual] = useState(1);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("initial");
  const [selectedEstado, setSelectedEstado] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [pedido, setPedido] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const pedidosPorPagina = 5;

  const { user } = useAuth();
  const { pedidos, obtenerPedidos } = usePedidos();
  const {
    abrirDetallePedido,
    DetallePedidoDialog,
    PedidoDesactivarDialog,
    abrirDialogoCancelar,
  } = usePedidoDetalle();

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

  // Función para obtener el precio que se pagó en el momento del pedido
  const obtenerPrecioPagado = (item) => {
    // Usar directamente el precioUnitario que se guardó en el pedido
    return item.precioUnitario || 0;
  };

  // Función para verificar si un producto estaba en oferta al momento del pedido
  const estabaEnOferta = (item) => {
    // Verificar el campo enOferta que se guardó en el pedido
    return item.enOferta === true;
  };

  // Función para obtener el precio original del producto
  const obtenerPrecioOriginal = (item) => {
    // Usar el precioOriginal guardado en el pedido
    return item.precioOriginal || item.precioUnitario || 0;
  };

  // Abre el diálogo para cambiar el estado del pedido
  const handleOpenDialog = (order) => {
    abrirDialogoCancelar(order);
  };

  // Filtrar pedidos según la pestaña seleccionada
  const pedidosFiltrados = pedidosCliente.filter((pedido) => {
    if (filtroEstado === "all") return true;
    if (filtroEstado === "processing") return pedido.estado === "pendiente";
    if (filtroEstado === "completed") return pedido.estado === "confirmado";
    if (filtroEstado === "cancelled") return pedido.estado === "rechazado";
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

  // Total de pedidos del cliente
  const totalPedidosCliente = pedidosCliente.length;

  // Total de gastos del cliente
  const totalGastosCliente = pedidosCliente.reduce((total, pedido) => {
    return total + (pedido.total || 0);
  }, 0);

  // Componente para mostrar cuando no hay pedidos
  const NoCompras = () => (
    <div className="text-center py-8">
      <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {filtroEstado === "all"
          ? "No tienes pedidos aún"
          : `No tienes pedidos con el estado seleccionado`}
      </h3>
      <p className="text-gray-500 mb-4">
        {filtroEstado === "all"
          ? "Explora nuestro catálogo y realiza tu primer pedido"
          : "Cambia el filtro para ver otras pedido"}
      </p>
      {filtroEstado === "all" && (
        <NavLink to="/catalogo">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Ver Catálogo
          </Button>
        </NavLink>
      )}
    </div>
  );

  // Componente de loader
  const Loader = () => (
    <div className="flex justify-center items-center h-40">
      <Loader2 className="animate-spin mr-2" size={40} />
    </div>
  );

  // Componente de mensaje de error
  const ErrorMessage = () => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      <p className="font-medium">{error}</p>
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Pedidos</h1>
      </div>

      {/* Estadísticas resumen */}
      {pedidosCliente.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Pedidos</p>
                  <p className="text-2xl font-bold">{totalPedidosCliente}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Gastado</p>
                  <p className="text-2xl font-bold">
                    ${FormateoPrecio(totalGastosCliente)}
                  </p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pedidos Pendientes</p>
                  <p className="text-2xl font-bold">
                    {
                      pedidosCliente.filter(
                        (pedido) => pedido.estado === "pendiente"
                      ).length
                    }
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
                <TabsTrigger value="completed">Confirmados</TabsTrigger>
                <TabsTrigger value="processing">Pendientes</TabsTrigger>
                <TabsTrigger value="cancelled">Rechazados</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage />
          ) : pedidosPaginados.length === 0 ? (
            <NoCompras />
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
                              order.estado === "confirmado"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : order.estado === "pendiente"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            }>
                            {order.estado === "confirmado" ? (
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
                              : "Cancelado"}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        {order.productos.slice(0, 2).map((item, i) => {
                          const precioPagado = obtenerPrecioPagado(item);
                          const enOferta = estabaEnOferta(item);
                          const precioOriginal = obtenerPrecioOriginal(item);

                          return (
                            <div
                              key={i}
                              className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
                                  <Package className="h-6 w-6 text-gray-500" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">
                                      {item.productoId?.nombre || 'Producto'}
                                    </p>
                                    {enOferta && (
                                      <Badge
                                        variant="secondary"
                                        className="bg-orange-100 text-orange-800 text-xs">
                                        <Tag className="h-3 w-3 mr-1" />
                                        Oferta
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-500">
                                    Cantidad: {item.cantidad}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  ${FormateoPrecio(precioPagado)}
                                </p>
                                {enOferta && precioOriginal > precioPagado && (
                                  <p className="text-sm text-gray-500 line-through">
                                    ${FormateoPrecio(precioOriginal)}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}

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
                              {order.estado === "pendiente" && (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="bg-red-600 hover:bg-red-700"
                                  onClick={() => handleOpenDialog(order)}>
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Cancelar Pedido
                                </Button>
                              )}
                              {order.estado === "confirmado" && (
                                <NavLink to={"/catalogo"}>
                                  <Button
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700">
                                    Comprar de Nuevo
                                  </Button>
                                </NavLink>
                              )}
                              {order.estado === "rechazado" && (
                                <NavLink to={"/catalogo"}>
                                  <Button
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700">
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
      <PedidoDesactivarDialog />
    </>
  );
};