import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useCallback } from "react";

export const useExportDataPDF = (data) => {
  // Función para formatear el precio
  const formatearPrecio = (precio) => {
    return Number(precio).toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

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
      { header: "Producto", dataKey: "nombre" },
      { header: "Descripción", dataKey: "descripcion" },
      { header: "Categoría", dataKey: "categorias" },
      { header: "P. Venta", dataKey: "precio" },
      { header: "P. Compra", dataKey: "precioCompra" },
      { header: "Stock", dataKey: "stock" },
      { header: "Estado", dataKey: "estado" },
    ];

    // Preparar los datos para la tabla
    const rows = data.map((product) => {
      // Manejar categorías (igual que en ProductTableRow)
      let categorias = product.categorias || product.categoriaId;
      let categoriasText = "Sin categoría";

      if (categorias) {
        if (Array.isArray(categorias)) {
          categoriasText = categorias
            .map((cat) =>
              typeof cat === "object" ? cat.nombre || "Sin nombre" : cat
            )
            .join(", ");
        } else if (typeof categorias === "object") {
          categoriasText = categorias.nombre || "Sin nombre";
        } else {
          categoriasText = categorias;
        }
      }

      return {
        nombre: product.nombre,
        // Mostrar descripción completa
        descripcion: product.descripcion || "Sin descripción",
        categorias: categoriasText,
        precio: `$${formatearPrecio(product.precio)}`,
        precioCompra: `$${formatearPrecio(product.precioCompra)}`,
        stock: product.stock,
        estado: product.estado,
      };
    });

    // Añadir título al PDF
    doc.setFontSize(18);
    doc.text("Listado de Productos", 14, 15);

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
        nombre: { cellWidth: 40 },
        descripcion: { cellWidth: "auto" }, // Ajuste automático para descripción
        precio: { halign: "right", cellWidth: 25 },
        precioCompra: { halign: "right", cellWidth: 25 },
        stock: { halign: "center", cellWidth: 15 },
        estado: { halign: "center", cellWidth: 25 },
      },
      didDrawCell: (data) => {
        // Ajustar altura de celda según el contenido
        if (data.section === "body" && data.column.dataKey === "descripcion") {
          const cell = data.cell;
          const textHeight = doc.getTextDimensions(cell.text).h;
          const cellHeight = cell.height;

          if (textHeight > cellHeight) {
            doc.setFontSize(7); // Reduce el tamaño de la fuente para descripciones largas
          }
        }
      },
    });

    // Guardar el archivo
    doc.save("productos_exportados.pdf");
  }, [data]);

  return { exportToPDF };
};
