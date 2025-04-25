import { createContext, useContext, useState, useEffect } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  // Estado para almacenar los favoritos
  const [favoritos, setFavoritos] = useState([]);

  // Cargar favoritos desde localStorage al iniciar
  useEffect(() => {
    const storedFavoritos = localStorage.getItem("favoritos");
    if (storedFavoritos) {
      try {
        setFavoritos(JSON.parse(storedFavoritos));
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
        setFavoritos([]);
      }
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  // Verificar si un producto está en favoritos
  const isFavorito = (productId) => {
    return favoritos.some((item) => item._id === productId);
  };

  // Añadir producto a favoritos
  const addToFavoritos = (product) => {
    if (!isFavorito(product._id)) {
      setFavoritos([...favoritos, product]);
    }
  };

  // Eliminar producto de favoritos
  const removeFromFavoritos = (productId) => {
    setFavoritos(favoritos.filter((item) => item._id !== productId));
  };

  // Alternar estado de favorito (añadir si no existe, eliminar si existe)
  const toggleFavorito = (product) => {
    if (isFavorito(product._id)) {
      removeFromFavoritos(product._id);
    } else {
      addToFavoritos(product);
    }
  };

  // Limpiar todos los favoritos
  const clearFavoritos = () => {
    setFavoritos([]);
  };

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        isFavorito,
        addToFavoritos,
        removeFromFavoritos,
        toggleFavorito,
        clearFavoritos,
      }}>
      {children}
    </FavoritosContext.Provider>
  );
}

// Hook personalizado para acceder al contexto
export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error(
      "useFavoritos debe ser usado dentro de un FavoritosProvider"
    );
  }
  return context;
};
