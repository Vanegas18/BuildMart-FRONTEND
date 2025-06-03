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

  // Función para actualizar la lista de usuarios
  const handleUsuarioCreado = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
    setCurrentPage(1);
  }, []);

  return (
    <main className="flex-1 overflow-auto p-3 sm:p-6">
      {/* Header responsivo */}
      <div className={styles.headerContainer}>
        <div>
          <h1 className={styles.headerTitle}>Gestión de Administradores</h1>
          <p className={styles.headerDescription}>
            Administra los administradores del sistema.
          </p>
        </div>
        <div className="flex-shrink-0">
          <NuevoUsuario onUsuarioCreado={handleUsuarioCreado} />
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

          {/* Filtros responsivos */}

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

        <CardContent className="p-3 sm:p-6">
          <UsuariosTable
            refreshTrigger={refreshTrigger}
            usuarios={filteredUsuarios}
            currentPage={currentPage}
            itemsPerPage={5}
          />

          {/* Paginación */}
          <div className="mt-4 sm:mt-6">
            <PaginationContent
              currentPage={currentPage}
              itemsPerPage={5}
              nameSection={"usuarios"}
              totalItems={filteredUsuarios.length}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
