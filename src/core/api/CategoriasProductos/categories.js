import axios from "../axios";

// Obtiene todas las categorías de productos
export const getCategories = () => axios.get("categoriasProductos");
