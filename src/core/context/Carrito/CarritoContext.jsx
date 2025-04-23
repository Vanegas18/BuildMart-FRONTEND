import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../Acceso";

const CarritoContext = createContext();

export const useCart = () => {
  const context = useContext(CarritoContext);
  if (context === undefined) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

export function CarritoProvider({ children }) {
  const auth = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("guest");

  // Actualizar el ID del usuario cuando cambie el estado de autenticación
  // Asegurarnos de que no actualizamos mientras se está cargando
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
    } else {
    }
  }, [auth.user, auth.isAuthenticated, auth.loading]);

  // Cargar el carrito del usuario actual cuando cambie el ID de usuario
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem(`cart_${currentUserId}`);
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      setCartItems(parsedCart);
    }
  }, [currentUserId]);

  // Guardar el carrito cuando cambie
  useEffect(() => {
    if (typeof window !== "undefined" && currentUserId) {
      localStorage.setItem(`cart_${currentUserId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, currentUserId]);

  // Resto de las funciones del carrito...
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  const getSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.precio * item.quantity,
      0
    );
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CarritoContext.Provider
      value={{
        cartItems,
        isCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        getSubtotal,
        getItemCount,
        clearCart,
        toggleCart,
        setIsCartOpen,
        currentUserId,
      }}>
      {children}
    </CarritoContext.Provider>
  );
}
