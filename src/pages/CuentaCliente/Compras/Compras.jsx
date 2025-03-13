import { ComprasList } from "@/components/CuentaCliente/Content";
import { comprasData } from "@/components/CuentaCliente/Content/Compras/data/comprasData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Compras = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Compras</h1>
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Buscar producto..."
            className="w-64"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Historial de Compras</CardTitle>
            <Tabs defaultValue="all" className="w-auto">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="recent">Recientes</TabsTrigger>
                <TabsTrigger value="older">Anteriores</TabsTrigger>
              </TabsList>
            </Tabs>
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
        <div className="grid grid-cols-2 gap-4">
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
          <div className="rounded-lg border p-3">
            <p className="text-xs text-gray-500">Garantías Activas</p>
            <p className="text-lg font-bold">8</p>
          </div>
        </div>
      </div>
    </>
  );
};
