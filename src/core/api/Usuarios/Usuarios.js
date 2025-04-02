import axios from "../axios";

export const getUsuarios = () => axios.get("usuarios");

export const newUsuario = (usuario) => axios.post("usuarios", usuario);
