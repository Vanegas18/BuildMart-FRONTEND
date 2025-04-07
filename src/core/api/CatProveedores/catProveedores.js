import axios from "../axios";

// Obtiene todas las categorías
export const getCatProveedores = () => axios.get("categoriasProveedores");

// Registra una nueva categoría
export const registerCatProveedores = (catProveedor) =>
  axios.post("categoriasProveedores", catProveedor);

// Actualiza una categoría
export const updateCatProveedores = (catProveedor) =>
  axios.put(`categoriasProveedores/${catProveedor.categoriaProveedorId}`, catProveedor);

// Edita el estado de una categoría
export const editCatProveedorEstado = (categoriaId, nuevoEstado

) => {
  try {
    const response = axios.patch(`categoriasProveedores/${categoriaId}/estado`, { nuevoEstado });
    return response.data;
  } catch (error) {
    throw error;
  }
};