import axios from "../../axios";

// Obtiene todos los permisos
export const getPermisos = () => axios.get("permisos");

// Registra un nuevo permiso
export const registerPermisos = (permiso) => axios.post("permisos", permiso);
