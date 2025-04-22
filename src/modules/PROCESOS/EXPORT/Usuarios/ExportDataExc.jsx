import * as XLSX from "xlsx";
import { useCallback } from "react";

export const useExportDataExcelUsers = (data) => {
  // Función para exportar a Excel
  const exportToExcel = useCallback(() => {
    if (!data || data.length === 0) {
      console.error("No hay datos para exportar");
      return;
    }

    // Formatear datos para mostrar mejor en Excel
    const formattedData = data.map((user) => {
      // Manejar rol
      let rolText = "Sin rol";
      if (user.rol) {
        if (typeof user.rol === "object") {
          rolText = user.rol.nombre || "Sin nombre";
        } else {
          rolText = user.rol;
        }
      }

      // Formatear fecha en formato local
      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES");
      };

      // Preparar un objeto con los campos formateados
      return {
        Cédula: user.cedula || "Sin cédula",
        Nombre: user.nombre || "Sin nombre",
        Correo: user.correo || "Sin correo",
        Teléfono: user.telefono || "Sin teléfono",
        Dirección: user.direccion || "Sin dirección",
        Rol: rolText,
        Estado: user.estado || "Sin estado",
        "Fecha de registro": formatDate(user.createdAt),
        "Última actualización": formatDate(user.updatedAt),
        "ID Usuario": user.usuarioId || "Sin ID",
      };
    });

    // Crear una nueva hoja de cálculo
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Ajustar ancho de columnas
    const columnWidths = [
      { wch: 15 }, // Cédula
      { wch: 30 }, // Nombre
      { wch: 30 }, // Correo
      { wch: 15 }, // Teléfono
      { wch: 40 }, // Dirección
      { wch: 20 }, // Rol
      { wch: 15 }, // Estado
      { wch: 20 }, // Fecha de registro
      { wch: 20 }, // Última actualización
      { wch: 10 }, // ID Usuario
    ];

    worksheet["!cols"] = columnWidths;

    // Crear y guardar el archivo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

    // Guardar el archivo
    XLSX.writeFile(workbook, "usuarios_exportados.xlsx");
  }, [data]);

  return { exportToExcel };
};
