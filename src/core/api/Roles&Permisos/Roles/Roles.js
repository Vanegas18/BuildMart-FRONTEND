import axios from "../../axios";

export const getRoles = () => axios.get("roles");

export const newRol = (rol) => axios.post("roles", rol);
