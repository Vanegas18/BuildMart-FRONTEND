import { registerProduct, getProducts } from "@/core/api/Productos";
import { createContext, useContext, useState } from "react";

// Creación del contexto de productos
const ProductosContext = createContext();

// Hook personalizado para usar el contexto de productos
export const useProductos = () => {
  const context = useContext(ProductosContext);

  if (!context) {
    throw new Error(
      "useProductos debe ser usado dentro de un ProductosProvider"
    );
  }

  return context;
};

// Proveedor del contexto de productos
export function ProductosProvider({ children }) {
  // Estado para almacenar los productos
  const [productos, setProductos] = useState([]);

  // Función para obtener todos los productos
  const obtenerProductos = async () => {
    try {
      const res = await getProducts();
      setProductos(res.data);
    } catch (error) {
      console.log("Error en el fetch de productos:", error);
    }
  };

  // Función para crear un nuevo producto
  const crearProductos = async (producto) => {
    const res = await registerProduct(producto);
    console.log(res);
  };

  // Proveedor del contexto con los valores y funciones
  return (
    <ProductosContext.Provider
      value={{ productos, crearProductos, obtenerProductos }}>
      {children}
    </ProductosContext.Provider>
  );
}
