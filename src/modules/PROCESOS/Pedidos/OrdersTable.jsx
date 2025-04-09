import styles from "../Productos/styles/Products.module.css";
import { useEffect, useMemo, useState, useCallback } from "react";
import { OrdersTableRow } from ".";
import { StateDisplay } from "../../Dashboard/Layout";
import { usePedidos } from "@/core/context/Pedidos/PedidosContext";

export const OrdersTable = ({
  refreshTrigger,
  currentPage = 1,
  itemsPerPage = 5,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { pedidos, obtenerPedidos } = usePedidos();

  const actualizarPedidos = useCallback(async () => {
    setLoading(true);
    try {
      await obtenerPedidos();
    } catch (error) {
      setError("No se pudieron actualizar los pedidos");
      console.error("Error al actualizar pedidos:", error);
    } finally {
      setLoading(false);
    }
  }, [obtenerPedidos]);

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      try {
        await obtenerPedidos();
      } catch (error) {
        setError("No se pudieron cargar los pedidos");
        console.error("Error al cargar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [refreshTrigger, obtenerPedidos]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pedidos.slice(startIndex, endIndex);
  }, [pedidos, currentPage, itemsPerPage]);

  if (loading || error || !pedidos?.length) {
    return (
      <StateDisplay
        loading={loading}
        empty={!loading && !error && !pedidos?.length}
        error={error}
      />
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.productsTable}>
        <thead>
          <tr className={styles.tableHead}>
            <th className={styles.tableHeaderCell}>Pedido</th>
            <th className={styles.tableHeaderCell}>Cliente</th>
            <th className={styles.tableHeaderCell}>Fecha</th>
            <th className={styles.tableHeaderCell}>Total</th>
            <th className={styles.tableHeaderCell}>Estado</th>
            <th className={styles.tableHeaderCellRight}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((pedido) => (
            <OrdersTableRow
              key={pedido.pedidoId}
              pedido={pedido}
              onEstadoCambiado={actualizarPedidos}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
