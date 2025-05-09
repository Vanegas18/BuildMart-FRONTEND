import React, { useEffect, useMemo, useState } from "react";
import { ProveedorTableRow } from "./ProveedoresTableRow";
import { StateDisplay } from "../../Dashboard/Layout";
import { useProveedores } from "@/core/context/Proveedores/ProveedoresContext";
import styles from "../Productos/styles/Products.module.css";

export const ProveedoresTable = ({
  refreshTrigger,
  currentPage = 1,
  itemsPerPage = 5,
  proveedores,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { obtenerProveedores, isLoaded } = useProveedores();

  // Filtrar proveedores para la página actual
  const paginatedProveedores = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return proveedores.slice(startIndex, endIndex);
  }, [proveedores, currentPage, itemsPerPage]);

  useEffect(() => {
    const fetchProveedores = async () => {
      setIsLoading(true);
      try {
        if (!isLoaded) {
          await obtenerProveedores();
        }
      } catch (error) {
        setError("No se pudieron cargar los proveedores");
        console.error("Error al cargar proveedores:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProveedores();
  }, [refreshTrigger, obtenerProveedores]);

  // Renderizado condicional para estados de carga y error
  if (isLoading || error || !proveedores?.length) {
    return (
      <StateDisplay
        loading={isLoading}
        empty={!isLoading && !error && !proveedores?.length}
        error={error}
        section={"proveedores"}
      />
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.productsTable}>
        {/* HEADER DE LA TABLA */}
        <thead>
          <tr className={styles.tableHead}>
            <th className={styles.tableHeaderCell}>Nit</th>
            <th className={styles.tableHeaderCell}>Nombre</th>
            <th className={styles.tableHeaderCell}>Dirección</th>
            <th className={styles.tableHeaderCell}>Teléfono</th>
            <th className={styles.tableHeaderCell}>Correo</th>
            <th className={styles.tableHeaderCell}>Categoría</th>
            <th className={styles.tableHeaderCell}>Estado</th>
            <th className={styles.tableHeaderCellRight}>Acciones</th>
          </tr>
        </thead>

        {/* BODY DE LA TABLA */}
        <tbody>
          {paginatedProveedores.map((proveedor) => (
            <ProveedorTableRow key={proveedor._id} proveedor={proveedor} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProveedoresTable;
