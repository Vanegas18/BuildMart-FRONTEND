import { useState, useEffect } from "react";
import { useProductos } from "@/core/context";

export const useProductFetching = () => {
  const { obtenerProductos, productos } = useProductos();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Solo cargar si no hay productos ya
    if (!productos || productos.length === 0) {
      const fetchProductos = async () => {
        setLoading(true);
        try {
          await obtenerProductos();
        } catch (error) {
          setError("No se pudieron cargar los productos");
          console.error("Error al cargar productos:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductos();
    } else {
      setLoading(false);
    }
  }, [obtenerProductos, productos]);

  return { productos, loading, error };
};
