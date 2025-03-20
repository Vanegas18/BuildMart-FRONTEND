import axios from "./axios";

export const registerRequest = (usuario) => axios.post(`/usuarios`, usuario);

export const loginRequest = async (usuario) => {
  return axios.post(`/usuarios/login`, {
    correo: usuario.correo,
    contraseña: usuario.contraseña,
  });
};

export const verifyTokenRequest = () => axios.get("/usuarios/verify");
