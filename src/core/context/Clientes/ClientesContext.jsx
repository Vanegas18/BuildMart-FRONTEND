import {
  registrerClient,
  getClients,
  editClient,
  changeClientState,
} from "@/core/api/Clientes"; // Ajusta la importación de las funciones según corresponda
import { createContext, useCallback, useContext, useState } from "react";

// Creación del contexto de clientes
const ClientesContext = createContext();

// Hook personalizado para usar el contexto de clientes
export const useClientes = () => {
  const context = useContext(ClientesContext);

  if (!context) {
    throw new Error("useClientes debe ser usado dentro de un ClientesProvider");
  }

  return context;
};

// Proveedor del contexto de clientes
export function ClientesProvider({ children }) {
  // Estado para almacenar los clientes
  const [clientes, setClientes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Función para obtener todos los clientes
  const obtenerClientes = useCallback(async () => {
    // Si ya se cargaron los clientes, no hacer otra solicitud
    if (isLoaded) return;

    try {
      const res = await getClients();
      setClientes(res.data); // Asume que la respuesta tiene un campo `data` con los clientes
      setIsLoaded(true);
    } catch (error) {
      console.log("Error en el fetch de clientes:", error);
      setIsLoaded(false);
    }
  }, [isLoaded]);

  // Función para crear un nuevo cliente
  const crearCliente = async (cliente) => {
    try {
      const res = await registrerClient(cliente); // Asegúrate de ajustar la función `registerCliente` según tu API
      setIsLoaded(false); // Resetear isLoaded para forzar una recarga
      return res;
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      throw error;
    }
  };

  // Función para editar un cliente
  const editarCliente = async (cliente) => {
    try {
      if (!cliente._id) {
        throw new Error("ID del cliente es necesario");
      }

      const res = await editClient(cliente); // Edita el cliente usando cliente._id
      setIsLoaded(false); // Para forzar una recarga
      return res;
    } catch (error) {
      console.error("Error al editar el cliente:", error.message);
      throw error; // Podrías manejar el error en otro lugar si es necesario
    }
  };

  // Función para cambiar de estado un cliente
  const cambiarEstadoCliente = async (clienteId, nuevoEstado) => {
    try {
      // Hacemos la solicitud PATCH al backend para cambiar el estado
      const res = await changeClientState(clienteId, nuevoEstado);

      // Resetear isLoaded para forzar una recarga de clientes
      setIsLoaded(false);

      // Retornamos la respuesta del servidor (puedes usar esto para actualizar la UI)
      return res;
    } catch (error) {
      console.error(
        "Error al cambiar el estado del cliente:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  // Proveedor del contexto con los valores y funciones
  return (
    <ClientesContext.Provider
      value={{
        clientes,
        crearCliente,
        obtenerClientes,
        editarCliente,
        cambiarEstadoCliente,
        isLoaded,
      }}>
      {children}
    </ClientesContext.Provider>
  );
}
