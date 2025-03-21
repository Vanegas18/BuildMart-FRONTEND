import axios from "axios";
import Cookies from "js-cookie"

const instance = axios.create({
  baseURL: "https://buildmart-backend.onrender.com/",
  withCredentials: true,
  timeout: 10000,
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

export default instance;
