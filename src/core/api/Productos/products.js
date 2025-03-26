import axios from "../axios";

// Obtiene todos los productos
export const getProducts = () => axios.get("productos");

// Registra un nuevo producto
export const registerProduct = (producto) => axios.post("productos", producto);

// Editar un producto
export const editProducto = (producto) =>
  axios.put(`productos/${producto.productoId}`, producto);

// Cambiar estado de un producto
export const changeProductState = (productoId, nuevoEstado) =>
  axios.patch(`productos/${productoId}/estado`, { estado: nuevoEstado });
