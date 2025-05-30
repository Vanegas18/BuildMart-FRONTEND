import {
  HeaderContent,
  HeaderProcess,
  PaginationContent,
} from "@/modules/Dashboard/Layout";
import { FolderTree } from "lucide-react";
import { CategoriesMain } from "./CategoriesMain";
import { useCategoriaProductos } from "@/core/context/CategoriasProductos/CategoriasContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NuevaCategoria } from "./NuevaCategoria/NuevaCategoria";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";

export const CategoriesProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { categorias, obtenerCategorias } = useCategoriaProductos();

  // Filtrado de productos
  const filteredCategorias = useMemo(() => {
    return categorias.filter((categoria) => {
      const categoriaPorNombre = categoria.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const filtradoEstado =
        !selectedStatus || categoria.estado === selectedStatus;

      return categoriaPorNombre && filtradoEstado;
    });
  }, [categorias, searchTerm, selectedStatus]);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  // Función para actualizar la lista de productos
  const handleProductoCreado = useCallback(() => {
    // Incrementar el contador para forzar una actualización
    setRefreshTrigger((prev) => prev + 1);
    // Opcional: volver a la primera página después de crear un producto
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    obtenerCategorias();
  }, [obtenerCategorias]);

  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title={"Gestión de Categorías"}
        info={"Administra las categorías de productos."}
        newInfo={"Nueva Categoría"}
        icon={FolderTree}
        actionComponent={
          <NuevaCategoria onCategoriaCreada={handleProductoCreado} />
        }
      />

      <Card>
        <CardHeader>
          <HeaderProcess
            nameSection={"Listado de Categorías"}
            section={"categorías"}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            statusOptions={["Activa", "Inactiva"]}
          />
        </CardHeader>
        <CardContent>
          <CategoriesMain
            refreshTrigger={refreshTrigger}
            currentPage={currentPage}
            itemsPerPage={6}
            categorias={filteredCategorias}
          />
          <PaginationContent
            currentPage={currentPage}
            totalItems={filteredCategorias.length}
            itemsPerPage={6}
            onPageChange={setCurrentPage}
            nameSection={"categorías"}
          />
        </CardContent>
      </Card>
    </main>
  );
};
