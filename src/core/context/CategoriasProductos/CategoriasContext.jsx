import {
  changeCategoryState,
  editCategory,
  getCategories,
  registerCategory,
} from "@/core/api";
import { createContext, useCallback, useContext, useState } from "react";

const CategoriasProductosContext = createContext();

// Hook personalizado para usar el contexto de categorias
export const useCategoriaProductos = () => {
  const context = useContext(CategoriasProductosContext);

  if (!context) {
    throw new Error(
      "useCategoriaProductos debe ser usado dentro de un CategoriaProductosProvider"
    );
  }

  return context;
};

// Proveedor del contexto de productos
export function CategoriaProductosProvider({ children }) {
  const [categorias, setCategorias] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Obtener las categorias de productos
  const obtenerCategorias = useCallback(async () => {
    // Si ya se cargaron las categorías, no hacer otra solicitud
    if (isLoaded) return;

    try {
      const res = await getCategories();
      setCategorias(res.data);
      setIsLoaded(true);
    } catch (error) {
      console.log("Error en el fetch de categorias:", error);
      setIsLoaded(false);
      throw error;
    }
  }, [isLoaded]);

  // Crear una nueva categoria de producto
  const crearCategorias = async (categoria) => {
    try {
      const res = await registerCategory(categoria);
      // Resetear isLoaded para forzar una recarga
      setIsLoaded(false);
      // La próxima vez que se llame a obtenerCategorias, hará una nueva solicitud
      return res;
    } catch (error) {
      console.log("Error al crear la categoria:", error);
      throw error;
    }
  };

  // Editar una categoria
  const editarCategoria = async (categoria) => {
    try {
      const res = await editCategory(categoria);
      // Resetear isLoaded para forzar una recarga
      setIsLoaded(false);
      // La próxima vez que se llame a obtenerCategorias, hará una nueva solicitud
      return res;
    } catch (error) {
      console.log("Error al editar la categoria:", error);
      throw error;
    }
  };

  // Cambiar estado categoria
  const cambiarEstadoCategoria = async (categoriaId, categoria) => {
    try {
      const res = await changeCategoryState(categoriaId, categoria);
      // Resetear isLoaded para forzar una recarga
      setIsLoaded(false);
      return res;
    } catch (error) {
      console.error("Error al cambiar el estado de la categoria:", error);
      throw error;
    }
  };

  return (
    <CategoriasProductosContext.Provider
      value={{
        categorias,
        obtenerCategorias,
        crearCategorias,
        editarCategoria,
        cambiarEstadoCategoria,
        isLoaded,
      }}>
      {children}
    </CategoriasProductosContext.Provider>
  );
}
