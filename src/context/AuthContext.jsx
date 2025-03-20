import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest } from "@/api";
import { toast } from "sonner";

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

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);

      if (res && res.data) {
        toast.success("¡Cuenta creada exitosamente!");
        setUser(res.data);
        setIsAuthenticated(true);
      }
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
      // Manejo específico según el tipo de error
      setError(error.response?.data);
      throw error;
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res && res.data) {
        toast.success("¡Usuario logueado exitosamente!");
      }
      console.log(res);
    } catch (error) {
      console.log(error.response);
      // Manejo específico según el tipo de error
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

  return (
    <AuthContext.Provider
      value={{ signup, user, isAuthenticated, error, signin }}>
      {children}
    </AuthContext.Provider>
  );
};
