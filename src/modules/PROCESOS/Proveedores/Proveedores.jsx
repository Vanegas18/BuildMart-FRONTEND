import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HeaderContent,
  HeaderProcess,
  PaginationContent,
} from "../../Dashboard/Layout";
import { ProveedoresTable } from ".";
import { NuevoProveedor } from "./NuevoProveedor";
import { useProveedores } from "@/core/context/Proveedores";

export const Proveedores = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { proveedores } = useProveedores();

  const filteredProveedores = useMemo(() => {
    return proveedores.filter((proveedor) => {
      if (!proveedor || !proveedor.nombre) return false;
      const proveedorPorNombre = proveedor.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const filtradoEstado =
        !selectedStatus || proveedor.estado === selectedStatus;

      return proveedorPorNombre && filtradoEstado;
    });
  }, [proveedores, searchTerm, selectedStatus]);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  // Función para actualizar la lista de proveedores
  const handleRefresh = useCallback(() => {
    // Incrementar el contador para forzar una actualización
    setRefreshTrigger((prev) => prev + 1);
    // Opcional: volver a la primera página después de crear un proveedor
    setCurrentPage(1);
  }, []);

  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title={"Gestión de Proveedores"}
        info={"Administra el catálogo de proveedores"}
        newInfo={"Añadir Proveedor"}
        icon={ShoppingBag}
        actionComponent={<NuevoProveedor onProveedorCreado={handleRefresh} />}
      />

      <Card>
        <CardHeader>
          <HeaderProcess
            nameSection={"Listado de Proveedores"}
            section={"proveedores"}
            searchTerm={searchTerm}
            selectedStatus={selectedStatus}
            onSearchChange={setSearchTerm}
            onStatusChange={setSelectedStatus}
            statusOptions={["Activo", "Inactivo"]}
          />
        </CardHeader>
        <CardContent>
          <ProveedoresTable
            refreshTrigger={refreshTrigger}
            proveedores={filteredProveedores}
            currentPage={currentPage}
            itemsPerPage={5}
          />
          <PaginationContent
            currentPage={currentPage}
            totalItems={filteredProveedores.length}
            itemsPerPage={5}
            onPageChange={setCurrentPage}
            nameSection={"proveedores"}
          />
        </CardContent>
      </Card>
    </main>
  );
};
