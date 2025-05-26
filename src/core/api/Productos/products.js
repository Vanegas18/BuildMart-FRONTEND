import axios from "../axios";

// Obtiene todos los productos
export const getProducts = () => axios.get("productos");

// Registra un nuevo producto
export const registerProduct = (producto) => axios.post("productos", producto);

// Registra un nuevo producto con archivo de imagen
export const registerProductWithImage = (formData) => {
  return axios.post("productos", formData, {
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
  return axios.put(`productos/${producto.productoId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Cambiar estado de un producto
export const changeProductState = (productoId, payload) =>
  axios.patch(`productos/${productoId}/estado`, payload);

// Crear o actualizar oferta de un producto
export const crearOfertaProducto = (productoId, ofertaData) =>
  axios.post(`productos/ofertas/${productoId}`, { oferta: ofertaData });

// Desactivar oferta de un producto
export const desactivarOfertaProducto = (productoId) =>
  axios.patch(`productos/ofertas/${productoId}/desactivar`);
