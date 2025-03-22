import axios from "../axios";

// Obtiene todos los productos
export const getProducts = () => axios.get("productos");

// Registra un nuevo producto
export const registerProduct = (producto) => axios.post("productos", producto);
