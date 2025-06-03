import styles from "../Productos/styles/Products.module.css";
import { useEffect, useMemo, useState, useCallback } from "react";
import { SalesTableRow } from ".";
import { StateDisplay } from "../../Dashboard/Layout";
import { useVentas } from "@/core/context/Ventas/VentasContext";

export const SalesTable = ({
  refreshTrigger,
  currentPage = 1,
  itemsPerPage = 5,
  ventas = [],
  onEstadoCambiado,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { obtenerVentas, isLoaded } = useVentas();

  const actualizarVentas = useCallback(async () => {
    setLoading(true);
    try {
      await obtenerVentas();
      if (onEstadoCambiado) onEstadoCambiado();
    } catch (error) {
      setError("No se pudieron actualizar las ventas");
      console.error("Error al actualizar ventas:", error);
    } finally {
      setLoading(false);
    }
  }, [obtenerVentas, onEstadoCambiado]);

  useEffect(() => {
    const fetchVentas = async () => {
      setLoading(true);
      try {
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

  const paginatedSales = useMemo(() => {
    const sortedVentas = [...ventas].sort((a, b) => {
      if (a.estado === "Pendiente" && b.estado !== "Pendiente") return -1;
      if (a.estado !== "Pendiente" && b.estado === "Pendiente") return 1;
      return 0;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return sortedVentas.slice(startIndex, endIndex);
  }, [ventas, currentPage, itemsPerPage]);

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
      <div className={styles.desktopOnly}>
        <table className={styles.productsTable}>
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
                viewMode="desktop"
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista móvil - Cards */}
      <div className={styles.mobileOnly}>
        <div className={styles.mobileCardsContainer}>
          {paginatedSales.map((venta) => (
            <SalesTableRow
              key={venta._id}
              venta={venta}
              onEstadoCambiado={actualizarVentas}
              viewMode="mobile"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
