import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import {
  HeaderContent,
  HeaderProcess,
  PaginationContent,
} from "@/modules/Dashboard/Layout";
import { Download, FileText, UserPlus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { UsuariosTable } from "./UsuariosTable";
import { useUsuarios } from "@/core/context";
import { NuevoUsuario } from "./NuevoUsuario";
import { useExportDataExcelUsers } from "../EXPORT/Usuarios/ExportDataExc";
import { useExportDataPDFUsers } from "../EXPORT/Usuarios/ExportDataPDF";
import { Button } from "@/shared/components";
import styles from "../Productos/styles/Products.module.css";

export const Usuarios = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { usuarios } = useUsuarios();

  // Hooks para exportación
  const { exportToExcel } = useExportDataExcelUsers(usuarios);
  const { exportToPDF } = useExportDataPDFUsers(usuarios);

  // Filtrado de usuarios
  const filteredUsuarios = useMemo(() => {
    return usuarios.filter((usuario) => {
      const usuariosPorNombre = usuario.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const filtradoEstado =
        !selectedStatus || usuario.estado === selectedStatus;

      return usuariosPorNombre && filtradoEstado;
    });
  }, [usuarios, searchTerm, selectedStatus]);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  // Función para actualizar la lista de productos
  const handleUsuarioCreado = useCallback(() => {
    // Incrementar el contador para forzar una actualización
    setRefreshTrigger((prev) => prev + 1);
    // Opcional: volver a la primera página después de crear un producto
    setCurrentPage(1);
  }, []);

  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title={"Gestión de Administradores"}
        info={"Administra los administradores del sistema"}
        newInfo={"Añadir Administrador"}
        icon={UserPlus}
        actionComponent={<NuevoUsuario onUsuarioCreado={handleUsuarioCreado} />}
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
            nameSection={"Listado de Administradores"}
            section={"administradores"}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            statusOptions={["Activo", "Inactivo"]}
          />
        </CardHeader>
        <CardContent>
          <UsuariosTable
            refreshTrigger={refreshTrigger}
            usuarios={filteredUsuarios}
            currentPage={currentPage}
            itemsPerPage={5}
          />
          <PaginationContent
            currentPage={currentPage}
            itemsPerPage={5}
            nameSection={"usuarios"}
            totalItems={filteredUsuarios.length}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </main>
  );
};
