import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/shared/components";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet";
import { Separator } from "@/shared/components/ui/separator";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Slider } from "@/shared/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { useCategoriaProductos } from "@/core/context";

export default function MobileFilters({
  open,
  onOpenChange,
  selectedCategories,
  priceRange,
  onFilterChange,
  onClearAll,
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

  // Local state for filters
  const [localCategories, setLocalCategories] = useState([]);
  const [localPriceRange, setLocalPriceRange] = useState([0, 50000]);

  // Reset local state when dialog opens
  useEffect(() => {
    if (open) {
      setLocalCategories([...selectedCategories]);
      setLocalPriceRange([...priceRange]);
    }
  }, [open, selectedCategories, priceRange]);

  // Handle category change
  const handleCategoryChange = (category, checked) => {
    setLocalCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  // Apply filters and close sheet
  const applyFilters = () => {
    onFilterChange(localCategories, localPriceRange);
    onOpenChange(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setLocalCategories([]);
    setLocalPriceRange([0, 50000]);
  };

  // Check if any filters are applied
  const hasFilters =
    localCategories.length > 0 ||
    localPriceRange[0] > 0 ||
    localPriceRange[1] < 50000;

  // Count of applied filters
  const filterCount =
    localCategories.length +
    (localPriceRange[0] > 0 || localPriceRange[1] < 50000 ? 1 : 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full max-w-md p-0 sm:max-w-md">
        <SheetHeader className="border-b p-4">
          <div className="flex items-center justify-between">
            <SheetTitle>Filtros</SheetTitle>
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-sm text-muted-foreground"
                onClick={clearFilters}>
                <X className="mr-1 h-3.5 w-3.5" />
                Limpiar
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="max-h-[calc(100vh-10rem)] overflow-y-auto p-4">
          <Accordion
            type="multiple"
            defaultValue={["categories", "price"]}
            className="space-y-4">
            {/* Categories filter */}
            <AccordionItem value="categories" className="border-none">
              <AccordionTrigger className="py-2 text-sm font-medium">
                Categorías
                {localCategories.length > 0 && (
                  <span className="ml-auto mr-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                    {localCategories.length}
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
                        id={`mobile-category-${category._id}`}
                        checked={selectedCategories.includes(category._id)}
                        onChange={(e) =>
                          handleCategoryChange(category._id, checked)
                        }
                      />
                      <label
                        htmlFor={`mobile-category-${category._id}`}
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
                {(localPriceRange[0] > 0 || localPriceRange[1] < 50000) && (
                  <span className="ml-auto mr-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                    Filtrado
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="space-y-4">
                  <Slider
                    value={localPriceRange}
                    min={0}
                    max={50000}
                    step={1000}
                    onChange={(value) => setLocalPriceRange(value)}
                    className="py-4"
                  />

                  <div className="flex items-center justify-between">
                    <div className="rounded-md border px-2 py-1 text-sm">
                      ${localPriceRange[0].toLocaleString()}
                    </div>
                    <div className="rounded-md border px-2 py-1 text-sm">
                      ${localPriceRange[1].toLocaleString()}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-medium">{filterCount}</span> filtros
              aplicados
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={applyFilters}>
                Ver resultados
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
