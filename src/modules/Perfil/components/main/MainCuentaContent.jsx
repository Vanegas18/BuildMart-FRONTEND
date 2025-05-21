import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { MainOrders } from "./MainOrders";
import { useAuth, usePedidos } from "@/core/context";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";

export const MainCuentaContent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const pedidosCliente = useMemo(() => {
    return pedidos
    .filter((pedido) => {
      // Validamos que clienteId exista y tenga _id antes de acceder a ella
      return pedido && pedido.clienteId && pedido.clienteId._id === user?.id;
    })
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  }, [pedidos, user.id]);

  const totalPedidos = pedidosCliente.length;

  const totalGastado = useMemo(() => {
    return pedidosCliente.reduce((total, pedido) => total + pedido.total, 0);
  }, [pedidosCliente]);

  // Memorizamos los datos de las tarjetas para evitar recrearlas en cada renderizado
  const cardData = useMemo(
    () => [
      {
        id: 1,
        title: "Pedidos Totales",
        value: totalPedidos,
      },
      {
        id: 2,
        title: "Total Gastado",
        value: `$${FormateoPrecio(totalGastado)}`,
      },
    ],
    [totalPedidos, totalGastado]
  );

  // Renderizado de cada tarjeta según su tipo
  const renderCard = (card) => (
    <Card key={card.id}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{card.value}</div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
        <p className="text-muted-foreground">
          Cargando información de tu cuenta...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center text-red-700">
        <p className="font-medium">{error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => {
            setError(null);
            fetchPedidos();
          }}>
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Header con botón de navegación */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bienvenido, {user.nombre}</h1>
        <Link to="/">
          <Button variant="outline">
            <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
            Ir a la tienda
          </Button>
        </Link>
      </div>

      {/* Grid de tarjetas de información */}
      <div className="grid gap-6 md:grid-cols-2">
        {cardData.map(renderCard)}
      </div>

      {/* Componente de órdenes */}
      <MainOrders pedidos={pedidosCliente} />
    </>
  );
};

export default React.memo(MainCuentaContent);
