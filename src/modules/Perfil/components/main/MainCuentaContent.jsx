import React, { useMemo } from "react";
import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/shared/components/ui";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { MainOrders } from "./MainOrders";

export const MainCuentaContent = () => {
  // Memorizamos los datos de las tarjetas para evitar recrearlas en cada renderizado
  const cardData = useMemo(
    () => [
      {
        id: 1,
        title: "Pedidos Totales",
        value: "12",
        subtitle: "2 pedidos en proceso",
      },
      {
        id: 2,
        title: "Total Gastado",
        value: "$3,240",
        subtitle: "Últimos 12 meses",
      },
      {
        id: 3,
        title: "Puntos de Fidelidad",
        value: "324",
        subtitle: null, // No tiene subtítulo estándar
        hasProgress: true,
        progressValue: 40,
        progressLabel: "Nivel Plata",
        progressTarget: "500 pts para Oro",
      },
    ],
    []
  ); // Array vacío porque los datos son estáticos

  // Renderizado de cada tarjeta según su tipo
  const renderCard = (card) => (
    <Card key={card.id}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{card.value}</div>
        {card.subtitle && (
          <p className="text-xs text-gray-500">{card.subtitle}</p>
        )}

        {/* Renderizado condicional para la barra de progreso */}
        {card.hasProgress && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>{card.progressLabel}</span>
              <span>{card.progressTarget}</span>
            </div>
            <Progress value={card.progressValue} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      {/* Header con botón de navegación */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bienvenido, Juan</h1>
        <Link to="/">
          <Button variant="outline">
            <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
            Ir a la tienda
          </Button>
        </Link>
      </div>

      {/* Grid de tarjetas de información */}
      <div className="grid gap-6 md:grid-cols-3">
        {cardData.map(renderCard)}
      </div>

      {/* Componente de órdenes */}
      <MainOrders />
    </>
  );
};

export default React.memo(MainCuentaContent);
