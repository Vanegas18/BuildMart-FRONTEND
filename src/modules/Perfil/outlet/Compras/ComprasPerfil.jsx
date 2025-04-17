import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ComprasList } from "./ComprasList";
import { comprasData } from "./data/comprasData";

export const ComprasPerfil = () => {
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
            <ComprasList data={comprasData} />
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
            <p className="text-lg font-bold">$7,590</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-xs text-gray-500">Productos</p>
            <p className="text-lg font-bold">24</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-xs text-gray-500">Pedidos</p>
            <p className="text-lg font-bold">12</p>
          </div>
        </div>
      </div>
    </>
  );
};
