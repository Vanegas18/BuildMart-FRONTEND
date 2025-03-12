import {
  productsData,
  ProductsFilters,
  ProductsHeader,
  ProductsTable,
} from "@/components/Dashboard";
import { ProductsPagination } from "@/components/Dashboard/Content/Products/ProductsPagination ";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
      <ProductsHeader />

      <Card>
        <CardHeader>
          <ProductsFilters
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
          />
        </CardHeader>
        <CardContent>
          <ProductsTable products={filteredProducts} />
          <ProductsPagination
            currentPage={currentPage}
            totalItems={128}
            itemsPerPage={8}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </main>
  );
};
