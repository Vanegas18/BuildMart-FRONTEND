import axios from "axios";

const URL = "https://buildmart-backend-production.up.railway.app";

export const registerRequest = (usuario) =>
  axios.post(`${URL}/usuarios`, usuario);

export const loginRequest = async (usuario) => {
  try {
    const response = await axios.post(`${URL}/usuarios/login`, {
      correo: usuario.correo,
      contraseña: usuario.contraseña,
    });

    return response;
  } catch (error) {
    console.error("Error en API loginRequest:", error);
    throw error;
  }
};
