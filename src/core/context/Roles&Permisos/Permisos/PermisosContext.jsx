import { getPermisos } from "@/core/api/Roles&Permisos/Permisos/permisos";
import { createContext, useCallback, useContext, useState } from "react";

// Creación del contexto de permisos
const PermisosContext = createContext();

// Hook personalizado para usar el contexto de permisos
export const usePermisos = () => {
  const context = useContext(PermisosContext);

  if (!context) {
    throw new Error("usePermisos debe ser usado dentro de un PermisosProvider");
  }

  return context;
};

// Proveedor del contexto de permisos
export function PermisosProvider({ children }) {
  // Estado para almacenar los permisos
  const [permisos, setPermisos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Obtener todos los permisos
  const obtenerPermisos = useCallback(async () => {
    if (isLoaded) return;

    try {
      const res = await getPermisos();
      setPermisos(res.data);
      setIsLoaded(true);
    } catch (error) {
      console.log("Error en el fetch de permisos:", error);
      setIsLoaded(false);
      throw error;
    }
  }, [isLoaded]);

  return (
    <PermisosContext.Provider value={{ permisos, obtenerPermisos, isLoaded }}>
      {children}
    </PermisosContext.Provider>
  );
}
