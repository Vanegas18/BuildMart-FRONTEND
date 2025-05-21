import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import {
  HeaderContent,
  HeaderProcess,
  PaginationContent,
} from "@/modules/Dashboard/Layout";
import { ShieldPlus } from "lucide-react";
import { PermisosContent } from "./PermisosContent";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePermisos } from "@/core/context";
import { NuevoPermiso } from "./NuevoPermiso/NuevoPermiso";

export const Permisos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { permisos } = usePermisos();

  // Filtrado de permisos
  const filteredPermisos = useMemo(() => {
    return permisos.filter((permiso) => {
      const PermisoPorNombre = permiso.nombreGrupo
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const filtradoEstado =
        !selectedStatus || permiso.estado === selectedStatus;

      return PermisoPorNombre && filtradoEstado;
    });
  }, [permisos, searchTerm, selectedStatus]);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  // Función para actualizar la lista de roles
  const handlePermisoCreado = useCallback(() => {
    // Incrementar el contador para forzar una actualización
    setRefreshTrigger((prev) => prev + 1);
    // Opcional: volver a la primera página después de crear un rol
    setCurrentPage(1);
  }, []);

  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title={"Gestión de Permisos"}
        info={"Define permisos granulares para cada permiso del sistema"}
        newInfo={"Añadir Permiso"}
        icon={ShieldPlus}
        // actionComponent={<NuevoPermiso onPermisoCreado={handlePermisoCreado} />}
      />

      <Card>
        <CardHeader>
          <HeaderProcess
            nameSection={"Listado de Permisos"}
            section={"permisos"}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            statusOptions={["Activo", "Inactivo"]}
          />
        </CardHeader>
        <CardContent>
          <PermisosContent
            refreshTrigger={refreshTrigger}
            currentPage={currentPage}
            itemsPerPage={3}
            permisos={filteredPermisos}
          />
          <PaginationContent
            currentPage={currentPage}
            totalItems={filteredPermisos.length}
            itemsPerPage={3}
            onPageChange={setCurrentPage}
            nameSection={"permisos"}
          />
        </CardContent>
      </Card>
    </main>
  );
};
