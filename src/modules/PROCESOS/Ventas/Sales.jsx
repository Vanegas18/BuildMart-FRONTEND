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
import styles from "../Productos/styles/Products.module.css";
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
      const ventaId = String(venta.ventaId || ""); // Asegúrate que ventaId esté como string
      return (
        clienteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ventaId.includes(searchTerm) &&
          (!selectedStatus || estado === selectedStatus))
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
    <main className="flex-1 overflow-auto p-3 sm:p-6">
      <div className={styles.headerContainer}>
        <div>
          <h1 className={styles.headerTitle}>Gestión de Ventas</h1>
          <p className={styles.headerDescription}>
            Administra las ventas realizadas.
          </p>
        </div>
        <div className="flex-shrink-0">
          <NuevaVenta onVentaCreada={handleVentaCreada} />
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
            <div className={`${styles.buttonsExport}`}>
              <Button
                className={`${styles.exportButton} bg-black hover:bg-green-700 text-white`}
                onClick={exportToExcel}
                size="sm">
                <Download className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Excel</span>
                <span className="sm:hidden">Excel</span>
              </Button>
              <Button
                className={`${styles.exportButton} bg-black hover:bg-red-700 text-white`}
                onClick={exportToPDF}
                size="sm">
                <FileText className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">PDF</span>
                <span className="sm:hidden">PDF</span>
              </Button>
            </div>
          </div>

          <div className={styles.filterContainer}>
            <div className={styles.searchInputContainer}>
              <HeaderProcess
                nameSection={"Listado de Ventas"}
                section={"ventas"}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                statusOptions={["Pendiente", "Completada", "Reembolsada"]} // Opciones de estado de la venta
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <SalesTable
            refreshTrigger={refreshTrigger}
            currentPage={currentPage}
            itemsPerPage={5}
            ventas={filteredVentas} // Pasamos las ventas filtradas
          />

          <div className="mt-4 sm:mt-6">
            <PaginationContent
              currentPage={currentPage}
              totalItems={filteredVentas.length}
              itemsPerPage={5}
              onPageChange={setCurrentPage}
              nameSection="ventas"
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
