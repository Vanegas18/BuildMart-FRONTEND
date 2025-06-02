import { Button } from "@/shared/components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useCallback } from "react";

export const PaginationContent = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  nameSection,
}) => {
  // Calculamos totalPages solo cuando cambien las dependencias
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );

  // Memorizamos la función para evitar recrearla en cada render
  const goToPage = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    },
    [totalPages, onPageChange]
  );

  // Memorizamos la generación de botones con lógica responsive
  const pageButtons = useMemo(() => {
    const buttons = [];
    // Menos páginas visibles en móvil
    const maxVisiblePages = window.innerWidth < 640 ? 2 : 3;

    // Calculamos el rango de páginas a mostrar
    let startPage = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1
      )
    );

    startPage = Math.max(
      1,
      Math.min(startPage, totalPages - maxVisiblePages + 1)
    );

    if (startPage < 1) startPage = 1;

    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    // Mostrar primera página si no está en el rango
    if (startPage > 1) {
      buttons.push(
        <Button
          key={1}
          variant="outline"
          size="sm"
          className={currentPage === 1 ? "bg-black text-white" : ""}
          onClick={() => goToPage(1)}>
          1
        </Button>
      );

      // Mostrar puntos suspensivos si hay un gap
      if (startPage > 2) {
        buttons.push(
          <span key="start-ellipsis" className="px-2 text-gray-400 text-sm">
            ...
          </span>
        );
      }
    }

    // Páginas del rango actual
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant="outline"
          size="sm"
          className={`h-8 w-8 ${
            currentPage === i ? "bg-black text-white" : ""
          }`}
          onClick={() => goToPage(i)}>
          {i}
        </Button>
      );
    }

    // Mostrar última página si no está en el rango
    if (endPage < totalPages) {
      // Mostrar puntos suspensivos si hay un gap
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="end-ellipsis" className="px-2 text-gray-400 text-sm">
            ...
          </span>
        );
      }

      buttons.push(
        <Button
          key={totalPages}
          variant="outline"
          size="sm"
          className={`h-8 w-8 ${
            currentPage === totalPages ? "bg-black text-white" : ""
          }`}
          onClick={() => goToPage(totalPages)}>
          {totalPages}
        </Button>
      );
    }

    return buttons;
  }, [currentPage, totalPages, goToPage]);

  // Calculamos el rango de elementos con texto responsive
  const descriptiveText = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);

    if (totalItems === 0) {
      return `No hay ${nameSection}`;
    }

    const itemsOnThisPage = endIndex - startIndex + 1;

    // Texto más corto para móvil
    if (window.innerWidth < 640) {
      return `${itemsOnThisPage} de ${totalItems}`;
    }

    return `Mostrando ${itemsOnThisPage} de ${totalItems} ${nameSection}`;
  }, [currentPage, itemsPerPage, totalItems, nameSection]);

  // Información de página para móvil
  const pageInfo = useMemo(() => {
    return `${currentPage} / ${totalPages}`;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) {
    return (
      <div className="flex items-center justify-center mt-4">
        <p className="text-sm text-gray-500">{descriptiveText}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3 sm:space-y-0">
      {/* Layout para móvil */}
      <div className="block sm:hidden">
        {/* Información de elementos */}
        <div className="flex justify-center mb-3">
          <p className="text-sm text-gray-500">{descriptiveText}</p>
        </div>

        {/* Controles de paginación compactos */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            className="flex items-center gap-1 px-3">
            <ChevronLeft className="h-4 w-4" />
            <span className="text-xs">Anterior</span>
          </Button>

          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-600 px-2">
              Página {pageInfo}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
            className="flex items-center gap-1 px-3">
            <span className="text-xs">Siguiente</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Layout para desktop */}
      <div className="hidden sm:flex sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">{descriptiveText}</p>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          <div className="flex items-center gap-1">{pageButtons}</div>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
            className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Página siguiente</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
