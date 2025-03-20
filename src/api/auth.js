import axios from "./axios";
import Cookies from "js-cookie";

export const registerRequest = (usuario) => axios.post(`/usuarios`, usuario);

export const loginRequest = async (usuario) => {
  return axios.post(`/usuarios/login`, {
    correo: usuario.correo,
    contraseña: usuario.contraseña,
  });
};

// En tu archivo api.js donde defines verifyTokenRequest
export const verifyTokenRequest = async () => {
  const token = Cookies.get('token');
  return await axios.get('https://buildmart-backend.onrender.com/usuarios/verify', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
  