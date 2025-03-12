import {
  FiltersContent,
  HeaderContent,
  PaginationContent,
  productCategories,
  productsData,
  ProductsTable,
  productStatuses,
} from "@/components/Dashboard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

export const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({
    category: null,
    status: null,
  });

  // Aquí podrías implementar la lógica de filtrado real
  const filteredProducts = productsData.filter((product) => {
    // Ejemplo básico de filtrado por búsqueda
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title={"Gestión de Productos"}
        info={"Administra el catálogo de productos"}
        newInfo={"Añadir Producto"}
        icon={ShoppingBag}
      />

      <Card>
        <CardHeader>
          <FiltersContent
            nameSection={"Listado de Productos"}
            section={"productos"}
            data1={productCategories}
            data2={productStatuses}
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
          />
        </CardHeader>
        <CardContent>
          <ProductsTable products={filteredProducts} />
          <PaginationContent
            currentPage={currentPage}
            totalItems={128}
            itemsPerPage={8}
            onPageChange={setCurrentPage}
            nameSection={"productos"}
          />
        </CardContent>
      </Card>
    </main>
  );
};
