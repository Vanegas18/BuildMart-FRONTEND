import axios from "axios";

const instance = axios.create({
  baseURL: "https://buildmart-backend-production.up.railway.app",
  withCredentials: true,
});

export default instance;
