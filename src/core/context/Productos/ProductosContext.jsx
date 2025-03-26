import { registerProduct, getProducts, editProducto } from "@/core/api/Productos";
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
    try {
      const res = await registerProduct(producto);
      await obtenerProductos();
      return res;
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  // Función para editar un producto
  const editarProducto = async (producto) => {
    try {
      const res = await editProducto(producto);
      await obtenerProductos();
      return res;
    } catch (error) {
      console.error("Error al editar el producto:", error);
    }
  };

  // Proveedor del contexto con los valores y funciones
  return (
    <ProductosContext.Provider
      value={{ productos, crearProductos, obtenerProductos, editarProducto }}>
      {children}
    </ProductosContext.Provider>
  );
}
