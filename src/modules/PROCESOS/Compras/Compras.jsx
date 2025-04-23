import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HeaderContent,
  HeaderProcess,
  PaginationContent,
} from "../../Dashboard/Layout";
import { ComprasTable } from ".";
import { useCompras } from "@/core/context/Compras/ComprasContext";
import { NuevaCompra } from "./NuevaCompra";
import { getProveedorById } from "@/core/api/Proveedores/proveedores";
import { useExportDataPDF } from "../EXPORT/Compras/ExportDataPDF";
import styles from "../Productos/styles/Products.module.css";
import { Button } from "@/shared/components/ui/button";
import { FileText, Download } from "lucide-react";
import { useExportData } from "../EXPORT/Compras/ExportDataExc";

export const Compras = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const [selectedStatus, setSelectedStatus] = useState(""); // Estado para el filtro de estado
  const { compras } = useCompras();
  const [proveedores, setProveedores] = useState({}); // Para almacenar los proveedores ya consultados

  //Métodos de exportación
  const { exportToPDF } = useExportDataPDF(compras, proveedores);
  const { exportToExcel } = useExportData(compras, proveedores);

  // Obtener información de proveedores para la búsqueda por nombre
  useEffect(() => {
    const fetchProveedores = async () => {
      const proveedoresCache = {};

      for (const compra of compras) {
        if (
          compra &&
          compra.proveedor &&
          typeof compra.proveedor === "string"
        ) {
          // Si ya tenemos este proveedor en caché, no lo consultamos nuevamente
          if (!proveedoresCache[compra.proveedor]) {
            try {
              const response = await getProveedorById(compra.proveedor);
              if (response && response.data) {
                proveedoresCache[compra.proveedor] = response.data;
              }
            } catch (error) {
              console.error(
                `Error al obtener proveedor ${compra.proveedor}:`,
                error
              );
            }
          }
        }
      }

      setProveedores(proveedoresCache);
    };

    fetchProveedores();
  }, [compras, refreshTrigger]);

  // Filtrado de compras
  const filteredCompras = useMemo(() => {
    return compras.filter((compra) => {
      if (!compra) {
        return false;
      }

      // Obtener el proveedor del caché si existe
      const proveedorObj =
        compra.proveedor && typeof compra.proveedor === "string"
          ? proveedores[compra.proveedor]
          : typeof compra.proveedor === "object"
          ? compra.proveedor
          : null;

      // Filtrar por búsqueda (nombre del proveedor)
      const proveedorPorNombre =
        searchTerm && proveedorObj && proveedorObj.nombre
          ? proveedorObj.nombre.toLowerCase().includes(searchTerm.toLowerCase())
          : !searchTerm; // Si no hay término de búsqueda, incluir todas

      // Filtrar por estado seleccionado
      // Normalizar los estados para comparar (por si hay discrepancias entre "Completada" y "Completado")
      const estadoCompra = compra.estado ? compra.estado.toLowerCase() : "";
      const estadoSeleccionado = selectedStatus
        ? selectedStatus.toLowerCase()
        : "";

      // Si hay un estado seleccionado, filtrar por él, de lo contrario incluir todas
      const filtradoEstado = estadoSeleccionado
        ? estadoCompra.includes(estadoSeleccionado) ||
          estadoSeleccionado.includes(estadoCompra)
        : true;

      return proveedorPorNombre && filtradoEstado;
    });
  }, [compras, searchTerm, selectedStatus, proveedores]);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  // Función para actualizar la lista de compras
  const handleCompraCreada = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1); // Incrementamos el trigger para refrescar
    setCurrentPage(1); // Volver a la primera página después de crear una compra
  }, []);

  // Función para manejar cambios de estado cuando se actualiza una compra
  const handleEstadoCambiado = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1); // Refrescar datos
  }, []);

  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title="Gestión de Compras"
        info="Administra las compras realizadas"
        newInfo="Añadir Compra"
        icon={ShoppingBag}
        actionComponent={<NuevaCompra onCompraCreada={handleCompraCreada} />}
      />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-end mb-4">
            <div className={`${styles.buttonsExport} space-x-2`}>
              <Button
                className={`${styles.exportButtonXsl} hover:bg-green-600 text-white`}
                onClick={exportToExcel}>
                <Download className="mr-1 h-4 w-4" /> Excel
              </Button>
              <Button
                className={`${styles.exportButtonPdf} hover:bg-red-600 text-white`}
                onClick={exportToPDF}>
                <FileText className="mr-1 h-4 w-4" /> PDF
              </Button>
            </div>
          </div>
          <HeaderProcess
            nameSection={"Listado de Compras"}
            section={"compras"}
            searchTerm={searchTerm}
            onSearchChange={(value) => {
              console.log("Cambiando término de búsqueda:", value);
              setSearchTerm(value);
            }}
            selectedStatus={selectedStatus}
            onStatusChange={(value) => {
              console.log("Cambiando estado seleccionado:", value);
              setSelectedStatus(value);
            }}
            statusOptions={[
              "Pendiente",
              "Procesando",
              "Completado",
              "Cancelado",
            ]}
          />
        </CardHeader>
        <CardContent>
          <ComprasTable
            refreshTrigger={refreshTrigger}
            currentPage={currentPage}
            itemsPerPage={5}
            compras={filteredCompras} // Pasamos las compras filtradas
            onEstadoCambiado={handleEstadoCambiado}
          />
          <PaginationContent
            currentPage={currentPage}
            totalItems={filteredCompras.length}
            itemsPerPage={5}
            onPageChange={setCurrentPage}
            nameSection="compras"
          />
        </CardContent>
      </Card>
    </main>
  );
};
