import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HeaderContent,
  HeaderProcess,
  PaginationContent,
} from "../../Dashboard/Layout";
import { ProductsTable } from ".";
import { NuevoProducto } from "./NuevoProducto";
import { useProductos } from "@/core/context";

export const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { productos } = useProductos();

  // Filtrado de productos
  const filteredProductos = useMemo(() => {
    return productos.filter((producto) => {
      const productoPorNombre = producto.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const filtradoEstado =
        !selectedStatus || producto.estado === selectedStatus;

      return productoPorNombre && filtradoEstado;
    });
  }, [productos, searchTerm, selectedStatus]);

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

  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title={"Gestión de Productos"}
        info={"Administra el catálogo de productos"}
        newInfo={"Añadir Producto"}
        icon={ShoppingBag}
        actionComponent={
          <NuevoProducto onProductoCreado={handleProductoCreado} />
        }
      />

      <Card>
        <CardHeader>
          <HeaderProcess
            nameSection={"Listado de Productos"}
            section={"productos"}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />
        </CardHeader>
        <CardContent>
          <ProductsTable
            refreshTrigger={refreshTrigger}
            currentPage={currentPage}
            itemsPerPage={5}
            productos={filteredProductos}
          />
          <PaginationContent
            currentPage={currentPage}
            totalItems={filteredProductos.length}
            itemsPerPage={5}
            onPageChange={setCurrentPage}
            nameSection={"productos"}
          />
        </CardContent>
      </Card>
    </main>
  );
};
