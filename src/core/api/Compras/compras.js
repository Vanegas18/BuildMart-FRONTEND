import axios from "../axios";

// Obtiene todas las compras
export const getCompras = () => axios.get("compras");

// Obtiene una compra específica por su ID
export const getCompraById = (compraId) => axios.get(`compras/${compraId}`);

// Registra una nueva compra
export const createCompra = (compras) => axios.post("compras", compras);

// Actualiza el estado de una compra (por ejemplo, cambiar de "Pendiente" a "Completada")
export const updateCompraStatus = async (compraId, nuevoEstado) => {
  try {
    // Usar PUT para actualizar el estado de la compra
    const response = await axios.put(`compras/${compraId}/estado`, { estado: nuevoEstado });
    return response.data; // Devolver la respuesta
  } catch (error) {
    console.error("Error al actualizar el estado de la compra:", error.response || error);
    throw error;  // Capturamos y lanzamos el error para manejarlo en el frontend
  }
};
