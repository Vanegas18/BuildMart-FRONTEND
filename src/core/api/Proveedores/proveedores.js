import axios from "../axios";

// Obtiene todos los proveedores
export const getProveedores = () => axios.get("proveedores");

// Registra un nuevo proveedor
export const registerProveedor = (proveedor) => 
    axios.post("proveedores", proveedor);

// Actualiza un proveedor
export const updateProveedor = (proveedor) => 
    axios.put(`proveedores/${proveedor.proveedorId}`, proveedor);

//Edita el estado de un proveedor
export const editProveedorEstado = (provId, nuevoEstado

) => {
    try {
        const response = axios.patch(`proveedores/${provId}/estado`, { nuevoEstado });
        return response.data;
    } catch (error) {
        throw error;
    }
};
