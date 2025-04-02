import { getRoles, newRol } from "@/core/api";
import { createContext, useCallback, useContext, useState } from "react";

const RolesContext = createContext();

export const useRoles = () => {
  const context = useContext(RolesContext);

  if (!context) {
    throw new Error("useRoles debe ser usado dentro de un RolesProvider");
  }

  return context;
};

export function RolesProvider({ children }) {
  const [roles, setRoles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const obtenerRoles = useCallback(async () => {
    if (isLoaded) return;

    try {
      const res = await getRoles();
      setRoles(res.data);
      setIsLoaded(true);
    } catch (error) {
      console.log("Error en la petición de roles", error);
      setIsLoaded(false);
    }
  }, [isLoaded]);

  const crearRol = async (rol) => {
    try {
      const res = await newRol(rol);
      setIsLoaded(false);
      return res;
    } catch (error) {
      console.log("Error al crear el rol", error);
    }
  };

  return (
    <RolesContext.Provider value={{ roles, obtenerRoles, isLoaded, crearRol }}>
      {children}
    </RolesContext.Provider>
  );
}
