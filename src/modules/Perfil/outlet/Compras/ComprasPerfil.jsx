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
import { Loader2 } from "lucide-react";

export const ComprasPerfil = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    .filter((venta) => venta.clienteId._id === user.id)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  // Información de compras
  const totalGastado = ventasCliente.reduce(
    (total, venta) => total + venta.total,
    0
  );

  const totalProductos = ventasCliente.reduce(
    (total, venta) => total + venta.productos.length,
    0
  );

  const totalPedidos = ventasCliente.length;

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
                <ComprasList data={ventasCliente} />
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
            <div className="rounded-lg border p-3">
              <p className="text-xs text-gray-500">Productos</p>
              <p className="text-lg font-bold">{totalProductos}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-gray-500">Pedidos</p>
              <p className="text-lg font-bold">{totalPedidos}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
