import axios from "../../axios";

// Obtiene todos los permisos
export const getPermisos = () => axios.get("permisos");

// Registra un nuevo permiso
export const newPermiso = (permiso) => axios.post("permisos", permiso);

// Editar un permiso
export const editPermiso = (permiso) => {
  // Usamos nombreOriginal para la URL si está disponible, si no, usamos nombre
  const urlId = permiso.nombreOriginal || permiso.nombreGrupo;

  // Enviamos los datos actualizados (sin incluir nombreOriginal en el cuerpo)
  const { nombreOriginal, ...datosActualizados } = permiso;

  return axios.put(`permisos/${urlId}`, datosActualizados);
};

// Cambiar el estado de un permiso
export const changePermisoState = (nombre, nuevoEstado) =>
  axios.patch(`permisos/${nombre}/estado`, { estado: nuevoEstado });
