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
import { useExportDataExc } from "../EXPORT/Pedidos/ExportDataExc";
import { useExportDataPDF } from "../EXPORT/Pedidos/ExportDataPDF";
import styles from "./styles/Orders.module.css";
import { Button } from "@/shared/components";

export const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { pedidos } = usePedidos();

  const { exportToExcel } = useExportDataExc(pedidos);
  const { exportToPDF } = useExportDataPDF(pedidos);

  // Estados disponibles con primera letra en mayúscula para la visualización
  const estadosOptions = ["Pendiente", "Pagado", "Cancelado"];

  // Filtrado de pedidos
  const filteredPedidos = useMemo(() => {
    return pedidos.filter((pedido) => {
      if (!pedido) return false;

      const nombreCliente = pedido.clienteId?.nombre || "";
      const estado = pedido.estado || "";
      const pedidoId = String(pedido.pedidoId || ""); // Convertimos a string para usar includes

      const term = searchTerm.toLowerCase();

      const coincideNombreCliente = nombreCliente.toLowerCase().includes(term);
      const coincideEstadoTexto = estado.toLowerCase().includes(term);
      const coincidePedidoId = pedidoId.includes(term);

      const coincideEstadoSeleccionado = !selectedStatus || estado === selectedStatus.toLowerCase();

      return (
        (coincideNombreCliente || coincideEstadoTexto || coincidePedidoId) &&
        coincideEstadoSeleccionado
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
        info="Administra los pedidos realizados."
        newInfo="Añadir Pedido"
        icon={ShoppingBag}
        actionComponent={<NuevoPedido onPedidoCreado={handlePedidoCreado} />}
      />

      <Card>
      <CardHeader>
          <div className="flex justify-between items-end mb-4">
            <div className={`${styles.buttonsExport} space-x-2`}>
              <Button
                className={`${styles.exportButton} hover:bg-green-600 text-white`}
                onClick={exportToExcel}>
                <Download className="mr-1 h-4 w-4" /> Excel
              </Button>
              <Button
                className={`${styles.exportButton} hover:bg-red-600 text-white`}
                onClick={exportToPDF}>
                <FileText className="mr-1 h-4 w-4" /> PDF
              </Button>
            </div>
          </div>
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
