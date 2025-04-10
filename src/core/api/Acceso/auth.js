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
  try {
    const token = Cookies.get("token");
    if (!token) return Promise.reject("No token found");

    return await axios.get("/usuarios/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error en verifyTokenRequest:", error);
    throw error;
  }
};

// Solicita restablecimiento de contraseña enviando correo
export const forgotPasswordRequest = async (datos) => {
  return axios.post("/usuarios/restablecer-contrasena", datos);
};

// Verifica token y establece nueva contraseña
export const resetPasswordRequest = async (datos) => {
  return axios.post("/usuarios/verificar-token-contrasena", datos);
};
