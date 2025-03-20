import axios from "axios";

const instance = axios.create({
  baseURL: "https://buildmart-backend.onrender.com/",
  withCredentials: true,
});

export default instance;
