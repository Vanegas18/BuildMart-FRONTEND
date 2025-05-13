import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useCallback } from "react";

export const useExportDataPDF = (clientes) => {
  const exportToPDF = useCallback(() => {
    if (!clientes || clientes.length === 0) {
      console.error("No hay clientes para exportar");
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Título del documento
    doc.setFontSize(18);
    doc.text("Listado de Clientes", 14, 15);

    // Fecha de exportación
    doc.setFontSize(10);
    doc.text(`Exportado: ${new Date().toLocaleDateString("es-ES")}`, 14, 22);

    // Definir columnas
    const columns = [
      { header: "Cédula", dataKey: "cedula" },
      { header: "Nombre", dataKey: "nombre" },
      { header: "Correo", dataKey: "correo" },
      { header: "Teléfono", dataKey: "telefono" },
      { header: "Dirección Principal", dataKey: "direccion" },
      { header: "Método de Pago", dataKey: "metodoPago" },
      { header: "Estado", dataKey: "estado" },
    ];

    // Formatear cada cliente
    const rows = clientes.map((client) => {
      // Dirección principal
      let direccion = "No disponible";
      if (client.direcciones && client.direcciones.length > 0) {
        const principal = client.direcciones.find((d) => d.esPrincipal) || client.direcciones[0];
        direccion = `${principal.calle || ""}, ${principal.ciudad || ""}, ${principal.departamento || ""}`;
      }

      // Método de pago principal
      let metodoPago = "No disponible";
      if (client.metodosPago && client.metodosPago.length > 0) {
        const principal = client.metodosPago.find((m) => m.esPrincipal) || client.metodosPago[0];
        metodoPago = principal.tipo || "Sin tipo";
      }

      return {
        cedula: client.cedula || "N/A",
        nombre: client.nombre || "N/A",
        correo: client.correo || "N/A",
        telefono: client.telefono || "N/A",
        direccion,
        metodoPago,
        estado: client.estado || "N/A",
      };
    });

    // Generar tabla
    autoTable(doc, {
      columns,
      body: rows,
      startY: 25,
      styles: {
        fontSize: 8,
        cellPadding: 3,
        overflow: "linebreak",
        cellWidth: "wrap",
        halign: "left",
        valign: "middle",
      },
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        cedula: { cellWidth: 25 },
        nombre: { cellWidth: 35 },
        correo: { cellWidth: 45 },
        telefono: { cellWidth: 25 },
        direccion: { cellWidth: 60 },
        metodoPago: { cellWidth: 30 },
        estado: { halign: "center", cellWidth: 20 },
      },
    });

    // Guardar el PDF
    doc.save("clientes_exportados.pdf");
  }, [clientes]);

  return { exportToPDF };
};
