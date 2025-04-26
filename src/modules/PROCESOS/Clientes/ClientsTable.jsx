import styles from "../Productos/styles/Products.module.css";
import { useEffect, useMemo, useState } from "react";
import { ClientsTableRow } from ".";
import { StateDisplay } from "../../Dashboard/Layout";
import { useClientes } from "@/core/context/Clientes/ClientesContext";

export const ClientsTable = ({
  refreshTrigger,
  currentPage = 1,
  itemsPerPage = 5,
  clientes,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { obtenerClientes, isLoaded } = useClientes();

  // Filtrar clientes para la página actual
  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return clientes.slice(startIndex, endIndex);
  }, [clientes, currentPage, itemsPerPage]);

  // Obtener clientes al montar el componente
  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      try {
        // Solo obtener clientes si aún no están cargados
        if (!isLoaded) {
          await obtenerClientes();
        }
      } catch (error) {
        setError("No se pudieron cargar los clientes");
        console.error("Error al cargar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, [refreshTrigger, obtenerClientes, isLoaded]);

  // Renderizado condicional para estados de carga y error
  if (loading || error || !clientes?.length) {
    return (
      <StateDisplay
        loading={loading}
        empty={!loading && !error && !clientes?.length}
        error={error}
        section={"clientes"}
      />
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.productsTable}>
        {/* HEADER DE LA TABLA */}
        <thead>
          <tr className={styles.tableHead}>
            <th className={styles.tableHeaderCell}>Cedula</th>
            <th className={styles.tableHeaderCell}>Cliente</th>
            <th className={styles.tableHeaderCell}>Correo</th>
            <th className={styles.tableHeaderCell}>Teléfono</th>
            <th className={styles.tableHeaderCell}>Dirección Principal</th>
            <th className={styles.tableHeaderCell}>Método de Pago</th>
            <th className={styles.tableHeaderCell}>Estado</th>
            <th className={styles.tableHeaderCellRight}>Acciones</th>
          </tr>
        </thead>

        {/* BODY DE LA TABLA */}
        <tbody>
          {paginatedClients.map((client) => (
            <ClientsTableRow key={client.clienteId} client={client} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
