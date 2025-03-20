import { createContext, useState, useContext } from "react";
import { registerRequest } from "@/api";
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
      setError(error.response.data);
      // Lanzar el error para que sea capturado por el try/catch en onFormSubmit
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ signup, user, isAuthenticated, error }}>
      {children}
    </AuthContext.Provider>
  );
};
