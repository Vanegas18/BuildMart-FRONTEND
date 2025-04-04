import axios from "../axios";
import Cookies from "js-cookie";

// Servicio de registro de usuario
export const registerRequest = (usuario) => axios.post(`/usuarios`, usuario);

// Servicio para iniciar sesión
export const loginRequest = async (usuario) => {
  return axios.post(`/usuarios/login`, {
    correo: usuario.correo,
    contraseña: usuario.contraseña,
  });
};

// Verifica si el token almacenado es válido
export const verifyTokenRequest = async () => {
  const token = Cookies.get("token");
  return await axios.get(
    "https://buildmart-back-billowing-feather-8375.fly.dev/usuarios/verify",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Solicita restablecimiento de contraseña enviando correo
export const forgotPasswordRequest = async (datos) => {
  return axios.post("/usuarios/restablecer-contrasena", datos);
};

// Verifica token y establece nueva contraseña
export const resetPasswordRequest = async (datos) => {
  return axios.post("/usuarios/verificar-token-contrasena", datos);
};
