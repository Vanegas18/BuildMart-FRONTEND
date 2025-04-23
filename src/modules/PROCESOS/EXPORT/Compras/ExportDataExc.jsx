import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { getProveedorById } from "@/core/api/Proveedores/proveedores"; // Ajusta esta importación según tu estructura

export const useExportData = (data) => {
  const [proveedoresData, setProveedoresData] = useState({});
  const [loading, setLoading] = useState(false);

  // Cargar los datos de los proveedores necesarios para la exportación
  useEffect(() => {
    const loadProveedoresData = async () => {
      if (!data || data.length === 0) return;

      setLoading(true);
      const proveedoresTemp = {};

      // Extraer todos los IDs de proveedores únicos
      const uniqueProveedorIds = [...new Set(
        data
          .filter((c) => c && c.proveedor)
          .map((c) => (typeof c.proveedor === "string" ? c.proveedor : null))
          .filter(Boolean)
      )];

      console.log("Cargando datos para estos proveedores:", uniqueProveedorIds);

      // Cargar datos para cada proveedor
      for (const proveedorId of uniqueProveedorIds) {
        try {
          const response = await getProveedorById(proveedorId);
          if (response && response.data) {
            proveedoresTemp[proveedorId] = response.data;
            console.log(`Datos cargados para proveedor ${proveedorId}:`, response.data);
          }
        } catch (error) {
          console.error(`Error al cargar proveedor ${proveedorId}:`, error);
        }
      }

      setProveedoresData(proveedoresTemp);
      setLoading(false);
    };

    loadProveedoresData();
  }, [data]);

  // Función para obtener el nombre del proveedor
  const getNombreProveedor = (compra) => {
    if (!compra || !compra.proveedor) return "Sin proveedor";

    // Si es un objeto directo con nombre
    if (typeof compra.proveedor === "object" && compra.proveedor !== null) {
      if (compra.proveedor.nombre) return compra.proveedor.nombre;
      if (compra.proveedor.razonSocial) return compra.proveedor.razonSocial;
    }

    // Si es un ID de proveedor y tenemos los datos cargados
    if (typeof compra.proveedor === "string" && proveedoresData[compra.proveedor]) {
      const proveedor = proveedoresData[compra.proveedor];
      if (proveedor.nombre) return proveedor.nombre;
      if (proveedor.razonSocial) return proveedor.razonSocial;

      // Intenta encontrar cualquier propiedad que pueda ser un nombre
      const possibleNameProps = ["nombreProveedor", "name", "nombreEmpresa", "razon_social"];
      for (const prop of possibleNameProps) {
        if (proveedor[prop]) return proveedor[prop];
      }

      // Si no encontramos ninguna propiedad de nombre, usamos cualquier propiedad que no sea ID
      const nonIdProps = Object.keys(proveedor).filter((k) => !k.toLowerCase().includes("id"));
      if (nonIdProps.length > 0) {
        return proveedor[nonIdProps[0]];
      }
    }

    return "Sin proveedor";
  };

  const exportToExcel = () => {
    if (!data || data.length === 0) {
      console.error("No hay datos para exportar");
      return;
    }

    if (loading) {
      alert("Cargando datos de proveedores. Por favor, espere un momento.");
      return;
    }

    // Formatear datos para mostrar mejor en Excel
    const formattedData = data.map((compra) => {
      return {
        "ID Compra": compra.compraId || "Sin ID",
        Proveedor: getNombreProveedor(compra),
        Fecha: compra.fecha
          ? new Date(compra.fecha).toLocaleDateString("es-ES")
          : "Sin fecha",
        Estado: compra.estado || "Sin estado",
        Total: compra.total || 0, // Mantener como número para Excel
      };
    });

    // Crear una nueva hoja de cálculo
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Ajustar ancho de columnas
    const columnWidths = [
      { wch: 15 }, // ID Compra
      { wch: 30 }, // Proveedor
      { wch: 15 }, // Fecha
      { wch: 15 }, // Estado
      { wch: 15 }, // Total
    ];

    worksheet["!cols"] = columnWidths;

    // Crear y guardar el archivo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Compras");

    // Guardar el archivo
    XLSX.writeFile(workbook, "compras_exportadas.xlsx");
  };

  return { exportToExcel, loading };
};