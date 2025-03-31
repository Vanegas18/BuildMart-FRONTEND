import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
} from "@/core/api/Acceso";

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

  // Función para verificar el estado de autenticación actual
  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const res = await verifyTokenRequest();
      if (!res.data) {
        setIsAuthenticated(false);
        setUser(null);
      } else {
        setIsAuthenticated(true);
        setUser(res.data);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Función para registrar un nuevo usuario
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res?.data) {
        toast.success("¡Cuenta creada exitosamente!", {
          style: {
            marginTop: "35px",
          },
        });
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setError(error.response?.data);
      throw error;
    }
  };

  // Función para iniciar sesión
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res?.data) {
        // Guardar el token en las cookies
        Cookies.set("token", res.data.token, { expires: 1, path: "/" }); // expira en 1 día
        toast.success("¡Usuario logueado exitosamente!", {
          style: {
            marginTop: "35px",
          },
        });
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
        toast.error(
          error.response.data?.message || "Error en el inicio de sesión"
        );
      } else {
        setError({ message: error.message || "Error en el servidor" });
        toast.error("Error al conectar con el servidor");
      }
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    try {
      Cookies.remove("token", { path: "/" });
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Sesión cerrada exitosamente", {
        style: {
          marginTop: "35px",
        },
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión");
    }
  };

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (cookies.token) {
        try {
          const res = await verifyTokenRequest();
          if (!res.data) setIsAuthenticated(false);
          setIsAuthenticated(true);
          setUser(res.data);
        } catch (error) {
          console.error("Error completo verificando token:", error);
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setLoading(false);
    }

    checkLogin();
  }, []);

  // Proveedor del contexto con los valores y funciones
  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        checkAuthStatus,
        isAuthenticated,
        user,
        error,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
