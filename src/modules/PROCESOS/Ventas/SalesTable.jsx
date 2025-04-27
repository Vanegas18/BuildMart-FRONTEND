import styles from "../Productos/styles/Products.module.css";
import { useEffect, useMemo, useState, useCallback } from "react";
import { SalesTableRow } from ".";
import { StateDisplay } from "../../Dashboard/Layout";
import { useVentas } from "@/core/context/Ventas/VentasContext";

export const SalesTable = ({
  refreshTrigger,
  currentPage = 1,
  itemsPerPage = 5,
  ventas = [], // IMPORTANTE: Ahora recibimos las ventas filtradas como prop
  onEstadoCambiado,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { obtenerVentas, isLoaded } = useVentas();

  // Función para actualizar las ventas
  const actualizarVentas = useCallback(async () => {
    setLoading(true);
    try {
      await obtenerVentas();
      if (onEstadoCambiado) onEstadoCambiado(); // Notificar al componente padre
    } catch (error) {
      setError("No se pudieron actualizar las ventas");
      console.error("Error al actualizar ventas:", error);
    } finally {
      setLoading(false);
    }
  }, [obtenerVentas, onEstadoCambiado]);

  // Obtener ventas al montar el componente si aún no están cargadas
  useEffect(() => {
    const fetchVentas = async () => {
      setLoading(true);
      try {
        // Solo obtener ventas si aún no están cargadas
        if (!isLoaded) {
          await obtenerVentas();
        }
      } catch (error) {
        setError("No se pudieron cargar las ventas");
        console.error("Error al cargar ventas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVentas();
  }, [refreshTrigger, obtenerVentas, isLoaded]);

  // Paginación de las ventas - USAMOS LAS VENTAS DE PROPS
  const paginatedSales = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return ventas.slice(startIndex, endIndex);
  }, [ventas, currentPage, itemsPerPage]);

  // Mostrar estado de carga o error
  if (loading || error || !ventas?.length) {
    return (
      <StateDisplay
        loading={loading}
        empty={!loading && !error && !ventas?.length}
        error={error}
        section={"ventas"}
      />
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.salesTable}>
        <thead>
          <tr className={styles.tableHead}>
            <th className={styles.tableHeaderCell}>Venta</th>
            <th className={styles.tableHeaderCell}>Cliente</th>
            <th className={styles.tableHeaderCell}>Fecha</th>
            <th className={styles.tableHeaderCell}>Total</th>
            <th className={styles.tableHeaderCell}>Estado</th>
            <th className={styles.tableHeaderCellRight}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedSales.map((venta) => (
            <SalesTableRow
              key={venta._id}
              venta={venta}
              onEstadoCambiado={actualizarVentas}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};