import styles from "../Productos/styles/Products.module.css";
import { useEffect, useMemo, useState, useCallback } from "react";
import { ComprasTableRow } from "."; // Este es el componente que muestra cada fila
import { StateDisplay } from "../../Dashboard/Layout"; // Muestra el estado (cargando, vacío, error)
import { useCompras } from "@/core/context/Compras/ComprasContext"; // Suponiendo que existe el contexto para las compras

export const ComprasTable = ({
  refreshTrigger,
  currentPage = 1,
  itemsPerPage = 5,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { compras, obtenerCompras, isLoaded } = useCompras();

  // Función para actualizar las compras
  const actualizarCompras = useCallback(async () => {
    setLoading(true);
    try {
      await obtenerCompras();
    } catch (error) {
      setError("No se pudieron actualizar las compras");
      console.error("Error al actualizar compras:", error);
    } finally {
      setLoading(false);
    }
  }, [obtenerCompras]);

  // Obtener compras al montar el componente si aún no están cargadas
  useEffect(() => {
    const fetchCompras = async () => {
      setLoading(true);
      try {
        // Solo obtener compras si aún no están cargadas
        if (!isLoaded) {
          await obtenerCompras();
        }
      } catch (error) {
        setError("No se pudieron cargar las compras");
        console.error("Error al cargar compras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, [refreshTrigger, obtenerCompras, isLoaded]);

  // Paginación de las compras
  const paginatedCompras = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return compras.slice(startIndex, endIndex);
  }, [compras, currentPage, itemsPerPage]);

  // Mostrar estado de carga o error
  if (loading || error || !compras?.length) {
    return (
      <StateDisplay
        loading={loading}
        empty={!loading && !error && !compras?.length}
        error={error}
        section={"compras"}
      />
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.salesTable}>
        <thead>
          <tr className={styles.tableHead}>
            <th className={styles.tableHeaderCell}>Compra</th>
            <th className={styles.tableHeaderCell}>Proveedor</th>
            <th className={styles.tableHeaderCell}>Fecha</th>
            <th className={styles.tableHeaderCell}>Total</th>
            <th className={styles.tableHeaderCell}>Estado</th>
            <th className={styles.tableHeaderCellRight}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCompras.map((compra) => (
            <ComprasTableRow
              key={compra._id}
              compra={compra}
              onEstadoCambiado={actualizarCompras} // Actualiza el estado de la compra
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
