import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useCallback } from "react";

export const useExportDataPDF = (ventas) => {
  const exportToPDF = useCallback(() => {
    if (!ventas || ventas.length === 0) {
      console.error("No hay ventas para exportar");
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(18);
    doc.text("Listado de Ventas", 14, 15);

    doc.setFontSize(10);
    doc.text(`Exportado: ${new Date().toLocaleDateString("es-ES")}`, 14, 22);

    const columns = [
      { header: "ID Venta", dataKey: "ventaId" },
      { header: "Cliente", dataKey: "cliente" },
      { header: "Fecha", dataKey: "fecha" },
      { header: "Total", dataKey: "total" },
      { header: "Estado", dataKey: "estado" },
    ];

    const rows = ventas.map((venta) => ({
      ventaId: venta.ventaId || "N/A",
      cliente: venta.clienteId?.nombre || "Desconocido",
      fecha: new Date(venta.fecha).toLocaleDateString("es-ES"),
      total: `$${venta.total?.toLocaleString("es-CO") || "0"}`,
      estado: venta.estado || "N/A",
    }));

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
    });

    doc.save("ventas_exportadas.pdf");
  }, [ventas]);

  return { exportToPDF };
};
