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
import { useExportData } from "../EXPORT/ExportDataExc";
import { useExportDataPDF } from "../EXPORT/ExportDataPDF";
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
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title={"Gestión de Productos"}
        info={"Administra el catálogo de productos"}
        newInfo={"Añadir Producto"}
        icon={ShoppingBag}
        actionComponent={
          <NuevoProducto onProductoCreado={handleProductoCreado} />
        }
      />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-end mb-4">
            <div className={`${styles.buttonsExport} space-x-2`}>
              <Button
                className={`${styles.exportButton} hover:bg-green-600 text-white`}
                onClick={exportToExcel}>
                <Download className="mr-1 h-4 w-4" /> Excel
              </Button>
              <Button
                className={`${styles.exportButton} hover:bg-red-600 text-white`}
                onClick={exportToPDF}>
                <FileText className="mr-1 h-4 w-4" /> PDF
              </Button>
            </div>
          </div>
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
        <CardContent>
          <ProductsTable
            refreshTrigger={refreshTrigger}
            currentPage={currentPage}
            itemsPerPage={5}
            productos={filteredProductos}
          />
          <PaginationContent
            currentPage={currentPage}
            totalItems={filteredProductos.length}
            itemsPerPage={5}
            onPageChange={setCurrentPage}
            nameSection={"productos"}
          />
        </CardContent>
      </Card>
    </main>
  );
};
