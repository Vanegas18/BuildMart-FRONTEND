import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useCallback, useState } from "react";
import {
  HeaderContent,
  HeaderProcess,
  PaginationContent,
} from "../../Dashboard/Layout";
import { OrdersTable } from ".";
import { usePedidos } from "@/core/context";
import { NuevoPedido } from "./NuevoPedido"; // Asegúrate de tener este componente

export const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { pedidos } = usePedidos();

  // Paginación
  const itemsPerPage = 5;
  const totalItems = pedidos.length;

  // Refrescar cuando se crea un pedido
  const handlePedidoCreado = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
    setCurrentPage(1);
  }, []);

  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title="Gestión de Pedidos"
        info="Administra los pedidos realizados"
        newInfo="Añadir Pedido"
        icon={ShoppingBag}
        actionComponent={
          <NuevoPedido onPedidoCreado={handlePedidoCreado} />
        }
      />

      <Card>
        <CardHeader>
          <HeaderProcess
            nameSection={"Listado de Pedidos"}
            section={"pedidos"}
            showStatusFilter={false} // opcional
          />
        </CardHeader>
        <CardContent>
          <OrdersTable
            refreshTrigger={refreshTrigger}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
          <PaginationContent
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            nameSection="pedidos"
          />
        </CardContent>
      </Card>
    </main>
  );
};
