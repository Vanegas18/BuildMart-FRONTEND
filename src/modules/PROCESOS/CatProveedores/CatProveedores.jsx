import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HeaderContent,
  HeaderProcess,
  PaginationContent,
} from "../../Dashboard/Layout";
import { CatProveedoresTable } from ".";
import { NuevaCategoriaProveedor } from "./NuevaCategoria";
import { useCatProveedores } from "@/core/context/CatProveedores";

export const CatProveedores = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { cateProveedores, obtenerCatProveedores } = useCatProveedores();
  
  const filteredCatProveedores = useMemo(() => {
    return cateProveedores.filter((catProveedor) => {
      if (!catProveedor || !catProveedor.nombre) return false;
      const catProveedorPorNombre = catProveedor.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const filtradoEstado =
        !selectedStatus || catProveedor.estado === selectedStatus;

      return catProveedorPorNombre && filtradoEstado;
    });
  }, [cateProveedores, searchTerm, selectedStatus]);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  // Función para actualizar la lista de categorías de proveedores
  const handleRefresh = useCallback(() => {
    // Incrementar el contador para forzar una actualización
    setRefreshTrigger(prev => prev + 1);
    // Forzar recarga de datos desde el servidor
    obtenerCatProveedores();
    // Opcional: volver a la primera página después de crear una categoría
    setCurrentPage(1);
  }, [obtenerCatProveedores]);

  // Cargar datos iniciales
  useEffect(() => {
    obtenerCatProveedores();
  }, [obtenerCatProveedores]);

  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title={"Gestión de Categorías de Proveedores"}
        info={"Administra el catálogo de categorías de proveedores"}
        newInfo={"Añadir Categoría"}
        icon={ShoppingBag}
        actionComponent={<NuevaCategoriaProveedor onCategoriaCreada={handleRefresh} />}
      />

      <Card>
        <CardHeader>
          <HeaderProcess
            nameSection={"Listado de Categorías de Proveedores"}
            section={"catProveedores"}
            searchTerm={searchTerm}
            selectedStatus={selectedStatus}
            onSearchChange={setSearchTerm}
            onStatusChange={setSelectedStatus}
            statusOptions={[
              "Activo", "Inactivo", 
            ]}
          />
        </CardHeader>
        <CardContent>
          <CatProveedoresTable 
            refreshTrigger={refreshTrigger} 
            catProveedores={filteredCatProveedores} 
            currentPage={currentPage} 
            itemsPerPage={5} 
            onCategoriaEditada={handleRefresh} 
            onEstadoCambiado={handleRefresh}
          />
          <PaginationContent
            currentPage={currentPage}
            totalItems={filteredCatProveedores.length}
            itemsPerPage={5}
            onPageChange={setCurrentPage}
            nameSection={"catProveedores"}
          />
        </CardContent>
      </Card>
    </main>
  );
};