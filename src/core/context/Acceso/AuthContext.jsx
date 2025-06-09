import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
} from "@/core/api/Acceso";
import { registrerClient } from "@/core/api";

// Creación del contexto de autenticación
export const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Estados para manejar la autenticación
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para limpiar el estado de autenticación
  const clearAuthState = () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove("token", { path: "/" });
  };

  // Función para verificar el estado de autenticación actual
  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const res = await verifyTokenRequest();
      if (!res.data) {
        clearAuthState();
      } else {
        setIsAuthenticated(true);
        setUser(res.data);
      }
    } catch (error) {
      console.error("Error en checkAuthStatus:", error);
      clearAuthState();
    } finally {
      setLoading(false);
    }
  };

  // Función para registrar un nuevo usuario
  const signup = async (user) => {
    try {
      setError(null);
      const res = await registrerClient(user);

      if (res?.data) {
        toast.success("¡Cuenta creada exitosamente!", {
          style: { marginTop: "35px" },
        });
        setUser(res.data);
        setIsAuthenticated(true);

        // Si el registro incluye un token, guardarlo
        if (res.data.token) {
          Cookies.set("token", res.data.token, { expires: 1, path: "/" });
        }
      }
      return res;
    } catch (error) {
      console.error("Error en signup:", error);
      const errorMessage =
        error.response?.data?.message || "Error al crear la cuenta";
      setError(error.response?.data);
      toast.error(errorMessage);
      throw error;
    }
  };

  // Función para iniciar sesión
  const signin = async (userData) => {
    try {
      setError(null);
      const res = await loginRequest(userData);

      if (res?.data) {
        // Guardar el token en las cookies
        if (res.data.token) {
          Cookies.set("token", res.data.token, { expires: 1, path: "/" });
        }

        toast.success("¡Usuario logueado exitosamente!", {
          style: { marginTop: "35px" },
        });

        setUser(res.data);
        setIsAuthenticated(true);
      }
      return res;
    } catch (error) {
      console.error("Error en signin:", error);

      let errorMessage = "Error en el inicio de sesión";

      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
        setError(error.response.data);
      } else if (error.request) {
        errorMessage = "Error al conectar con el servidor";
      } else {
        errorMessage = error.message || "Error desconocido";
      }

      toast.error(errorMessage);
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    try {
      clearAuthState();
      toast.success("Sesión cerrada exitosamente", {
        style: { marginTop: "35px" },
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión");
    }
  };

  // Función para manejar errores de token expirado
  const handleTokenExpired = () => {
    clearAuthState();
    toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
  };

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      setLoading(true);

      if (cookies.token) {
        try {
          const res = await verifyTokenRequest();
          if (res && res.data) {
            setIsAuthenticated(true);
            setUser(res.data);
          } else {
            clearAuthState();
          }
        } catch (error) {
          console.error("Error verificando token:", error);

          // Si el error es 401 (token expirado), manejarlo específicamente
          if (error.response?.status === 401) {
            handleTokenExpired();
          } else {
            clearAuthState();
          }
        }
      } else {
        clearAuthState();
      }
      setLoading(false);
    }

    checkLogin();
  }, []);

  // Función para limpiar errores
  const clearError = () => setError(null);

  // Proveedor del contexto con los valores y funciones
  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        checkAuthStatus,
        clearError,
        handleTokenExpired,
        isAuthenticated,
        user,
        error,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
