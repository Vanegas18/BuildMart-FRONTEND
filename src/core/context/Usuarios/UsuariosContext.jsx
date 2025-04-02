import { getUsuarios, newUsuario } from "@/core/api";
import { createContext, useCallback, useContext, useState } from "react";

// Creación del contexto de productos
const UsuariosContext = createContext();

// Hook personalizado para usar el contexto de usuarios
export const useUsuarios = () => {
  const context = useContext(UsuariosContext);

  if (!context) {
    throw new Error("useUsuarios debe ser usado dentro de un UsuariosProvider");
  }

  return context;
};

// Proveedor del contexto de usuarios
export function UsuariosProvider({ children }) {
  // Estado para almacenar los usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const obtenerUsuarios = useCallback(async () => {
    if (isLoaded) return;

    try {
      const res = await getUsuarios();
      setUsuarios(res.data);
      setIsLoaded(true);
    } catch (error) {
      console.log("Error en el fetch de usuarios", error);
      setIsLoaded(false);
    }
  }, [isLoaded]);

  const crearUsuario = async (usuario) => {
    try {
      const res = await newUsuario(usuario);
      setIsLoaded(false);
      return res;
    } catch (error) {
      console.log("Error al crear el usuario", error);
    }
  };

  return (
    <UsuariosContext.Provider
      value={{ usuarios, obtenerUsuarios, isLoaded, crearUsuario }}>
      {children}
    </UsuariosContext.Provider>
  );
}
