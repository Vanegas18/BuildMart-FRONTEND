import styles from "../Productos/styles/Products.module.css";
import { useUsuarios } from "@/core/context";
import { useEffect, useMemo, useState } from "react";
import { StateDisplay } from "@/modules/Dashboard/Layout";
import { UsuariosTableRow } from "./UsuariosTableRow";

export const UsuariosTable = ({
  refreshTrigger,
  currentPage = 1,
  itemsPerPage = 5,
  usuarios,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { obtenerUsuarios, isLoaded } = useUsuarios();

  // Filtrar usuarios para la página actual
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return usuarios.slice(startIndex, endIndex);
  }, [usuarios, currentPage, itemsPerPage]);

  // Obtener usuarios al montar el componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      try {
        // Solo obtener categorías si aún no están cargadas
        if (!isLoaded) {
          await obtenerUsuarios();
        }
      } catch (error) {
        setError("No se pudieron cargar los usuarios");
        console.error("Error al cargar usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [refreshTrigger, obtenerUsuarios, isLoaded]);

  // Renderizado condicional para estados de carga y error
  if (loading || error || !usuarios?.length) {
    return (
      <StateDisplay
        loading={loading}
        empty={!loading && !error && !usuarios?.length}
        error={error}
        section={"usuarios"}
      />
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.productsTable}>
        <thead>
          <tr className={styles.tableHead}>
            <th className={styles.tableHeaderCell}>Nombre completo</th>
            <th className={styles.tableHeaderCell}>Cedula</th>
            <th className={styles.tableHeaderCell}>Email</th>
            <th className={styles.tableHeaderCell}>Telefono</th>
            <th className={styles.tableHeaderCell}>Dirección</th>
            <th className={styles.tableHeaderCell}>Rol</th>
            <th className={styles.tableHeaderCell}>Estado</th>
            <th className={styles.tableHeaderCellRight}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {paginatedUsers.map((user) => (
            <UsuariosTableRow key={user._id} usuarios={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
