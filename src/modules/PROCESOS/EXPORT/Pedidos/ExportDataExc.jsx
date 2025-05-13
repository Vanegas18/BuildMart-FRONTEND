import * as XLSX from "xlsx";

export const useExportDataExc = (pedidos) => {
  const exportToExcel = () => {
    if (!pedidos || pedidos.length === 0) {
      console.error("No hay pedidos para exportar");
      return;
    }

    const formattedData = pedidos.map((pedido) => {
      // Cliente asociado al pedido
      const clienteNombre = pedido.clienteId?.nombre || "Sin nombre";

      // Fecha en formato legible
      const fecha = new Date(pedido.fecha).toLocaleDateString();

      // Total formateado con separador de miles
      const total = `$${Number(pedido.total).toLocaleString("es-CO")}`;

      // Estado legible
      const estado =
        pedido.estado === "pagado"
          ? "Pagado"
          : pedido.estado === "pendiente"
          ? "Pendiente"
          : "Cancelado";

      return {
        "ID Pedido": pedido.pedidoId || pedido._id,
        Cliente: clienteNombre,
        Fecha: fecha,
        Total: total,
        Estado: estado,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Ancho de columnas
    worksheet["!cols"] = [
      { wch: 15 }, // ID Pedido
      { wch: 25 }, // Cliente
      { wch: 15 }, // Fecha
      { wch: 15 }, // Total
      { wch: 15 }, // Estado
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pedidos");

    XLSX.writeFile(workbook, "pedidos_exportados.xlsx");
  };

  return { exportToExcel };
};
