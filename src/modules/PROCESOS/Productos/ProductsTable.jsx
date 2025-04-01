import styles from "./styles/Products.module.css";
import { useEffect, useMemo, useState } from "react";
import { ProductTableRow } from ".";
import { StateDisplay } from "../../Dashboard/Layout";
import { useProductos } from "@/core/context/Productos/ProductosContext";

export const ProductsTable = ({
  refreshTrigger,
  currentPage = 1,
  itemsPerPage = 5,
  productos,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { obtenerProductos, isLoaded } = useProductos();

  // Filtrar productos para la página actual
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return productos.slice(startIndex, endIndex);
  }, [productos, currentPage, itemsPerPage]);

  // Obtener productos al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        // Solo obtener categorías si aún no están cargadas
        if (!isLoaded) {
          await obtenerProductos();
        }
      } catch (error) {
        setError("No se pudieron cargar los productos");
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [refreshTrigger, obtenerProductos, isLoaded]);

  // Renderizado condicional para estados de carga y error
  if (loading || error || !productos?.length) {
    return (
      <StateDisplay
        loading={loading}
        empty={!loading && !error && !productos?.length}
        error={error}
      />
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.productsTable}>
        {/* HEADER DE LA TABLA */}
        <thead>
          <tr className={styles.tableHead}>
            <th className={styles.tableHeaderCell}>Producto</th>
            <th className={styles.tableHeaderCell}>Descripción</th>
            <th className={styles.tableHeaderCell}>Categoría</th>
            <th className={styles.tableHeaderCell}>Precio de venta</th>
            <th className={styles.tableHeaderCell}>Precio de compra</th>
            <th className={styles.tableHeaderCell}>Stock</th>
            <th className={styles.tableHeaderCell}>Estado</th>
            <th className={styles.tableHeaderCell}>Img</th>
            <th className={styles.tableHeaderCellRight}>Acciones</th>
          </tr>
        </thead>

        {/* BODY DE LA TABLA */}
        <tbody>
          {paginatedProducts.map((product) => (
            <ProductTableRow key={product._id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
  