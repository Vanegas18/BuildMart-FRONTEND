import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ComprasList } from "./ComprasList";
import { comprasData } from "./data/comprasData";
import { useEffect, useState } from "react";
import { useAuth, useVentas } from "@/core/context";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";

export const ComprasPerfil = () => {
  const [loading, setLoading] = useState(true);
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
          <div className="space-y-4">
            <ComprasList data={ventasCliente} />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-medium text-gray-500">
          Información de compras
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border p-3">
            <p className="text-xs text-gray-500">Total Gastado</p>
            <p className="text-lg font-bold">${FormateoPrecio(totalGastado)}</p>
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
    </>
  );
};
