import axios from "axios";

const instance = axios.create({
  baseURL: "https://buildmart-backend.onrender.com/",
  withCredentials: true,
  timeout: 10000,
});

export default instance;
