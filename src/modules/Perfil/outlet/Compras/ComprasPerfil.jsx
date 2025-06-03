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
  Truck,
  RotateCcw,
  Tag,
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
  const [filtroEstado, setFiltroEstado] = useState("all");
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

  // Aplicar filtro por estado (actualizado con nuevos estados)
  const comprasFiltradas = comprasCliente.filter((compra) => {
    if (filtroEstado === "all") return true;

    const estado = compra.estado?.toLowerCase();

    switch (filtroEstado) {
      case "processing":
        return estado === "procesando";
      case "shipped":
        return estado === "enviado";
      case "delivered":
        return estado === "entregado";
      case "completed":
        return estado === "completado";
      case "reembolsed":
        return estado === "reembolsado";
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

  // Función para obtener el texto del estado (actualizada)
  const obtenerTextoEstado = (estado) => {
    switch (estado?.toLowerCase()) {
      case "procesando":
        return "Procesando";
      case "enviado":
        return "Enviado";
      case "entregado":
        return "Entregado";
      case "completado":
        return "Completado";
      case "reembolsado":
        return "Reembolsado";
      default:
        return estado || "Desconocido";
    }
  };

  // Función para obtener el icono del estado (actualizada)
  const obtenerIconoEstado = (estado) => {
    switch (estado?.toLowerCase()) {
      case "procesando":
        return <Clock className="mr-1 h-3 w-3" />;
      case "enviado":
        return <Truck className="mr-1 h-3 w-3" />;
      case "entregado":
        return <Package className="mr-1 h-3 w-3" />;
      case "completado":
        return <CheckCircle2 className="mr-1 h-3 w-3" />;
      case "reembolsado":
        return <RotateCcw className="mr-1 h-3 w-3" />;
      default:
        return <Clock className="mr-1 h-3 w-3" />;
    }
  };

  // Función para obtener la clase CSS del estado (actualizada)
  const obtenerClaseEstado = (estado) => {
    switch (estado?.toLowerCase()) {
      case "procesando":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "enviado":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "entregado":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "completado":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "reembolsado":
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
                        (c) => c.estado?.toLowerCase() === "completado"
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
        <CardHeader className="pb-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <CardTitle className="text-lg sm:text-xl">
              Historial de Compras
            </CardTitle>

            <Tabs
              value={filtroEstado}
              className="w-full sm:w-auto"
              onValueChange={handleTabChange}>
              {/* Tabs para móvil - Grid de 3x2 */}
              <TabsList className="grid w-full grid-cols-3 grid-rows-2 gap-1 h-auto p-1 sm:hidden">
                <TabsTrigger value="all" className="text-xs px-2 py-1.5">
                  Todos
                </TabsTrigger>
                <TabsTrigger value="processing" className="text-xs px-2 py-1.5">
                  Procesando
                </TabsTrigger>
                <TabsTrigger value="shipped" className="text-xs px-2 py-1.5">
                  Enviados
                </TabsTrigger>
                <TabsTrigger value="delivered" className="text-xs px-2 py-1.5">
                  Entregados
                </TabsTrigger>
                <TabsTrigger value="completed" className="text-xs px-2 py-1.5">
                  Completados
                </TabsTrigger>
                <TabsTrigger value="reembolsed" className="text-xs px-2 py-1.5">
                  Reembolsos
                </TabsTrigger>
              </TabsList>

              {/* Tabs para tablet - Grid de 2x3 */}
              <TabsList className="hidden sm:grid md:hidden w-full grid-cols-2 grid-rows-3 gap-1 h-auto p-1">
                <TabsTrigger value="all" className="text-sm px-3 py-2">
                  Todos
                </TabsTrigger>
                <TabsTrigger value="processing" className="text-sm px-3 py-2">
                  Procesando
                </TabsTrigger>
                <TabsTrigger value="shipped" className="text-sm px-3 py-2">
                  Enviados
                </TabsTrigger>
                <TabsTrigger value="delivered" className="text-sm px-3 py-2">
                  Entregados
                </TabsTrigger>
                <TabsTrigger value="completed" className="text-sm px-3 py-2">
                  Completados
                </TabsTrigger>
                <TabsTrigger value="reembolsed" className="text-sm px-3 py-2">
                  Reembolsados
                </TabsTrigger>
              </TabsList>

              {/* Tabs para desktop - Horizontal */}
              <TabsList className="hidden md:flex">
                <TabsTrigger value="all" className="text-sm px-3 py-2">
                  Todos
                </TabsTrigger>
                <TabsTrigger value="processing" className="text-sm px-3 py-2">
                  Procesando
                </TabsTrigger>
                <TabsTrigger value="shipped" className="text-sm px-3 py-2">
                  Enviados
                </TabsTrigger>
                <TabsTrigger value="delivered" className="text-sm px-3 py-2">
                  Entregados
                </TabsTrigger>
                <TabsTrigger value="completed" className="text-sm px-3 py-2">
                  Completados
                </TabsTrigger>
                <TabsTrigger value="reembolsed" className="text-sm px-3 py-2">
                  Reembolsados
                </TabsTrigger>
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
                            {compra.productos.slice(0, 2).map((item, i) => {
                              const precioPagado = obtenerPrecioPagado(item);
                              const enOferta = estabaEnOferta(item);
                              const precioOriginal =
                                obtenerPrecioOriginal(item);

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
                                          {item.productoId?.nombre ||
                                            "Producto"}
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
                                    {enOferta &&
                                      precioOriginal > precioPagado && (
                                        <p className="text-sm text-gray-500 line-through">
                                          ${FormateoPrecio(precioOriginal)}
                                        </p>
                                      )}
                                  </div>
                                </div>
                              );
                            })}

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
                              {(compra.estado?.toLowerCase() === "completado" ||
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
                              {compra.estado?.toLowerCase() ===
                                "reembolsado" && (
                                <NavLink to={"/catalogo"}>
                                  <Button
                                    size="sm"
                                    className="bg-orange-600 hover:bg-orange-700">
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
                <div className="mt-6 pt-4 border-t">
                  {/* Información de resultados */}
                  <div className="text-sm text-gray-500 text-center sm:text-left mb-4">
                    Mostrando {(paginaActual - 1) * comprasPorPagina + 1} -{" "}
                    {Math.min(
                      paginaActual * comprasPorPagina,
                      comprasFiltradas.length
                    )}{" "}
                    de {comprasFiltradas.length} compras
                  </div>

                  {/* Controles de paginación */}
                  <div className="flex flex-col sm:block">
                    {/* Botones Anterior/Siguiente - Solo móvil */}
                    <div className="flex items-center justify-center space-x-2 sm:hidden">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cambiarPagina(paginaActual - 1)}
                        disabled={paginaActual === 1}
                        className="flex items-center">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="ml-1 hidden xs:inline">Anterior</span>
                      </Button>

                      {/* Indicador de página actual en móvil */}
                      <div className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">
                        {paginaActual} / {totalPaginas}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cambiarPagina(paginaActual + 1)}
                        disabled={paginaActual === totalPaginas}
                        className="flex items-center">
                        <span className="mr-1 hidden xs:inline">Siguiente</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Controles completos - Solo desktop - Centrados */}
                    <div className="hidden sm:flex sm:items-center sm:justify-center sm:gap-2">
                      {/* Botón Anterior */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cambiarPagina(paginaActual - 1)}
                        disabled={paginaActual === 1}
                        className="flex items-center">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="ml-1">Anterior</span>
                      </Button>

                      {/* Números de página */}
                      <div className="flex items-center gap-1 mx-2">
                        {(() => {
                          const maxVisible = 7;
                          const pages = [];

                          if (totalPaginas <= maxVisible) {
                            // Mostrar todas si son pocas
                            for (let i = 1; i <= totalPaginas; i++) {
                              pages.push(i);
                            }
                          } else {
                            // Lógica con elipsis
                            let startPage = Math.max(1, paginaActual - 2);
                            let endPage = Math.min(
                              totalPaginas,
                              paginaActual + 2
                            );

                            // Ajustar si estamos cerca del inicio o final
                            if (paginaActual <= 3) {
                              endPage = Math.min(5, totalPaginas);
                            }
                            if (paginaActual >= totalPaginas - 2) {
                              startPage = Math.max(totalPaginas - 4, 1);
                            }

                            // Primera página
                            if (startPage > 1) {
                              pages.push(1);
                              if (startPage > 2) pages.push("...");
                            }

                            // Páginas del rango
                            for (let i = startPage; i <= endPage; i++) {
                              pages.push(i);
                            }

                            // Última página
                            if (endPage < totalPaginas) {
                              if (endPage < totalPaginas - 1) pages.push("...");
                              pages.push(totalPaginas);
                            }
                          }

                          return pages.map((page, index) => {
                            if (page === "...") {
                              return (
                                <span
                                  key={`ellipsis-${index}`}
                                  className="px-2 py-1 text-gray-400 text-sm">
                                  ...
                                </span>
                              );
                            }

                            return (
                              <Button
                                key={page}
                                variant={
                                  paginaActual === page ? "default" : "outline"
                                }
                                size="sm"
                                className={`w-9 h-9 p-0 ${
                                  paginaActual === page
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "hover:bg-gray-50"
                                }`}
                                onClick={() => cambiarPagina(page)}>
                                {page}
                              </Button>
                            );
                          });
                        })()}
                      </div>

                      {/* Botón Siguiente */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cambiarPagina(paginaActual + 1)}
                        disabled={paginaActual === totalPaginas}
                        className="flex items-center">
                        <span className="mr-1">Siguiente</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
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
