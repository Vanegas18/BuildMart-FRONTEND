import styles from "../Productos/styles/Products.module.css";
import { useEffect, useMemo, useState, useCallback } from "react";
import { OrdersTableRow } from ".";
import { StateDisplay } from "../../Dashboard/Layout";
import { usePedidos } from "@/core/context/Pedidos/PedidosContext";

export const OrdersTable = ({
  refreshTrigger,
  currentPage = 1,
  itemsPerPage = 5,
  pedidos = [],
  onEstadoCambiado,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { obtenerPedidos, isLoaded } = usePedidos();

  const actualizarPedidos = useCallback(async () => {
    setLoading(true);
    try {
      await obtenerPedidos();
      if (onEstadoCambiado) onEstadoCambiado();
    } catch (error) {
      setError("No se pudieron actualizar los pedidos");
      console.error("Error al actualizar pedidos:", error);
    } finally {
      setLoading(false);
    }
  }, [obtenerPedidos, onEstadoCambiado]);

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      try {
        if (!isLoaded) {
          await obtenerPedidos();
        }
      } catch (error) {
        setError("No se pudieron cargar los pedidos");
        console.error("Error al cargar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [refreshTrigger, obtenerPedidos, isLoaded]);

  // ✅ Ordenar pedidos mostrando primero los que están en estado "Pendiente"
  const paginatedOrders = useMemo(() => {
    const sortedPedidos = [...pedidos].sort((a, b) => {
      if (a.estado === "pendiente" && b.estado !== "pendiente") return -1;
      if (a.estado !== "pendiente" && b.estado === "pendiente") return 1;
      return 0;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return sortedPedidos.slice(startIndex, endIndex);
  }, [pedidos, currentPage, itemsPerPage]);

  if (loading || error || !pedidos?.length) {
    return (
      <StateDisplay
        loading={loading}
        empty={!loading && !error && !pedidos?.length}
        error={error}
        section={"pedidos"}
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
              key={pedido.pedidoId || pedido._id}
              pedido={pedido}
              onEstadoCambiado={actualizarPedidos}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
