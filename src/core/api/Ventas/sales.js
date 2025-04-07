import axios from "../axios"; 

// Obtiene todas las ventas
export const getSales = () => axios.get("ventas");

// Obtiene una venta específica por su ID
export const getSaleById = (ventaId) => axios.get(`ventas/${ventaId}`);

// Registra una nueva venta
export const createSale = (ventas) => axios.post("ventas", ventas);

// Actualiza el estado de una venta (por ejemplo, cambiar de "Pendiente" a "Completada")
export const updateSaleStatus = async (ventaId, nuevoEstado) => {
  try {
    // Usar PUT para actualizar el estado de la venta
    const response = await axios.put(`ventas/${ventaId}`, { estado: nuevoEstado });
    return response.data; // Devolver la respuesta
  } catch (error) {
    console.error("Error al actualizar el estado de la venta:", error.response || error);
    throw error;  // Capturamos y lanzamos el error para manejarlo en el frontend
  }
};
