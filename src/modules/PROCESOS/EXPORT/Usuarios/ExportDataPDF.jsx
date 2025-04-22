import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useCallback } from "react";

export const useExportDataPDFUsers = (data) => {
  // Función para exportar a PDF
  const exportToPDF = useCallback(() => {
    if (!data || data.length === 0) {
      console.error("No hay datos para exportar");
      return;
    }

    // Crear documento en formato paisaje para más espacio
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Definir las columnas relevantes que queremos mostrar
    const columns = [
      { header: "Cédula", dataKey: "cedula" },
      { header: "Nombre", dataKey: "nombre" },
      { header: "Correo", dataKey: "correo" },
      { header: "Teléfono", dataKey: "telefono" },
      { header: "Dirección", dataKey: "direccion" },
      { header: "Rol", dataKey: "rol" },
      { header: "Estado", dataKey: "estado" },
      { header: "Registro", dataKey: "createdAt" },
    ];

    // Formatear fecha en formato local
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES");
    };

    // Preparar los datos para la tabla
    const rows = data.map((user) => {
      // Manejar rol
      let rolText = "Sin rol";
      if (user.rol) {
        if (typeof user.rol === "object") {
          rolText = user.rol.nombre || "Sin nombre";
        } else {
          rolText = user.rol;
        }
      }

      return {
        cedula: user.cedula || "Sin cédula",
        nombre: user.nombre || "Sin nombre",
        correo: user.correo || "Sin correo",
        telefono: user.telefono || "Sin teléfono",
        direccion: user.direccion || "Sin dirección",
        rol: rolText,
        estado: user.estado || "Sin estado",
        createdAt: formatDate(user.createdAt),
      };
    });

    // Añadir título al PDF
    doc.setFontSize(18);
    doc.text("Listado de Usuarios", 14, 15);

    // Añadir fecha de exportación
    doc.setFontSize(10);
    doc.text(`Exportado: ${new Date().toLocaleDateString("es-ES")}`, 14, 22);

    // Usar autoTable como una función independiente
    autoTable(doc, {
      columns: columns.map((col) => ({
        header: col.header,
        dataKey: col.dataKey,
      })),
      body: rows,
      startY: 25,
      margin: { top: 25 },
      styles: {
        fontSize: 8,
        cellPadding: 3,
        overflow: "linebreak",
        cellWidth: "wrap",
        halign: "left",
        valign: "middle",
      },
      headStyles: {
        fillColor: [44, 62, 80], // Color oscuro para el encabezado
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240], // Filas alternadas con color claro
      },
      columnStyles: {
        cedula: { cellWidth: 25 },
        nombre: { cellWidth: 40 },
        correo: { cellWidth: 45 },
        telefono: { cellWidth: 25 },
        direccion: { cellWidth: "auto" }, // Ajuste automático para dirección
        rol: { cellWidth: 25 },
        estado: { halign: "center", cellWidth: 20 },
        createdAt: { cellWidth: 25 },
      },
      didDrawCell: (data) => {
        // Ajustar altura de celda según el contenido
        if (data.section === "body" && data.column.dataKey === "direccion") {
          const cell = data.cell;
          const textHeight = doc.getTextDimensions(cell.text).h;
          const cellHeight = cell.height;

          if (textHeight > cellHeight) {
            doc.setFontSize(7); // Reduce el tamaño de la fuente para direcciones largas
          }
        }
      },
    });

    // Guardar el archivo
    doc.save("usuarios_exportados.pdf");
  }, [data]);

  return { exportToPDF };
};
