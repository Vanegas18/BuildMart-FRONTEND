"use client";
import { Loader, X } from "lucide-react";
import { Button } from "@/shared/components";
import { useCategoriaProductos } from "@/core/context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Separator } from "@/shared/components/ui/separator";
import { Slider } from "@/shared/components/ui/slider";
import { useEffect } from "react";

export default function FilterSidebar({
  selectedCategories,
  priceRange,
  onFilterChange,
  onClearAll,
  maxPrice = 50000,
}) {
  const { categorias, obtenerCategorias, isLoaded, loading } =
    useCategoriaProductos();
  const isLoading = loading || !isLoaded;

  // Cargar categorias si aún no están cargados
  useEffect(() => {
    if (!isLoaded) {
      obtenerCategorias();
    }
  }, [obtenerCategorias, isLoaded]);

  // Handle category change
  const handleCategoryChange = (category, checked) => {
    const newCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category);

    onFilterChange(newCategories, priceRange);
  };

  // Handle price change
  const handlePriceChange = (value) => {
    console.log("Slider cambió a:", value);
    onFilterChange(selectedCategories, value);
  };

  // Check if any filters are applied
  const hasFilters =
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice;

  return (
    <div className="sticky top-20 rounded-lg border bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtros</h2>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-sm text-muted-foreground"
            onClick={onClearAll}>
            <X className="mr-1 h-3.5 w-3.5" />
            Limpiar todo
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader className="h-6 w-6 animate-spin text-primary mb-2" />
          <p className="text-sm text-muted-foreground">Cargando filtros...</p>
        </div>
      ) : (
        <Accordion
          type="multiple"
          defaultValue={["categories", "price", "status"]}
          className="space-y-4">
          {/* Categories filter */}
          <AccordionItem value="categories" className="border-none">
            <AccordionTrigger className="py-2 text-sm font-medium">
              Categorías
              {selectedCategories.length > 0 && (
                <span className="ml-auto mr-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                  {selectedCategories.length}
                </span>
              )}
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="space-y-2">
                {categorias.map((category) => (
                  <div
                    key={category._id}
                    className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category._id}`}
                      checked={selectedCategories.includes(category._id)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category._id, checked)
                      }
                    />
                    <label
                      htmlFor={`category-${category._id}`}
                      className="flex-1 cursor-pointer text-sm">
                      {category.nombre}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <Separator />

          {/* Price range filter */}
          <AccordionItem value="price" className="border-none">
            <AccordionTrigger className="py-2 text-sm font-medium">
              Precio
              {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <span className="ml-auto mr-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                  Filtrado
                </span>
              )}
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  min={0}
                  max={maxPrice}
                  step={Math.max(100, Math.floor(maxPrice / 100))}
                  onValueChange={handlePriceChange}
                  className="py-4"
                />

                <div className="flex items-center justify-between">
                  <div className="rounded-md border px-2 py-1 text-sm">
                    ${priceRange[0].toLocaleString()}
                  </div>
                  <div className="rounded-md border px-2 py-1 text-sm">
                    ${priceRange[1].toLocaleString()}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <Separator />

          {/* TODO:Status filter */}
          {/* <AccordionItem value="status" className="border-none">
            <AccordionTrigger className="py-2 text-sm font-medium">
              Estado
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="space-y-2">
                {["activo", "oferta", "agotado"].map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status}`}
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={(checked) =>
                        handleStatusChange(status, checked)
                      }
                    />
                    <label
                      htmlFor={`status-${status}`}
                      className="flex-1 cursor-pointer text-sm capitalize">
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem> */}

          <Separator />
        </Accordion>
      )}
    </div>
  );
}
