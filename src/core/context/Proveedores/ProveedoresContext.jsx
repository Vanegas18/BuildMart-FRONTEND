import { 
  registerProveedor, 
  getProveedores,
  updateProveedor,
  editProveedorEstado
} from "@/core/api/Proveedores/proveedores";
import { createContext, useContext, useState } from "react";

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
  const [loading, setLoading] = useState(false);

  // Función para obtener todos los proveedores
  const obtenerProveedores = async () => {
    if (loading) return;
    try {
      const res = await getProveedores();
      setProveedores(res.data);
      setLoading(true);
    } catch (error) {
      console.log("Error en el fetch de proveedores:", error);
    }
  };

  // Función para crear un nuevo proveedor
  const crearProveedor = async (proveedor) => {
    try {
      const res = await registerProveedor(proveedor);
      setLoading(false);
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
    } catch (error) {
      console.error("Error al actualizar el proveedor:", error);
    }
  };

  // Función para editar el estado de un proveedor
  const editarProveedorEstado = async (provId, nuevoEstado) => {
    try {
      const res = await editProveedorEstado(provId, nuevoEstado);
      setLoading(false);
      console.log("Estado cambiado con éxito:");
      return res;
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
      console.error(
        "Error al cambiar el estado del proveedor:",
        error
      );
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
        loading
        }}>
      {children}
    </ProveedoresContext.Provider>
  );
} 