import {
  registerCatProveedores,
  getCatProveedores,
  updateCatProveedores,
  editCatProveedorEstado,
} from "@/core/api/CatProveedores/catProveedores";
import { createContext, useContext, useState } from "react";

// Creación del contexto de categorías de proveedores
const CatProveedoresContext = createContext();

// Hook personalizado para usar el contexto de categorías de proveedores
export const useCatProveedores = () => {
  const context = useContext(CatProveedoresContext);

  if (!context) {
    throw new Error(
      "useCatProveedores debe ser usado dentro de un CatProveedoresProvider"
    );
  }

  return context;
};

// Proveedor del contexto de categorías de proveedores
export function CatProveedoresProvider({ children }) {
  const [cateProveedores, setCatProveedores] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para obtener todas las categorías de proveedores
  const obtenerCatProveedores = async () => {
    if (loading) return; // Evita múltiples llamadas simultáneas
    try {
      const res = await getCatProveedores();
      setCatProveedores(res.data);
      setLoading(true); // Cambia el estado de loading a true
    } catch (error) {
      console.error("Error al obtener las categorías de proveedores:", error);
    }
  };

  // Función para registrar una nueva categoría de proveedor
  const crearCatProveedor = async (catProveedor) => {
    try {
      const res = await registerCatProveedores(catProveedor);
      setLoading(false); // Cambia el estado de loading a true
      setCatProveedores((prev) => [...prev, res.data]);

    } catch (error) {
      console.error("Error al registrar la categoría de proveedor:", error);
    }
  };

  // Función para actualizar una categoría de proveedor
  const actualizarCatProveedor = async (catProveedor) => {
    try {
      const res = await updateCatProveedores(catProveedor);
      setCatProveedores((prev) =>
        prev.map((cat) =>
          cat._id === catProveedor._id ? { ...cat, ...res.data } : cat
        )
      );
    } catch (error) {
      console.error("Error al actualizar la categoría de proveedor:", error);
    }
  };

  // Función para cambiar el estado de una categoría de proveedor
  const cambiarEstadoCategoria = async (catProveedor, catProveedorId) => {
    try {

      // Llama a la función con el ID
      const res = await editCatProveedorEstado(catProveedor, catProveedorId);
      setLoading(false); // Cambia el estado de loading a true
      console.log("Estado cambiado con éxito:");
      return res;
    } catch (error) {
      console.error(
        "Error al cambiar el estado de la categoría:",
        error
      );
      throw error; // Propaga el error para que pueda ser manejado en el componente
    }
  };

  // Función para manejar la desactivación o activación de una categoría
  const handleDeactivate = async (categoria) => {
    if (!categoria || !categoria._id) {
      console.error("La categoría es inválida o no tiene un _id:", categoria);
      return;
    }

    try {
      const nuevoEstado = categoria.estado === "Activo" ? "Inactivo" : "Activo";
      console.log("Intentando cambiar el estado de la categoría:", {
        id: categoria._id,
        nuevoEstado,
      });

      await cambiarEstadoCategoria(categoria, nuevoEstado);
    } catch (error) {
      console.error("Error al manejar la desactivación de la categoría:", error);
    }
  };

  return (
    <CatProveedoresContext.Provider
      value={{
        cateProveedores,
        obtenerCatProveedores,
        crearCatProveedor,
        actualizarCatProveedor,
        cambiarEstadoCategoria,
        handleDeactivate,
        loading // Exportamos la función handleDeactivate
      }}>
      {children}
    </CatProveedoresContext.Provider>
  );
}