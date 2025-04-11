import { useProductos } from "@/core/context";
import { Button } from "@/shared/components";
import { Separator } from "@/shared/components/ui/separator";
import { Grid, List, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import SortDropdown from "./SortDropdown";
import FilterSidebar from "./FilterSidebar";
import { AnimatePresence, motion } from "framer-motion";
import ProductGrid from "./ProductGrid";

export const ProductCatalog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [viewMode, setViewMode] = useState("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { productos, obtenerProductos, isLoaded } = useProductos();

  const categoryParam = searchParams.get("category");
  const priceMinParam = searchParams.get("priceMin");
  const priceMaxParam = searchParams.get("priceMax");
  const sortParam = searchParams.get("sort") || "featured";

  const selectedCategories = categoryParam ? categoryParam.split(",") : [];
  const priceMin = priceMinParam ? Number.parseInt(priceMinParam) : 0;
  const priceMax = priceMaxParam ? Number.parseInt(priceMaxParam) : 50000;

  // Cargar productos si aún no están cargados
  useEffect(() => {
    if (!isLoaded) {
      obtenerProductos();
    }
  }, [obtenerProductos, isLoaded]);

  // Filtrar y ordenar productos cuando cambien los productos o los filtros
  useEffect(() => {
    if (!productos || productos.length === 0) return;

    let result = [...productos];

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.categoriaId)
      );
    }

    // Apply precio filter - MODIFICADO: Solo aplica filtro de precio si hay parámetros explícitos
    if (priceMinParam !== null || priceMaxParam !== null) {
      result = result.filter(
        (product) => product.precio >= priceMin && product.precio <= priceMax
      );
    }

    // Apply sorting
    switch (sortParam) {
      case "precio-asc":
        result.sort((a, b) => a.precio - b.precio);
        break;
      case "precio-desc":
        result.sort((a, b) => b.precio - a.precio);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.date || Date.now()).getTime() -
            new Date(a.date || Date.now()).getTime()
        );
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Featured - no sorting needed
        break;
    }

    setFilteredProducts(result);
  }, [productos, categoryParam, priceMinParam, priceMaxParam, sortParam]);

  // Update URL with filter parameters
  const updateURL = (newParams) => {
    setSearchParams(newParams);
  };

  // Handle filter changes
  const handleFilterChange = (categories, precio) => {
    const newParams = new URLSearchParams(searchParams);

    // Limpiar parámetros existentes que vamos a actualizar
    newParams.delete("category");
    newParams.delete("priceMin");
    newParams.delete("priceMax");

    // Update category parameter
    if (categories.length > 0) {
      newParams.set("category", categories.join(","));
    }

    // Update precio parameters
    if (precio[0] > 0) {
      newParams.set("priceMin", precio[0].toString());
    }

    if (precio[1] < 50000) {
      newParams.set("priceMax", precio[1].toString());
    }

    // Preserve sort parameter
    if (sortParam !== "featured") {
      newParams.set("sort", sortParam);
    } else {
      newParams.delete("sort");
    }

    updateURL(newParams);
  };

  // Handle sort change
  const handleSortChange = (sort) => {
    const newParams = new URLSearchParams(searchParams);

    if (sort !== "featured") {
      newParams.set("sort", sort);
    } else {
      newParams.delete("sort");
    }

    updateURL(newParams);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileFiltersOpen(true)}>
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filtros
          </Button>

          <p className="text-sm text-muted-foreground">
            Mostrando{" "}
            <span className="font-medium text-foreground">
              {filteredProducts.length}
            </span>{" "}
            de {productos.length} productos
          </p>
        </div>

        <div className="flex items-center gap-2">
          <SortDropdown value={sortParam} onValueChange={handleSortChange} />

          <Separator orientation="vertical" className="mx-1 h-6" />

          <div className="flex items-center rounded-md border bg-white p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view">
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
              aria-label="List view">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Filters sidebar - desktop only */}
        <div className="hidden md:block">
          <FilterSidebar
            selectedCategories={selectedCategories}
            priceRange={[priceMin, priceMax]}
            onFilterChange={handleFilterChange}
            onClearAll={clearAllFilters}
          />
        </div>

        {/* Product grid or list */}
        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}>
                <ProductGrid products={filteredProducts} />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}>
                {/* <ProductList products={filteredProducts} /> */}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <h3 className="text-lg font-semibold">
                No se encontraron productos
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Intenta ajustar los filtros o buscar con otros términos.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={clearAllFilters}>
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
