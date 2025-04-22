import * as XLSX from "xlsx";

export const useExportData = (data) => {
  const exportToExcel = () => {
    if (!data || data.length === 0) {
      console.error("No hay datos para exportar");
      return;
    }

    // Formatear datos para mostrar mejor en Excel
    const formattedData = data.map((item) => {
      // Manejar categorías
      let categorias = item.categorias || item.categoriaId;
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

      // Preparar un objeto con los campos formateados
      return {
        Nombre: item.nombre,
        Descripción: item.descripcion || "Sin descripción",
        Categoría: categoriasText,
        "Precio Venta": Number(item.precio), // Mantener como número para Excel
        "Precio Compra": Number(item.precioCompra),
        Stock: item.stock,
        Estado: item.estado,
      };
    });

    // Crear una nueva hoja de cálculo
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Ajustar ancho de columnas
    const columnWidths = [
      { wch: 30 }, // Nombre
      { wch: 50 }, // Descripción
      { wch: 20 }, // Categoría
      { wch: 15 }, // Precio Venta
      { wch: 15 }, // Precio Compra
      { wch: 10 }, // Stock
      { wch: 15 }, // Estado
    ];

    worksheet["!cols"] = columnWidths;

    // Aplicar formato de número para precios
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let C = 3; C <= 4; ++C) {
      // Columnas de precios (D y E)
      for (let R = range.s.r + 1; R <= range.e.r; ++R) {
        const cellAddr = XLSX.utils.encode_cell({ c: C, r: R });
        if (!worksheet[cellAddr]) continue;
        worksheet[cellAddr].z = '"$"#,##0.00';
      }
    }

    // Crear y guardar el archivo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

    // Guardar el archivo
    XLSX.writeFile(workbook, "productos_exportados.xlsx");
  };

  return { exportToExcel };
};
