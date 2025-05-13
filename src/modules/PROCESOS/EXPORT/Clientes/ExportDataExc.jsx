import * as XLSX from "xlsx";

export const useExportDataExc = (clientes) => {
  const exportToExcel = () => {
    if (!clientes || clientes.length === 0) {
      console.error("No hay clientes para exportar");
      return;
    }

    const formattedData = clientes.map((client) => {
      // Dirección principal
      let direccionPrincipal = "No disponible";
      if (client.direcciones?.length) {
        const principal =
          client.direcciones.find((dir) => dir.esPrincipal) ||
          client.direcciones[0];
        direccionPrincipal = `${principal.calle || ""}, ${principal.ciudad || ""}, ${principal.departamento || ""}`;
      }

      // Método de pago principal
      let metodoPagoPrincipal = "No disponible";
      if (client.metodosPago?.length) {
        const principal =
          client.metodosPago.find((mp) => mp.esPrincipal) ||
          client.metodosPago[0];
        metodoPagoPrincipal = principal.tipo || "Sin tipo";
      }

      return {
        Cédula: client.cedula,
        Nombre: client.nombre,
        Correo: client.correo,
        Teléfono: client.telefono,
        "Dirección Principal": direccionPrincipal,
        "Método de Pago": metodoPagoPrincipal,
        Estado: client.estado,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Ancho de columnas
    worksheet["!cols"] = [
      { wch: 15 }, // Cédula
      { wch: 20 }, // Nombre
      { wch: 30 }, // Correo
      { wch: 15 }, // Teléfono
      { wch: 40 }, // Dirección Principal
      { wch: 20 }, // Método de Pago
      { wch: 15 }, // Estado
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes");

    XLSX.writeFile(workbook, "clientes_exportados.xlsx");
  };

  return { exportToExcel };
};
