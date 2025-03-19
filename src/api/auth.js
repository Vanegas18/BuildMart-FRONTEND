import axios from "axios";

const URL = "https://buildmart-backend-production.up.railway.app";

export const registerRequest = (usuario) =>
  axios.post(`${URL}/usuarios`, usuario);
