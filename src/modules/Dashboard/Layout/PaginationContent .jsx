import { Button } from "@/shared/components";
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

  // Memorizamos la generación de botones para evitar cálculos innecesarios
  const pageButtons = useMemo(() => {
    const buttons = [];
    const maxVisiblePages = 3;

    // Calculamos el rango de páginas a mostrar de forma más inteligente
    let startPage = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1
      )
    );

    // Si hay pocas páginas, startPage siempre será 1
    startPage = Math.max(
      1,
      Math.min(startPage, totalPages - maxVisiblePages + 1)
    );

    // Si startPage es negativo (cuando totalPages < maxVisiblePages), establecerlo a 1
    if (startPage < 1) startPage = 1;

    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant="outline"
          size="sm"
          className={currentPage === i ? "bg-black text-white" : ""}
          onClick={() => goToPage(i)}>
          {i}
        </Button>
      );
    }

    return buttons;
  }, [currentPage, totalPages, goToPage]);

  // Calculamos texto descriptivo con useMemo
  const descriptiveText = useMemo(() => {
    return `Mostrando ${itemsPerPage} de ${totalItems} ${nameSection}`;
  }, [currentPage, itemsPerPage, totalItems, nameSection]);

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-gray-500">{descriptiveText}</p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="xl"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}>
          Anterior
        </Button>

        {pageButtons}

        <Button
          variant="outline"
          size="xl"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};
