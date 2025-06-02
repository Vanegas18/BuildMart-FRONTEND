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
  const { compras, obtenerCompras } = useCompras();
  const [proveedores, setProveedores] = useState({});
  const [proveedoresCargados, setProveedoresCargados] = useState(false);

  //Métodos de exportación
  const { exportToPDF } = useExportDataPDF(compras);
  const { exportToExcel } = useExportData(compras);

  // Cargar compras iniciales y cuando cambia refreshTrigger
  useEffect(() => {
    obtenerCompras();
  }, [obtenerCompras, refreshTrigger]);

  // Los proveedores ya vienen poblados desde el backend, no necesitamos cargarlos
  useEffect(() => {
    // Verificar si los proveedores ya están poblados
    if (compras.length > 0 && compras[0]?.proveedor) {
      const primerProveedor = compras[0].proveedor;

      // Si el proveedor es un objeto (poblado), no necesitamos hacer llamadas a la API
      if (
        typeof primerProveedor === "object" &&
        primerProveedor !== null &&
        primerProveedor.nombre
      ) {
        setProveedoresCargados(true);
        return;
      }
    }

    setProveedoresCargados(true);
  }, [compras]);

  // Filtrado de compras - LÓGICA CORREGIDA
  const filteredCompras = useMemo(() => {
    return compras.filter((compra) => {
      if (!compra) return false;

      // Filtrar por término de búsqueda (ID o nombre del proveedor)
      let coincideBusqueda = true;
      if (searchTerm) {
        const termino = searchTerm.toLowerCase().trim();

        // Determinar si es un número (para búsqueda exacta por ID)
        const esNumero = /^\d+$/.test(termino);

        // CORRECCIÓN: Buscar por ID de compra (compraId) - coincidencia exacta si es número
        const coincideId =
          compra.compraId !== undefined &&
          compra.compraId !== null &&
          (esNumero
            ? compra.compraId.toString() === termino
            : compra.compraId.toString().toLowerCase().includes(termino));

        // Buscar por ID de MongoDB (_id) - siempre parcial
        const coincideMongoId =
          compra._id && compra._id.toString().toLowerCase().includes(termino);

        // CORRECCIÓN: Buscar por nombre del proveedor - manejar tanto objetos poblados como IDs
        let coincideNombreProveedor = false;
        let coincideIdProveedor = false;

        if (compra.proveedor) {
          // Si el proveedor es un objeto poblado (tiene propiedades como nombre)
          if (
            typeof compra.proveedor === "object" &&
            compra.proveedor !== null
          ) {
            if (compra.proveedor.nombre) {
              coincideNombreProveedor = compra.proveedor.nombre
                .toLowerCase()
                .includes(termino);
            }
            // Buscar también por ID si el objeto tiene _id
            if (compra.proveedor._id) {
              coincideIdProveedor = compra.proveedor._id
                .toString()
                .toLowerCase()
                .includes(termino);
            }
          }
          // Si solo tenemos el ID del proveedor (no poblado)
          else {
            coincideIdProveedor = compra.proveedor
              .toString()
              .toLowerCase()
              .includes(termino);

            // Buscar en el cache de proveedores si existe
            const proveedorIdStr = compra.proveedor.toString();
            const proveedorObj = proveedores[proveedorIdStr];
            if (proveedorObj && proveedorObj.nombre) {
              coincideNombreProveedor = proveedorObj.nombre
                .toLowerCase()
                .includes(termino);
            }
          }
        }

        // La búsqueda coincide si encuentra el término en cualquiera de estos campos
        coincideBusqueda =
          coincideId ||
          coincideMongoId ||
          coincideNombreProveedor ||
          coincideIdProveedor;
      }

      // Filtrar por estado
      let coincideEstado = true;
      if (selectedStatus) {
        coincideEstado = compra.estado === selectedStatus;
      }

      // Retornar true solo si coincide con todos los filtros activos
      return coincideBusqueda && coincideEstado;
    });
  }, [compras, searchTerm, selectedStatus, proveedores, proveedoresCargados]);

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
        info="Administra las compras realizadas."
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
        </CardContent>
      </Card>
    </main>
  );
};
