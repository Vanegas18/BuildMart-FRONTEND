import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ShoppingCart } from "lucide-react";
import { MainOrders } from "./MainOrders";

export const MainCuentaContent = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bienvenido, Juan</h1>
        <Button variant="outline">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Ir a la tienda
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Pedidos Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">2 pedidos en proceso</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Gastado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,240</div>
            <p className="text-xs text-gray-500">Últimos 12 meses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Puntos de Fidelidad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Nivel Plata</span>
                <span>500 pts para Oro</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <MainOrders />
    </>
  );
};
