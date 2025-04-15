import axios from "axios";
import Cookies from "js-cookie"

// Instancia base de Axios configurada para la API de BuildMart
const instance = axios.create({
  baseURL: "https://buildmart-back-billowing-feather-8375.fly.dev/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token a todas las solicitudes
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Limpiar cookies en caso de no autorizado
      Cookies.remove("token", { path: "/" });
    }
    return Promise.reject(error);
  }
);

export default instance;
