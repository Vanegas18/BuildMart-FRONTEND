import React, { useEffect, useMemo, useState } from "react";
import { CatProveedorTableRow } from "./CatProveedoresTableRow";
import { StateDisplay } from "../../Dashboard/Layout";
import { useCatProveedores } from "@/core/context/CatProveedores/CatProveedoresContext";
import styles from "./styles/CatProveedores.module.css";

export const CatProveedoresTable = ({ 
  refreshTrigger,
  currentPage = 1,
  itemsPerPage = 5,
  catProveedores,
  onEstadoCambiado, 
  onCategoriaEditada
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { obtenerCatProveedores } = useCatProveedores();

  // Filtrar productos para la página actual
  const paginatedCatProveedores = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return catProveedores.slice(startIndex, endIndex);
  }, [catProveedores, currentPage, itemsPerPage]);

  useEffect(() => {
    const fetchCatProveedores = async () => {
      setIsLoading(true);
      try {
        await obtenerCatProveedores();
      } catch (error) {
        setError("No se pudieron cargar las categorías de proveedores");
        console.error("Error al cargar las categorias de proveedores:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCatProveedores();
  }, [refreshTrigger, obtenerCatProveedores]);
      
  // Renderizado condicional para estados de carga y error
  if (isLoading || error || !catProveedores?.length) {
    return (
      <StateDisplay
        loading={isLoading}
        empty={!isLoading && !error && !catProveedores?.length}
        error={error}
      />
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        {/* HEADER DE LA TABLA */}
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        {/* BODY DE LA TABLA */}
        <tbody>
          {paginatedCatProveedores.map((catProveedor) => (
            <CatProveedorTableRow
              key={catProveedor._id}
              catProveedor={catProveedor}
              onEstadoCambiado={onEstadoCambiado} 
              onCategoriaEditada={onCategoriaEditada} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CatProveedoresTable;