import axios from "../axios";

// Obtiene todas las categorías de productos
export const getCategories = () => axios.get("categoriasProductos");

// Crea una nueva categoría
export const registerCategory = (categoria) =>
  axios.post("categoriasProductos", categoria);

// Editar categoría
export const editCategory = (categoria) =>
  axios.put(`categoriasProductos/${categoria.categoriaId}`, categoria);

// Cambiar estado de una categoría
export const changeCategoryState = async (categoriaId, nuevoEstado) => {
  try {
    const response = await axios.patch(
      `categoriasProductos/${categoriaId}/estado`,
      {
        estado: nuevoEstado,
      }
    );
    return response.data;
  } catch (error) {
    // Propaga el error con toda la información
    throw error;
  }
};
