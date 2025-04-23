import axios from "../axios";

// Obtiene todos los proveedores
export const getProveedores = () => axios.get("proveedores");

export const getProveedorById = (proveedorId) => axios.get(`proveedores/${proveedorId}`);;


// Registra un nuevo proveedor
export const registerProveedor = (proveedor) =>
  axios.post("proveedores", proveedor);

// Actualiza un proveedor
export const updateProveedor = (proveedor) =>
  axios.put(`proveedores/${proveedor.proveedorId}`, proveedor);

//Edita el estado de un proveedor
export const editProveedorEstado = (provId, nuevoEstado) =>
  axios.patch(`proveedores/${provId}/estado`, { nuevoEstado });
