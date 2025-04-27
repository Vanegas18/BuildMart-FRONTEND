// Componente principal - Compras.jsx
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { compras } = useCompras();
  const [proveedores, setProveedores] = useState({});
  const [proveedoresCargados, setProveedoresCargados] = useState(false);

  //Métodos de exportación
  const { exportToPDF } = useExportDataPDF(compras);
  const { exportToExcel } = useExportData(compras);

  // Obtener información de proveedores para la búsqueda por nombre
  useEffect(() => {
    const fetchProveedores = async () => {
      const proveedoresCache = { ...proveedores };
      let seActualizaronProveedores = false;

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
                seActualizaronProveedores = true;
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

      if (seActualizaronProveedores) {
        setProveedores(proveedoresCache);
      }
      setProveedoresCargados(true);
    };

    fetchProveedores();
  }, [compras, refreshTrigger]);

  // Filtrado de compras - AQUÍ ESTÁ EL CAMBIO PRINCIPAL
  const filteredCompras = useMemo(() => {
    if (!proveedoresCargados && searchTerm) {
      return [];
    }

    return compras.filter((compra) => {
      if (!compra) return false;

      // Filtrar por nombre del proveedor (si hay término de búsqueda)
      let coincideNombreProveedor = true;
      if (searchTerm) {
        const proveedorObj =
          compra.proveedor && typeof compra.proveedor === "string"
            ? proveedores[compra.proveedor]
            : null;

        const nombreProveedor = proveedorObj?.nombre || "";
        coincideNombreProveedor = nombreProveedor
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }

      // Filtrar por estado (si hay estado seleccionado)
      let coincideEstado = true;
      if (selectedStatus) {
        coincideEstado = compra.estado === selectedStatus;
      }

      // IMPORTANTE: Aplicar los filtros por separado o juntos según lo que esté activado
      const debeMostrar =
        ((searchTerm && coincideNombreProveedor) || !searchTerm) &&
        ((selectedStatus && coincideEstado) || !selectedStatus);

      return debeMostrar;
    });
  }, [compras, searchTerm, selectedStatus, proveedores, proveedoresCargados]);

  useEffect(() => {}, [filteredCompras]);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  // Función para actualizar la lista de compras
  const handleCompraCreada = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
    setCurrentPage(1);
  }, []);

  // Función para manejar cambios de estado cuando se actualiza una compra
  const handleEstadoCambiado = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
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
            onSearchChange={setSearchTerm}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            statusOptions={[
              "Pendiente",
              "Procesando",
              "Completado",
              "Cancelado",
            ]}
          />
        </CardHeader>
        <CardContent>
          {!proveedoresCargados && searchTerm ? (
            <div className="text-center py-4">Cargando proveedores...</div>
          ) : (
            <>
              <ComprasTable
                refreshTrigger={refreshTrigger}
                currentPage={currentPage}
                itemsPerPage={5}
                compras={filteredCompras}
                onEstadoCambiado={handleEstadoCambiado}
              />
              <PaginationContent
                currentPage={currentPage}
                totalItems={filteredCompras.length}
                itemsPerPage={5}
                onPageChange={setCurrentPage}
                nameSection="compras"
              />
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
};
