import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useEffect, useState } from "react";
import { useAuth, useVentas } from "@/core/context";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  Info,
} from "lucide-react";
import { Button } from "@/shared/components/ui";
import { useCompraDetalle } from "./useCompraDetalle";
import { Badge } from "@/shared/components/ui/badge";
import { NavLink } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

export const ComprasPerfil = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtroEstado, setFiltroEstado] = useState("all"); // Estado agregado
  const comprasPorPagina = 5;

  const { user } = useAuth();
  const { ventas, obtenerVentas } = useVentas();
  const { abrirDetalleCompra, DetalleCompraDialog } = useCompraDetalle();

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      try {
        await obtenerVentas();
      } catch (error) {
        setError("No se pudieron cargar las compras");
        console.error("Error al cargar compras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [obtenerVentas]);

  // Filtrar las compras del cliente actual
  const comprasCliente = ventas
    .filter((compra) => {
      // Verificar si el clienteId coincide con el ID del usuario actual
      return (
        compra &&
        (compra.clienteId === user?.id ||
          compra.clienteId?.toString() === user?.id?.toString() ||
          compra.clienteId?._id === user?.id ||
          compra.clienteId?._id?.toString() === user?.id?.toString())
      );
    })
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  // Aplicar filtro por estado
  const comprasFiltradas = comprasCliente.filter((compra) => {
    if (filtroEstado === "all") return true;

    const estado = compra.estado?.toLowerCase();

    switch (filtroEstado) {
      case "processing":
        return (
          estado === "procesando" ||
          estado === "pendiente" ||
          estado === "enviado"
        );
      case "completed":
        return (
          estado === "completada" ||
          estado === "pagado" ||
          estado === "entregado"
        );
      case "reembolsed":
        return estado === "reembolsada";
      case "cancelled":
        return estado === "cancelado";
      default:
        return true;
    }
  });

  // Calcular el total de páginas basado en las compras filtradas
  const totalPaginas = Math.ceil(comprasFiltradas.length / comprasPorPagina);

  // Obtener las compras de la página actual
  const comprasPaginadas = comprasFiltradas.slice(
    (paginaActual - 1) * comprasPorPagina,
    paginaActual * comprasPorPagina
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

  // Información de compras (basada en todas las compras del cliente, no filtradas)
  const totalGastado = comprasCliente.reduce(
    (total, compra) => total + (compra.total || 0),
    0
  );

  // Función para obtener el texto del estado
  const obtenerTextoEstado = (estado) => {
    switch (estado?.toLowerCase()) {
      case "completada":
      case "pagado":
        return "Completada";
      case "procesando":
      case "pendiente":
        return "Procesando";
      case "cancelado":
        return "Cancelada";
      case "reembolsada":
        return "Reembolsada";
      case "enviado":
        return "Enviada";
      case "entregado":
        return "Entregada";
      default:
        return estado || "Desconocido";
    }
  };

  // Función para obtener el icono del estado
  const obtenerIconoEstado = (estado) => {
    switch (estado?.toLowerCase()) {
      case "completada":
      case "pagado":
      case "entregado":
        return <CheckCircle2 className="mr-1 h-3 w-3" />;
      case "procesando":
      case "pendiente":
      case "enviado":
        return <Clock className="mr-1 h-3 w-3" />;
      case "cancelado":
      case "reembolsada":
        return <XCircle className="mr-1 h-3 w-3" />;
      default:
        return <Clock className="mr-1 h-3 w-3" />;
    }
  };

  // Función para obtener la clase CSS del estado
  const obtenerClaseEstado = (estado) => {
    switch (estado?.toLowerCase()) {
      case "completada":
      case "pagado":
      case "entregado":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "procesando":
      case "pendiente":
      case "enviado":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "cancelado":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "reembolsada":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

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

  // Componente para mostrar cuando no hay compras
  const NoCompras = () => (
    <div className="text-center py-8">
      <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {filtroEstado === "all"
          ? "No tienes compras aún"
          : `No tienes compras con el estado seleccionado`}
      </h3>
      <p className="text-gray-500 mb-4">
        {filtroEstado === "all"
          ? "Explora nuestro catálogo y realiza tu primera compra"
          : "Cambia el filtro para ver otras compras"}
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

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Compras</h1>
      </div>

      {/* Estadísticas resumen */}
      {comprasCliente.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Compras</p>
                  <p className="text-2xl font-bold">{comprasCliente.length}</p>
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
                    ${FormateoPrecio(totalGastado)}
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
                  <p className="text-sm text-gray-600">Compras Completadas</p>
                  <p className="text-2xl font-bold">
                    {
                      comprasCliente.filter(
                        (c) =>
                          c.estado?.toLowerCase() === "completada" ||
                          c.estado?.toLowerCase() === "pagado" ||
                          c.estado?.toLowerCase() === "entregado"
                      ).length
                    }
                  </p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-600" />
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
              value={filtroEstado}
              className="w-auto"
              onValueChange={handleTabChange}>
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="processing">Pendientes</TabsTrigger>
                <TabsTrigger value="completed">Completados</TabsTrigger>
                <TabsTrigger value="reembolsed">Reembolsadas</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage />
          ) : comprasFiltradas.length === 0 ? (
            <NoCompras />
          ) : (
            <>
              <div className="space-y-4">
                {comprasPaginadas.map((compra) => (
                  <Card key={compra._id} className="border shadow-sm">
                    <CardHeader className="bg-gray-50 pb-2 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="flex items-center">
                              <Package className="h-4 w-4 text-blue-600 mr-1" />
                              <p className="font-medium">
                                COM-
                                {compra.ventaId?.toString().padStart(4, "0") ||
                                  compra._id?.slice(-4)}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">
                              Realizada el{" "}
                              {new Date(compra.fecha).toLocaleDateString(
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
                          <Badge className={obtenerClaseEstado(compra.estado)}>
                            {obtenerIconoEstado(compra.estado)}
                            {obtenerTextoEstado(compra.estado)}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        {/* Mostrar productos */}
                        {compra.productos && compra.productos.length > 0 ? (
                          <>
                            {compra.productos.slice(0, 2).map((item, i) => (
                              <div
                                key={item._id || i}
                                className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
                                    <Package className="h-6 w-6 text-gray-500" />
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {item.productoId?.nombre ||
                                        "Producto no disponible"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Cantidad: {item.cantidad || 1}
                                    </p>
                                  </div>
                                </div>
                                <p className="font-medium">
                                  $
                                  {FormateoPrecio(
                                    (item.productoId?.precio || 0) *
                                      (item.cantidad || 1)
                                  )}
                                </p>
                              </div>
                            ))}

                            {/* Mostrar indicador si hay más productos */}
                            {compra.productos.length > 2 && (
                              <div className="text-sm text-blue-600 italic">
                                +{compra.productos.length - 2} productos más
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-sm text-gray-500 italic">
                            No hay productos disponibles
                          </div>
                        )}

                        <div className="border-t pt-4 mt-4">
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold">
                              Total: ${FormateoPrecio(compra.total || 0)}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => abrirDetalleCompra(compra)}
                                className="flex items-center">
                                <Info className="h-4 w-4 mr-1" />
                                Ver Detalles
                              </Button>
                              {(compra.estado?.toLowerCase() === "completada" ||
                                compra.estado?.toLowerCase() === "pagado" ||
                                compra.estado?.toLowerCase() ===
                                  "entregado") && (
                                <NavLink to={"/catalogo"}>
                                  <Button
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700">
                                    Comprar de Nuevo
                                  </Button>
                                </NavLink>
                              )}
                              {compra.estado?.toLowerCase() === "cancelado" && (
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
                    Mostrando {(paginaActual - 1) * comprasPorPagina + 1} -{" "}
                    {Math.min(
                      paginaActual * comprasPorPagina,
                      comprasFiltradas.length
                    )}{" "}
                    de {comprasFiltradas.length} compras
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

      <DetalleCompraDialog />
    </>
  );
};
