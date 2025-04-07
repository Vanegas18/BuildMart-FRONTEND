import {
    getSales,
    createSale,
    updateSaleStatus,
    getSaleById,
  } from "@/core/api/Ventas/sales";  // Asegúrate de que la ruta sea correcta según tu estructura
  import { createContext, useCallback, useContext, useState } from "react";
  
  // 1. Crear el contexto
  const VentasContext = createContext();
  
  // 2. Hook personalizado para usar el contexto
  export const useVentas = () => {
    const context = useContext(VentasContext);
  
    if (!context) {
      throw new Error("useVentas debe ser usado dentro de un VentasProvider");
    }
  
    return context;
  };
  
  // 3. Proveedor del contexto
  export function VentasProvider({ children }) {
    const [ventas, setVentas] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
  
    // Obtener todas las ventas
    const obtenerVentas = useCallback(async () => {
      if (isLoaded) return;
  
      try {
        const res = await getSales();
        setVentas(res.data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
        setIsLoaded(false);
      }
    }, [isLoaded]);
  
    // Crear una nueva venta
    const crearVenta = async (venta) => {
      try {
        const res = await createSale(venta);
        setVentas((prevVentas) => [...prevVentas, res.data]); // Agrega la nueva venta al estado
        setIsLoaded(false);  // Para que se recargue la lista
        return res.data;
      } catch (error) {
        console.error("Error al crear la venta:", error);
        throw error;
      }
    };
  
    // Actualizar el estado de una venta
    const actualizarEstadoVenta = async (ventaId, nuevoEstado) => {
      try {
        const res = await updateSaleStatus(ventaId, nuevoEstado);
        setIsLoaded(false); // Para que se recargue la lista de ventas
        return res;
      } catch (error) {
        console.error("Error al actualizar el estado de la venta:", error);
        throw error;
      }
    };
  
    // Obtener una venta por su ID
    const obtenerVentaPorId = async (ventaId) => {
      try {
        const res = await getSaleById(ventaId);
        return res.data;
      } catch (error) {
        console.error("Error al obtener la venta:", error);
        throw error;
      }
    };
  
    return (
      <VentasContext.Provider
        value={{
          ventas,
          crearVenta,
          obtenerVentas,
          actualizarEstadoVenta,
          obtenerVentaPorId,
          isLoaded,
        }}
      >
        {children}
      </VentasContext.Provider>
    );
  }
  