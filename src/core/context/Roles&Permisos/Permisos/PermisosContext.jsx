import { getPermisos } from "@/core/api/Roles&Permisos/Permisos/permisos";
import { createContext, useContext, useState } from "react";

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

  // Obtener todos los permisos
  const obtenerPermisos = async () => {
    try {
      const res = await getPermisos();
      setPermisos(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error en el fetch de permisos:", error);
    }
  };

  return (
    <PermisosContext.Provider value={{ permisos, obtenerPermisos }}>
      {children}
    </PermisosContext.Provider>
  );
}
