import axios from "../../axios";

export const getRoles = () => axios.get("roles");

export const newRol = (rol) => axios.post("roles", rol);

export const editRol = (rol) => axios.put(`roles/${rol.nombre}`, rol);

export const changeRolState = (nombre, nuevoEstado) =>
  axios.patch(`roles/${nombre}/estado`, { estado: nuevoEstado });
