import { editCategory, getCategories, registerCategory } from "@/core/api";
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
    }
  };

  return (
    <CategoriasProductosContext.Provider
      value={{
        categorias,
        obtenerCategorias,
        crearCategorias,
        editarCategoria,
        isLoaded,
      }}>
      {children}
    </CategoriasProductosContext.Provider>
  );
}
