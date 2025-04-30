import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../Acceso";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const auth = useAuth();
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState("guest");

  // Actualizar el ID del usuario cuando cambie el estado de autenticación
  useEffect(() => {
    if (!auth.loading) {
      if (auth.isAuthenticated && auth.user) {
        // Intentar varias propiedades posibles de ID
        const userId = auth.user._id || auth.user.id || auth.user.userId;

        if (userId) {
          setCurrentUserId(userId);
        } else {
          setCurrentUserId("guest");
        }
      } else {
        setCurrentUserId("guest");
      }
    }
  }, [auth.user, auth.isAuthenticated, auth.loading]);

  // Cargar favoritos desde localStorage al iniciar o cuando cambie el usuario
  useEffect(() => {
    setLoading(true);
    if (typeof window !== "undefined") {
      const storedFavoritos = localStorage.getItem(
        `favoritos_${currentUserId}`
      );
      if (storedFavoritos) {
        try {
          setFavoritos(JSON.parse(storedFavoritos));
        } catch (error) {
          console.error("Error al cargar favoritos:", error);
          setFavoritos([]);
        }
      } else {
        setFavoritos([]);
      }
      setLoading(false);
    }
  }, [currentUserId]);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    if (typeof window !== "undefined" && currentUserId) {
      localStorage.setItem(
        `favoritos_${currentUserId}`,
        JSON.stringify(favoritos)
      );
    }
  }, [favoritos, currentUserId]);

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
        loading,
        currentUserId,
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
