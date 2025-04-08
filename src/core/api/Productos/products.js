import axios from "../axios";

// Obtiene todos los productos
export const getProducts = () => axios.get("productos");

// Registra un nuevo producto
export const registerProduct = (producto) => axios.post("productos", producto);

// Registra un nuevo producto con archivo de imagen
export const registerProductWithImage = (formData) => {
  return axios.post("productos/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Editar un producto
export const editProducto = (producto) =>
  axios.put(`productos/${producto.productoId}`, producto);

// Editar un producto con archivo de imagen
export const editProductoWithImage = (producto, formData) => {
  return axios.put(`productos/upload/${producto.productoId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Cambiar estado de un producto
export const changeProductState = (productoId, payload) =>
  axios.patch(`productos/${productoId}/estado`, payload);
