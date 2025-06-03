import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Download, FileText, ShoppingBag } from "lucide-react";
import { Users } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HeaderContent,
  HeaderProcess,
  PaginationContent,
} from "../../Dashboard/Layout";
import { ClientsTable } from ".";
import { NuevoCliente } from "./NuevoCliente";
import { useClientes } from "@/core/context/Clientes/ClientesContext"; // Contexto de clientes
import { useExportDataExc } from "../EXPORT/Clientes/ExportDataExc";
import { useExportDataPDF } from "../EXPORT/Clientes/ExportDataPDF";
import styles from "../Productos/styles/Products.module.css";
import { Button } from "@/shared/components";

export const Clients = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { clientes } = useClientes(); // Usamos el contexto de clientes

  const { exportToExcel } = useExportDataExc(clientes);
  const { exportToPDF } = useExportDataPDF(clientes);

  // Filtrado de clientes
  const filteredClients = useMemo(() => {
    return clientes.filter((cliente) => {
      const term = searchTerm.toLowerCase();
      const nombre = cliente.nombre?.toLowerCase() || "";
      const cedula = cliente.cedula?.toLowerCase() || ""; // Asegúrate de que el campo sea `cedula`

      const coincideBusqueda = nombre.includes(term) || cedula.includes(term);

      const coincideEstado =
        !selectedStatus || cliente.estado === selectedStatus;

      return coincideBusqueda && coincideEstado;
    });
  }, [clientes, searchTerm, selectedStatus]);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  // Función para actualizar la lista de clientes
  const handleClienteCreado = useCallback(() => {
    // Incrementar el contador para forzar una actualización
    setRefreshTrigger((prev) => prev + 1);
    // Opcional: volver a la primera página después de crear un cliente
    setCurrentPage(1);
  }, []);

  return (
    <main className="flex-1 overflow-auto p-3 sm:p-6">
      <div className={styles.headerContainer}>
        <div>
          <h1 className={styles.headerTitle}>Gestión de Clientes</h1>
          <p className={styles.headerDescription}>
            Administra la información de los clientes.
          </p>
        </div>
        <div className="flex-shrink-0">
          <NuevoCliente onClienteCreado={handleClienteCreado} />
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          {/* Botones de exportación responsivos */}
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

          <HeaderProcess
            nameSection={"Listado de Clientes"}
            section={"clientes"}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            statusOptions={["Activo", "Inactivo"]} // Modificado a los posibles estados de clientes
          />
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <ClientsTable
            refreshTrigger={refreshTrigger}
            currentPage={currentPage}
            itemsPerPage={5}
            clientes={filteredClients}
          />
          <div className="mt-4 sm:mt-6">
            <PaginationContent
              currentPage={currentPage}
              totalItems={filteredClients.length}
              itemsPerPage={5}
              onPageChange={setCurrentPage}
              nameSection={"clientes"}
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
