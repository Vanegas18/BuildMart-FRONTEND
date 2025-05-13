import * as XLSX from "xlsx";

export const useExportDataExc = (ventas) => {
  const exportToExcel = () => {
    if (!ventas || ventas.length === 0) {
      console.error("No hay ventas para exportar");
      return;
    }

    const formattedData = ventas.map((venta) => {
      return {
        "ID Venta": venta.ventaId || "N/A",
        Cliente: venta.clienteId?.nombre || "Desconocido",
        Fecha: new Date(venta.fecha).toLocaleDateString("es-ES"),
        Total: Number(venta.total) || 0,
        Estado: venta.estado || "N/A",
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    const columnWidths = [
      { wch: 12 }, // ID Venta
      { wch: 30 }, // Cliente
      { wch: 15 }, // Fecha
      { wch: 15 }, // Total
      { wch: 15 }, // Estado
    ];

    worksheet["!cols"] = columnWidths;

    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let C = 3; C <= 3; ++C) {
      // Columna Total (D)
      for (let R = range.s.r + 1; R <= range.e.r; ++R) {
        const cellAddr = XLSX.utils.encode_cell({ c: C, r: R });
        if (!worksheet[cellAddr]) continue;
        worksheet[cellAddr].z = '"$"#,##0.00';
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ventas");

    XLSX.writeFile(workbook, "ventas_exportadas.xlsx");
  };

  return { exportToExcel };
};
