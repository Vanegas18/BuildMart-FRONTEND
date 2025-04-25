import { useState, useCallback, memo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { OrderList } from "./OrderList";
import { Loader2 } from "lucide-react";
import { usePedidos } from "@/core/context";

// El componente principal también puede beneficiarse de memo si sus props no cambian frecuentemente
export const Pedidos = memo(() => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { pedidos, loading, obtenerPedidos } = usePedidos(); // Suponiendo que tienes un contexto similar

  // Cargamos los pedidos al montar el componente
  useEffect(() => {
    obtenerPedidos();
  }, [obtenerPedidos]);

  // Optimizamos el manejador de cambio de búsqueda con useCallback
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Optimizamos el manejador de cambio de tab con useCallback
  const handleTabChange = useCallback((value) => {
    setActiveTab(value);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Pedidos</h1>
        <div className="w-64">
          <Input
            placeholder="Buscar pedidos..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Historial de Pedidos</CardTitle>
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-auto">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="processing">En Proceso</TabsTrigger>
                <TabsTrigger value="completed">Completados</TabsTrigger>
                <TabsTrigger value="canceled">Cancelados</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-muted-foreground">
                Cargando pedidos...
              </span>
            </div>
          ) : pedidos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No se encontraron pedidos
            </div>
          ) : (
            <OrderList filter={activeTab} searchQuery={searchQuery} />
          )}
        </CardContent>
      </Card>
    </>
  );
});
