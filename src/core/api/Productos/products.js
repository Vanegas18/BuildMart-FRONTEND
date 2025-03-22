import axios from "../axios";

export const getProducts = () => axios.get("productos");

export const registerProduct = (producto) => axios.post("productos", producto);
