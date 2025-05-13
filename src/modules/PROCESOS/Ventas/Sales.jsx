import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Download, FileText, ShoppingBag } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HeaderContent,
  HeaderProcess,
  PaginationContent,
} from "../../Dashboard/Layout";
import { SalesTable } from "."; // Asegúrate de tener este componente
import { useVentas } from "@/core/context/Ventas/VentasContext"; // Suponiendo que tienes el contexto de ventas
import { NuevaVenta } from "./NuevaVenta"; // Cambié a NuevaVenta aquí
import { useExportDataExc } from "../EXPORT/Ventas/ExportDataExc";
import { useExportDataPDF } from "../EXPORT/Ventas/ExportDataPDF";
import styles from "./styles/Sales.module.css";
import { Button } from "@/shared/components";

export const Sales = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const [selectedStatus, setSelectedStatus] = useState(""); // Estado para el filtro de estado
  const { ventas } = useVentas();

  const { exportToExcel } = useExportDataExc(ventas);
  const { exportToPDF } = useExportDataPDF(ventas);

  // Filtrado de ventas
  const filteredVentas = useMemo(() => {
    return ventas.filter((venta) => {
      const clienteName = venta.clienteId?.nombre || ""; // Nombre del cliente
      const estado = venta.estado || ""; // Estado de la venta
      return (
        (clienteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          estado.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!selectedStatus || estado === selectedStatus)
      );
    });
  }, [ventas, searchTerm, selectedStatus]);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  // Función para actualizar la lista de ventas
  const handleVentaCreada = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1); // Incrementamos el trigger para refrescar
    setCurrentPage(1); // Volver a la primera página después de crear una venta
  }, []);

  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title="Gestión de Ventas"
        info="Administra las ventas realizadas"
        newInfo="Añadir Venta"
        icon={ShoppingBag}
        actionComponent={<NuevaVenta onVentaCreada={handleVentaCreada} />}
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
            nameSection={"Listado de Ventas"}
            section={"ventas"}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            statusOptions={["Completada", "Reembolsada"]} // Opciones de estado de la venta
          />
        </CardHeader>
        <CardContent>
          <SalesTable
            refreshTrigger={refreshTrigger}
            currentPage={currentPage}
            itemsPerPage={5}
            ventas={filteredVentas} // Pasamos las ventas filtradas
          />
          <PaginationContent
            currentPage={currentPage}
            totalItems={filteredVentas.length}
            itemsPerPage={5}
            onPageChange={setCurrentPage} 
            nameSection="ventas"
          />
        </CardContent>
      </Card>
    </main>
  );
};
