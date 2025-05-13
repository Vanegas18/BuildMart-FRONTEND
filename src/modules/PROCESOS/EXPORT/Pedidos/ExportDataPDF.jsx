import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useCallback } from "react";

export const useExportDataPDF = (pedidos) => {
  const exportToPDF = useCallback(() => {
    if (!pedidos || pedidos.length === 0) {
      console.error("No hay pedidos para exportar");
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Título del documento
    doc.setFontSize(18);
    doc.text("Listado de Pedidos", 14, 15);

    // Fecha de exportación
    doc.setFontSize(10);
    doc.text(`Exportado: ${new Date().toLocaleDateString("es-ES")}`, 14, 22);

    // Definir columnas
    const columns = [
      { header: "ID Pedido", dataKey: "pedidoId" },
      { header: "Cliente", dataKey: "cliente" },
      { header: "Fecha", dataKey: "fecha" },
      { header: "Estado", dataKey: "estado" },
      { header: "Total", dataKey: "total" },
    ];

    // Formatear filas
    const rows = pedidos.map((pedido) => ({
      pedidoId: pedido.pedidoId || "N/A",
      cliente: pedido.clienteId?.nombre || "Sin cliente",
      fecha: new Date(pedido.fecha).toLocaleDateString("es-ES"),
      estado: pedido.estado || "Pendiente",
      total: `$${pedido.total?.toLocaleString("es-CO") || "0"}`,
    }));

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
        pedidoId: { cellWidth: 25 },
        cliente: { cellWidth: 45 },
        fecha: { cellWidth: 30 },
        estado: { halign: "center", cellWidth: 25 },
        total: { halign: "right", cellWidth: 30 },
      },
    });

    // Guardar el PDF
    doc.save("pedidos_exportados.pdf");
  }, [pedidos]);

  return { exportToPDF };
};
