import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "@/api";
import { toast } from "sonner";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res?.data) {
        toast.success("¡Cuenta creada exitosamente!");
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setError(error.response?.data);
      throw error;
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res?.data) {
        toast.success("¡Usuario logueado exitosamente!");
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

  useEffect(() => {
    async function checkLogin() {
      const token = Cookies.get("token");

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        const resp = await verifyTokenRequest();
        if (!resp.data) {
          setIsAuthenticated(false);
          setUser(null);
        } else {
          setIsAuthenticated(true);
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, user, isAuthenticated, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
