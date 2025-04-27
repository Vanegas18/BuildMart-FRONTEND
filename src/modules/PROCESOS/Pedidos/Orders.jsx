import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { ShoppingBag, FileText, Download } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HeaderContent,
  HeaderProcess,
  PaginationContent,
} from "../../Dashboard/Layout";
import { OrdersTable } from ".";
import { usePedidos } from "@/core/context";
import { NuevoPedido } from "./NuevoPedido";

export const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { pedidos } = usePedidos();

  // Estados disponibles con primera letra en mayúscula para la visualización
  const estadosOptions = ["Pendiente", "Pagado", "Cancelado"];

  // Filtrado de pedidos
  const filteredPedidos = useMemo(() => {
    return pedidos.filter((pedido) => {
      if (!pedido) return false;

      // Filtrar por nombre del cliente
      let coincideNombreCliente = true;
      if (searchTerm) {
        const nombreCliente = pedido.clienteId?.nombre || "";
        coincideNombreCliente = nombreCliente
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }

      // Filtrar por estado (convertir a minúsculas para comparar)
      let coincideEstado = true;
      if (selectedStatus) {
        coincideEstado = pedido.estado === selectedStatus.toLowerCase();
      }

      // Aplicar ambos filtros si están activos
      return (
        ((searchTerm && coincideNombreCliente) || !searchTerm) &&
        ((selectedStatus && coincideEstado) || !selectedStatus)
      );
    });
  }, [pedidos, searchTerm, selectedStatus]);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  // Refrescar cuando se crea un pedido
  const handlePedidoCreado = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
    setCurrentPage(1);
  }, []);

  // Función para manejar cambios de estado
  const handleEstadoCambiado = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title="Gestión de Pedidos"
        info="Administra los pedidos realizados"
        newInfo="Añadir Pedido"
        icon={ShoppingBag}
        actionComponent={<NuevoPedido onPedidoCreado={handlePedidoCreado} />}
      />

      <Card>
        <CardHeader>
          <HeaderProcess
            nameSection={"Listado de Pedidos"}
            section={"pedidos"}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            statusOptions={estadosOptions} // Usamos los estados con primera letra mayúscula
          />
        </CardHeader>
        <CardContent>
          <OrdersTable
            refreshTrigger={refreshTrigger}
            currentPage={currentPage}
            itemsPerPage={5}
            pedidos={filteredPedidos}
            onEstadoCambiado={handleEstadoCambiado}
          />
          <PaginationContent
            currentPage={currentPage}
            totalItems={filteredPedidos.length}
            itemsPerPage={5}
            onPageChange={setCurrentPage}
            nameSection="pedidos"
          />
        </CardContent>
      </Card>
    </main>
  );
};
