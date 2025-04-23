import{
    getCompras,
    getCompraById,
    createCompra,
    updateCompraStatus,
}from "@/core/api/Compras/compras"; 
import { createContext, useCallback, useContext, useState } from "react";

// 1. Crear el contexto
const ComprasContext = createContext();

// 2. Hook personalizado para usar el contexto
export const useCompras = () => {
    const context = useContext(ComprasContext);

    if (!context) {
        throw new Error("useCompras debe ser usado dentro de un ComprasProvider");
    }

    return context;
};

// 3. Proveedor del contexto
export function ComprasProvider({ children }) {
    const [compras, setCompras] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Obtener todas las compras
    const obtenerCompras = useCallback(async () => {
        if (isLoaded) return;

        try {
            const res = await getCompras();
            setCompras(res.data);
            setIsLoaded(true);
        } catch (error) {
            console.error("Error al obtener las compras:", error);
            setIsLoaded(false);
        }
    }, [isLoaded]);

    // Crear una nueva compra
    const crearCompra = async (compra) => {
        try {
            const res = await createCompra(compra);
            setCompras((prevCompras) => [...prevCompras, res.data]); // Agrega la nueva compra al estado
            setIsLoaded(false);  // Para que se recargue la lista
            return res.data;
        } catch (error) {
            console.error("Error al crear la compra:", error);
            throw error;
        }
    };

    // Obtener una compra por ID
    const obtenerCompraPorId = async (compraId) => {
        try {
            const res = await getCompraById(compraId);
            return res.data;
        } catch (error) {
            console.error("Error al obtener la compra por ID:", error);
            throw error;
        }
    };

    // Actualizar el estado de una compra
    const actualizarEstadoCompra = async (compraId, nuevoEstado) => {
        try {
            const res = await updateCompraStatus(compraId, nuevoEstado);
            setIsLoaded(false); // Para que se recargue la lista de compras
            return res;
        } catch (error) {
            console.error("Error al actualizar el estado de la compra:", error);
            throw error;
        }
    };

    // Proveer el contexto
    return (
        <ComprasContext.Provider
            value={{
                compras,
                obtenerCompras,
                crearCompra,
                obtenerCompraPorId,
                actualizarEstadoCompra,
                isLoaded,
            }}
        >
            {children}
        </ComprasContext.Provider>
    );
}