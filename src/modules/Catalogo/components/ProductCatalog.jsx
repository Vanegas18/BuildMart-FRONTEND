import { useProductos } from "@/core/context";
import { Button } from "@/shared/components";
import { Separator } from "@/shared/components/ui/separator";
import { Grid, List, Loader, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import SortDropdown from "./SortDropdown";
import FilterSidebar from "./FilterSidebar";
import { AnimatePresence, motion } from "framer-motion";
import ProductGrid from "./ProductGrid";

export const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [maxProductPrice, setMaxProductPrice] = useState(50000);
  const [viewMode, setViewMode] = useState("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { productos, obtenerProductos, isLoaded, loading } = useProductos();
  const isLoading = loading || !isLoaded;

  const categoryParam = searchParams.get("category");
  const priceMinParam = searchParams.get("priceMin");
  const priceMaxParam = searchParams.get("priceMax");
  const sortParam = searchParams.get("sort") || "featured";

  const selectedCategories = categoryParam ? categoryParam.split(",") : [];
  const priceMin = priceMinParam ? Number(priceMinParam) : 0;
  const priceMax = priceMaxParam ? Number(priceMaxParam) : maxProductPrice;

  // Cargar productos si aún no están cargados
  useEffect(() => {
    if (!isLoaded) {
      obtenerProductos();
    }
  }, [obtenerProductos, isLoaded]);

  // Modificar el useEffect para obtener el precio máximo
  useEffect(() => {
    if (productos && productos.length > 0) {
      const highestPrice = Math.max(
        ...productos.map((product) => product.precio)
      );
      // Redondear hacia arriba a la siguiente cifra "redonda"
      const roundedMax = Math.ceil(highestPrice / 1000) * 1000;
      setMaxProductPrice(roundedMax);
    }
  }, [productos]);

  // Filtrar y ordenar productos cuando cambien los productos o los filtros
  useEffect(() => {
    if (!productos || productos.length === 0) return;

    let result = [...productos];

    // Filtrar solo productos activos, en oferta o agotados
    result = result.filter(
      (product) =>
        product.estado === "Activo" ||
        product.estado === "En oferta" ||
        product.estado === "Agotado"
    );

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.categoriaId)
      );
    }

    // Apply precio filter - MODIFICADO: Solo aplica filtro de precio si hay parámetros explícitos
    if (priceMinParam || priceMaxParam) {
      console.log("Aplicando filtro de precio:", priceMin, priceMax);
      result = result.filter((product) => {
        const precio = Number(product.precio);
        console.log(
          `Producto: ${product.nombre}, Precio: ${precio}, Incluido: ${
            precio >= priceMin && precio <= priceMax
          }`
        );
        return precio >= priceMin && precio <= priceMax;
      });
    }

    // Apply sorting
    switch (sortParam) {
      case "price-asc":
        result.sort((a, b) => {
          // Asegurarse de que los precios son números antes de ordenar
          const precioA = Number(a.precio) || 0;
          const precioB = Number(b.precio) || 0;
          return precioA - precioB;
        });
        break;
      case "price-desc":
        result.sort((a, b) => {
          // Asegurarse de que los precios son números antes de ordenar
          const precioA = Number(a.precio) || 0;
          const precioB = Number(b.precio) || 0;
          return precioB - precioA;
        });
        break;
      case "newest":
        result.sort((a, b) => {
          // Asegurarse de que las fechas son válidas y convertirlas a timestamp para ordenar
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA; // Más nuevos primero
        });
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
    newParams.set("priceMin", precio[0].toString());
    newParams.set("priceMax", precio[1].toString());

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

  // Estado de carga
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
      <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
      <h3 className="text-lg font-semibold">Cargando productos</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Por favor espera mientras cargamos los productos...
      </p>
    </div>
  );

  // Estado vacío (cuando no hay coincidencias con filtros)
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
      <h3 className="text-lg font-semibold">No se encontraron productos</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Intenta ajustar los filtros o buscar con otros términos.
      </p>
      <Button variant="outline" className="mt-4" onClick={clearAllFilters}>
        Limpiar filtros
      </Button>
    </div>
  );

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
            {!isLoading ? (
              <>
                Mostrando{" "}
                <span className="font-medium text-foreground">
                  {filteredProducts.length}
                </span>{" "}
                de {productos.length} productos
              </>
            ) : (
              "Cargando productos..."
            )}
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
            maxPrice={maxProductPrice}
            onFilterChange={handleFilterChange}
            onClearAll={clearAllFilters}
          />
        </div>

        {/* Product grid or list */}
        <div className="md:col-span-3">
          {isLoading ? (
            <LoadingState />
          ) : (
            <>
              {filteredProducts.length > 0 ? (
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
              ) : (
                <EmptyState />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
