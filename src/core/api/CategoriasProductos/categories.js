import axios from "../axios";

// Obtiene todas las categorías de productos
export const getCategories = () => axios.get("categoriasProductos");

// Crea una nueva categoría
export const registerCategory = (categoria) =>
  axios.post("categoriasProductos", categoria);
