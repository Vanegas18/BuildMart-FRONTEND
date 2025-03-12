import { Button } from "@/components";

export const PaginationContent = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  nameSection
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisiblePages = 3;

    // Simplificado para mantener siempre visible al menos 3 páginas
    for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
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
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-gray-500">
        Mostrando {itemsPerPage} de {totalItems} {nameSection}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="xl"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}>
          Anterior
        </Button>

        {renderPageButtons()}

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
