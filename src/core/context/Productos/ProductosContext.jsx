import {
  registerProduct,
  getProducts,
  editProducto,
  changeProductState,
} from "@/core/api/Productos";
import { createContext, useCallback, useContext, useState } from "react";

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
  const [isLoaded, setIsLoaded] = useState(false);

  // Función para obtener todos los productos
  const obtenerProductos = useCallback(async () => {
    // Si ya se cargaron los productos, no hacer otra solicitud
    if (isLoaded) return;

    try {
      const res = await getProducts();
      setProductos(res.data);
      setIsLoaded(true);
    } catch (error) {
      console.log("Error en el fetch de productos:", error);
      setIsLoaded(false);
    }
  }, [isLoaded]);

  // Función para crear un nuevo producto
  const crearProductos = async (producto) => {
    try {
      const res = await registerProduct(producto);
      // Resetear isLoaded para forzar una recarga
      setIsLoaded(false);
      return res;
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  // Función para editar un producto
  const editarProducto = async (producto) => {
    try {
      const res = await editProducto(producto);
      // Resetear isLoaded para forzar una recarga
      setIsLoaded(false);
      // La próxima vez que se llame a obtenerProductos, hará una nueva solicitud
      return res;
    } catch (error) {
      console.error("Error al editar el producto:", error);
    }
  };

  // Función para cambiar de estado un producto
  const cambiarEstadoProducto = async (productoId, estado) => {
    try {
      const res = await changeProductState(productoId, estado);
      // Resetear isLoaded para forzar una recarga
      setIsLoaded(false);
      return res;
    } catch (error) {
      console.error("Error al cambiar el estado del producto:", error);
    }
  };

  // Proveedor del contexto con los valores y funciones
  return (
    <ProductosContext.Provider
      value={{
        productos,
        crearProductos,
        obtenerProductos,
        editarProducto,
        cambiarEstadoProducto,
        isLoaded
      }}>
      {children}
    </ProductosContext.Provider>
  );
}
