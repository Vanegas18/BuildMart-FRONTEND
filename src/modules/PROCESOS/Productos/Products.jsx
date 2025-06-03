import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Download, FileText, ShoppingBag } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HeaderContent,
  HeaderProcess,
  PaginationContent,
} from "../../Dashboard/Layout";
import { ProductsTable } from ".";
import { NuevoProducto } from "./NuevoProducto";
import { useProductos } from "@/core/context";
import { useExportData } from "../EXPORT/Products/ExportDataExc";
import { useExportDataPDF } from "../EXPORT/Products/ExportDataPDF";
import styles from "./styles/Products.module.css";
import { Button } from "@/shared/components";

export const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { productos } = useProductos();

  // Hooks para exportación
  const { exportToExcel } = useExportData(productos);
  const { exportToPDF } = useExportDataPDF(productos);

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
    <main className="flex-1 overflow-auto p-3 sm:p-6">
      <div className={styles.headerContainer}>
        <div>
          <h1 className={styles.headerTitle}>Gestión de Productos</h1>
          <p className={styles.headerDescription}>
            Administra el catálogo de productos.
          </p>
        </div>
        <div className="flex-shrink-0">
          <NuevoProducto onProductoCreado={handleProductoCreado} />
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          {/* Botones de exportación responsivos */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
            <div className={`${styles.buttonsExport}`}>
              <Button
                className={`${styles.exportButton} bg-black hover:bg-green-700 text-white`}
                onClick={exportToExcel}
                size="sm">
                <Download className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Excel</span>
                <span className="sm:hidden">Excel</span>
              </Button>
              <Button
                className={`${styles.exportButton} bg-black hover:bg-red-700 text-white`}
                onClick={exportToPDF}
                size="sm">
                <FileText className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">PDF</span>
                <span className="sm:hidden">PDF</span>
              </Button>
            </div>
          </div>

          {/* Filtros responsivos */}

          <HeaderProcess
            nameSection={"Listado de Productos"}
            section={"productos"}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            statusOptions={["Activo", "Descontinuado", "Agotado", "En oferta"]}
          />
        </CardHeader>

        <CardContent className="sm:p-6">
          <ProductsTable
            refreshTrigger={refreshTrigger}
            currentPage={currentPage}
            itemsPerPage={5}
            productos={filteredProductos}
          />

          <div className="mt-4 sm:mt-6">
            <PaginationContent
              currentPage={currentPage}
              totalItems={filteredProductos.length}
              itemsPerPage={5}
              onPageChange={setCurrentPage}
              nameSection={"productos"}
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
