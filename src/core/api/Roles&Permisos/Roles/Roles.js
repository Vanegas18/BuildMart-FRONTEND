import axios from "../../axios";

export const getRoles = () => axios.get("roles");

export const newRol = (rol) => axios.post("roles", rol);

export const editRol = (rol) => {
  // Usamos nombreOriginal para la URL si está disponible, si no, usamos nombre
  const urlId = rol.nombreOriginal || rol.nombre;

  // Enviamos los datos actualizados (sin incluir nombreOriginal en el cuerpo)
  const { nombreOriginal, ...datosActualizados } = rol;

  return axios.put(`roles/${urlId}`, datosActualizados);
};

export const changeRolState = (nombre, nuevoEstado) =>
  axios.patch(`roles/${nombre}/estado`, { estado: nuevoEstado });
