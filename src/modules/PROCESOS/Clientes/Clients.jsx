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
import styles from "./styles/Clients.module.css";
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

      const coincideBusqueda =
        nombre.includes(term) || cedula.includes(term);

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
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title={"Gestión de Clientes"}
        info={"Administra la información de los clientes"}
        newInfo={"Añadir Cliente"}
        icon={Users}
        actionComponent={<NuevoCliente onClienteCreado={handleClienteCreado} />}
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
            nameSection={"Listado de Clientes"}
            section={"clientes"}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            statusOptions={["Activo", "Inactivo"]} // Modificado a los posibles estados de clientes
          />
        </CardHeader>
        <CardContent>
          <ClientsTable
            refreshTrigger={refreshTrigger}
            currentPage={currentPage}
            itemsPerPage={5}
            clientes={filteredClients}
          />
          <PaginationContent
            currentPage={currentPage}
            totalItems={filteredClients.length}
            itemsPerPage={5}
            onPageChange={setCurrentPage}
            nameSection={"clientes"}
          />
        </CardContent>
      </Card>
    </main>
  );
};
