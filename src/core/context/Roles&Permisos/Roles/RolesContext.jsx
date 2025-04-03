import { changeRolState, editRol, getRoles, newRol } from "@/core/api";
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
      throw error;
    }
  }, [isLoaded]);

  const crearRol = async (rol) => {
    try {
      const res = await newRol(rol);
      setIsLoaded(false);
      return res;
    } catch (error) {
      console.log("Error al crear el rol", error);
      throw error;
    }
  };

  const editarRol = async (rol) => {
    try {
      const res = await editRol(rol);
      setIsLoaded(false);
      return res;
    } catch (error) {
      console.log("Error al editar el rol", error);
      throw error;
    }
  };

  const cambiarEstadoRol = async (nombre, rol) => {
    try {
      const res = await changeRolState(nombre, rol);
      setIsLoaded(false);
      return res;
    } catch (error) {
      console.log("Error al cambiar el estado del rol", error);
      throw error;
    }
  };

  return (
    <RolesContext.Provider
      value={{
        roles,
        obtenerRoles,
        isLoaded,
        crearRol,
        editarRol,
        cambiarEstadoRol,
      }}>
      {children}
    </RolesContext.Provider>
  );
}
