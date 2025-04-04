import {
  changePermisoState,
  editPermiso,
  getPermisos,
  newPermiso,
} from "@/core/api/Roles&Permisos/Permisos/permisos";
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

  const crearPermiso = async (permiso) => {
    try {
      const res = await newPermiso(permiso);
      setIsLoaded(false);
      return res;
    } catch (error) {
      console.log("Error al crear el permiso", error);
      throw error;
    }
  };

  const editarPermiso = async (permiso) => {
    try {
      const res = await editPermiso(permiso);
      setIsLoaded(false);
      return res;
    } catch (error) {
      console.log("Error al editar el permiso", error);
      throw error;
    }
  };

  const cambiarEstadoPermiso = async (nombre, permiso) => {
    try {
      const res = await changePermisoState(nombre, permiso);
      setIsLoaded(false);
      return res;
    } catch (error) {
      console.log("Error al cambiar el estado del permiso", error);
      throw error;
    }
  };

  return (
    <PermisosContext.Provider
      value={{
        permisos,
        obtenerPermisos,
        isLoaded,
        crearPermiso,
        editarPermiso,
        cambiarEstadoPermiso,
      }}>
      {children}
    </PermisosContext.Provider>
  );
}
