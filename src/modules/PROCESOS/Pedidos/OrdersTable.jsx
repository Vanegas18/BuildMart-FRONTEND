import styles from "../Productos/styles/Products.module.css";
import { useEffect, useMemo, useState, useCallback } from "react";
import { OrdersTableRow } from ".";
import { StateDisplay } from "../../Dashboard/Layout";
import { usePedidos } from "@/core/context/Pedidos/PedidosContext";

export const OrdersTable = ({
  refreshTrigger,
  currentPage = 1,
  itemsPerPage = 5,
  pedidos = [], // IMPORTANTE: Ahora recibimos los pedidos filtrados como prop
  onEstadoCambiado,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { obtenerPedidos, isLoaded } = usePedidos();

  // Función para actualizar los pedidos
  const actualizarPedidos = useCallback(async () => {
    setLoading(true);
    try {
      await obtenerPedidos();
      if (onEstadoCambiado) onEstadoCambiado(); // Notificar al componente padre
    } catch (error) {
      setError("No se pudieron actualizar los pedidos");
      console.error("Error al actualizar pedidos:", error);
    } finally {
      setLoading(false);
    }
  }, [obtenerPedidos, onEstadoCambiado]);

  // Obtener pedidos al montar el componente si aún no están cargados
  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      try {
        // Solo obtener pedidos si aún no están cargados
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

  // Paginación de los pedidos - USAMOS LOS PEDIDOS DE PROPS
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pedidos.slice(startIndex, endIndex);
  }, [pedidos, currentPage, itemsPerPage]);

  // Mostrar estado de carga o error
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
