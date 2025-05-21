import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ComprasList } from "./ComprasList";
import { useEffect, useState } from "react";
import { useAuth, useVentas } from "@/core/context";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/components/ui";

export const ComprasPerfil = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const comprasPorPagina = 5;

  const { user } = useAuth();
  const { ventas, obtenerVentas } = useVentas();

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      try {
        await obtenerVentas();
      } catch (error) {
        setError("No se pudieron cargar las ventas");
        console.error("Error al cargar ventas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [obtenerVentas]);

  const ventasCliente = ventas
    .filter((venta) => {
      // Validamos que clienteId exista y tenga _id antes de acceder a ella
      return venta && venta.clienteId && venta.clienteId._id === user?.id;
    })
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  // Calcular el total de páginas
  const totalPaginas = Math.ceil(ventasCliente.length / comprasPorPagina);

  // Obtener las compras de la página actual
  const comprasPaginadas = ventasCliente.slice(
    (paginaActual - 1) * comprasPorPagina,
    paginaActual * comprasPorPagina
  );

  // Manejar cambio de páginas
  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  // Información de compras
  const totalGastado = ventasCliente.reduce(
    (total, venta) => total + venta.total,
    0
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
        <h1 className="text-2xl font-bold">Mis Compras</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Historial de Compras</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage />
          ) : (
            <div className="space-y-4">
              {ventasCliente.length > 0 ? (
                <>
                  <ComprasList data={comprasPaginadas} />

                  {/* Controles de paginación */}
                  {totalPaginas > 1 && (
                    <div className="flex items-center justify-between mt-6 pt-4 border-t">
                      <div className="text-sm text-gray-500">
                        Mostrando {(paginaActual - 1) * comprasPorPagina + 1} -{" "}
                        {Math.min(
                          paginaActual * comprasPorPagina,
                          ventasCliente.length
                        )}{" "}
                        de {ventasCliente.length} compras
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
              ) : (
                <p className="text-center text-gray-500 py-4">
                  No tienes compras realizadas
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {!loading && !error && (
        <div className="space-y-4 mt-4">
          <h3 className="text-xl font-medium text-gray-500">
            Información de compras
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border p-3">
              <p className="text-xs text-gray-500">Total Gastado</p>
              <p className="text-lg font-bold">
                ${FormateoPrecio(totalGastado)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
