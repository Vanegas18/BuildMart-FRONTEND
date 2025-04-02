import axios from "../axios";

export const getUsuarios = () => axios.get("usuarios");

export const newUsuario = (usuario) => axios.post("usuarios", usuario);

export const editUsuario = (usuario) =>
  axios.put(`usuarios/${usuario.usuarioId}/estado`, usuario);

export const changeUsuarioState = (usuarioId, nuevoEstado) =>
  axios.patch(`usuarios/${usuarioId}/estado`, { estado: nuevoEstado });
