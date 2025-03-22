import { useState, useCallback, memo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { OrderList } from "./OrderList";

// El componente principal también puede beneficiarse de memo si sus props no cambian frecuentemente
export const Pedidos = memo(() => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Buscar pedido..."
            className="w-64"
            value={searchQuery}
            onChange={handleSearchChange}
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
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <OrderList filter={activeTab} searchQuery={searchQuery} />
        </CardContent>
      </Card>
    </>
  );
});
