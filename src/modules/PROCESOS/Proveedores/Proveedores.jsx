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
import styles from "../Productos/styles/Products.module.css";

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
    <main className="flex-1 overflow-auto p-3 sm:p-6">
      <div className={styles.headerContainer}>
        <div>
          <h1 className={styles.headerTitle}>Gestión de Proveedores</h1>
          <p className={styles.headerDescription}>
            Administra el catálogo de proveedores.
          </p>
        </div>
        <div className="flex-shrink-0">
          <NuevoProveedor onProveedorCreado={handleRefresh} />
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className={styles.filterContainer}>
            <div className={styles.searchInputContainer}>
              <HeaderProcess
                nameSection={"Listado de Proveedores"}
                section={"proveedores"}
                searchTerm={searchTerm}
                selectedStatus={selectedStatus}
                onSearchChange={setSearchTerm}
                onStatusChange={setSelectedStatus}
                statusOptions={["Activo", "Inactivo"]}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-3 sm:p-6">
          <ProveedoresTable
            refreshTrigger={refreshTrigger}
            proveedores={filteredProveedores}
            currentPage={currentPage}
            itemsPerPage={5}
          />

          <div className="mt-4 sm:mt-6">
            <PaginationContent
              currentPage={currentPage}
              totalItems={filteredProveedores.length}
              itemsPerPage={5}
              onPageChange={setCurrentPage}
              nameSection={"proveedores"}
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
