import {
  registerProveedor,
  getProveedores,
  updateProveedor,
  editProveedorEstado,
} from "@/core/api/Proveedores/proveedores";
import { createContext, useCallback, useContext, useState } from "react";

// Creación del contexto de proveedores
const ProveedoresContext = createContext();

// Hook personalizado para usar el contexto de proveedores
export const useProveedores = () => {
  const context = useContext(ProveedoresContext);

  if (!context) {
    throw new Error(
      "useProveedores debe ser usado dentro de un ProveedoresProvider"
    );
  }

  return context;
};

// Proveedor del contexto de proveedores
export function ProveedoresProvider({ children }) {
  // Estado para almacenar los proveedores
  const [proveedores, setProveedores] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Función para obtener todos los proveedores
  const obtenerProveedores = useCallback(async () => {
    if (isLoaded) return;
    try {
      const res = await getProveedores();
      setProveedores(res.data);
      setIsLoaded(true);
    } catch (error) {
      console.log("Error en el fetch de proveedores:", error);
      setIsLoaded(false);
    }
  });

  // Función para crear un nuevo proveedor
  const crearProveedor = async (proveedor) => {
    try {
      const res = await registerProveedor(proveedor);
      setIsLoaded(false);
      setProveedores((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error al registrar el proveedor:", error);
    }
  };

  // Función para actualizar un proveedor
  const actualizarProveedor = async (proveedor) => {
    try {
      const res = await updateProveedor(proveedor);
      setProveedores((prev) =>
        prev.map((prov) =>
          prov._id === proveedor._id ? { ...prov, ...res.data } : prov
        )
      );
      setIsLoaded(false);
    } catch (error) {
      console.error("Error al actualizar el proveedor:", error);
    }
  };

  // Función para editar el estado de un proveedor
  const editarProveedorEstado = async (provId, nuevoEstado) => {
    try {
      // La función importada y la función del contexto tienen el mismo nombre
      // Cambiemos la referencia para evitar confusión
      const response = await editProveedorEstado(provId, nuevoEstado);

      if (!response || !response.data) {
        throw new Error("No se recibió respuesta del servidor");
      }

      // Actualizar el estado en el arreglo local
      setProveedores((prev) =>
        prev.map((prov) =>
          prov.proveedorId === provId ? { ...prov, estado: nuevoEstado } : prov
        )
      );

      // Forzar recarga de datos
      setIsLoaded(false);

      return response;
    } catch (error) {
      console.error("Error al editar el estado del proveedor:", error);
      throw error;
    }
  };

  // Función para manejar la desactivación o activacion de un proveedor
  const handleDeactivate = async (proveedor) => {
    if (!proveedor || !proveedor._id) {
      console.error("El proveedor es inválido o no tiene un _id:", proveedor);
      return;
    }

    try {
      const nuevoEstado = proveedor.estado === "Activo" ? "Inactivo" : "Activo";
      console.log("Intentando cambiar el estado de la categoría:", {
        id: proveedor._id,
        nuevoEstado,
      });

      await editarProveedorEstado(proveedor, nuevoEstado);
    } catch (error) {
      console.error("Error al cambiar el estado del proveedor:", error);
    }
  };

  // Proveedor del contexto con los valores y funciones
  return (
    <ProveedoresContext.Provider
      value={{
        proveedores,
        crearProveedor,
        obtenerProveedores,
        actualizarProveedor,
        editarProveedorEstado,
        handleDeactivate,
        isLoaded,
      }}>
      {children}
    </ProveedoresContext.Provider>
  );
}
