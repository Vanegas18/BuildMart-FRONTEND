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
      console.log(res.data);
      if (res?.data) {
        // Guardar el token en las cookies
        Cookies.set("token", res.data.token, { expires: 1, path: "/" }); // expira en 7 días
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
      console.log(res);
      if (res?.data) {
        // Guardar el token en las cookies
        Cookies.set("token", res.data.token, { expires: 1, path: "/" }); // expira en 7 días
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

  const logout = () => {
    try {
      // Eliminar el token de las cookies
      Cookies.remove("token", { path: "/" });

      // Actualizar el estado
      setUser(null);
      setIsAuthenticated(false);

      // Mostrar mensaje de éxito
      toast.success("Sesión cerrada exitosamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión");
    }
  };

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

  return (
    <AuthContext.Provider
      value={{ signup, signin, logout, user, isAuthenticated, error }}>
      {children}
    </AuthContext.Provider>
  );
};
