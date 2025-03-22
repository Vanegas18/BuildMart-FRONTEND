import { registerProduct, getProducts } from "@/api";
import { createContext, useContext, useState } from "react";

const ProductosContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductosContext);

  if (!context) {
    throw new Error("useProductos must be used within a ProductosProvider");
  }

  return context;
};

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);

  const obtenerProductos = async () => {
    try {
      const res = await getProducts();
      setProductos(res.data);
    } catch (error) {
      console.log("Error en el fetch de productos:", error);
    }
  };

  const crearProductos = async (producto) => {
    const res = await registerProduct(producto);
    console.log(res);
  };
  return (
    <ProductosContext.Provider
      value={{ productos, crearProductos, obtenerProductos }}>
      {children}
    </ProductosContext.Provider>
  );
}
