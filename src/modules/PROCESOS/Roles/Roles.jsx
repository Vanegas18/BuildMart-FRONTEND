import { HeaderContent, HeaderProcess } from "@/modules/Dashboard/Layout";
import { UserPlus } from "lucide-react";
import { RolesContent } from "./RolesContent";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRoles } from "@/core/context";

export const Roles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { roles } = useRoles();

  // Filtrado de roles
  const filteredRoles = useMemo(() => {
    return roles.filter((rol) => {
      const RolPorNombre = rol.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const filtradoEstado = !selectedStatus || rol.estado === selectedStatus;

      return RolPorNombre && filtradoEstado;
    });
  }, [roles, searchTerm, selectedStatus]);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  // Función para actualizar la lista de productos
  const handleRolCreado = useCallback(() => {
    // Incrementar el contador para forzar una actualización
    setRefreshTrigger((prev) => prev + 1);
    // Opcional: volver a la primera página después de crear un producto
    setCurrentPage(1);
  }, []);

  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title={"Gestión de Roles"}
        icon={UserPlus}
        info={"Define roles con diferentes niveles de acceso y permisos"}
        newInfo={"Añadir Rol"}
      />

      <Card>
        <CardHeader>
          <HeaderProcess
            nameSection={"Listado de roles"}
            section={"roles"}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            statusOptions={["Activo", "Inactivo"]}
          />
        </CardHeader>
        <CardContent>
          <RolesContent
            refreshTrigger={refreshTrigger}
            currentPage={currentPage}
            itemsPerPage={5}
            roles={filteredRoles}
          />
        </CardContent>
      </Card>
    </main>
  );
};
