import styles from "./styles/Products.module.css";
import { useEffect, useState } from "react";
import { ProductTableRow } from ".";
import { StateDisplay } from "../../Layout";
import { useProductos } from "@/context/ProductosContext";

export const ProductsTable = () => {
  // const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { obtenerProductos, productos } = useProductos();

  useEffect(() => {
    setLoading(true);
    obtenerProductos()
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

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
            <th className={styles.tableHeaderCell}>Precio</th>
            <th className={styles.tableHeaderCell}>Stock</th>
            <th className={styles.tableHeaderCell}>Estado</th>
            <th className={styles.tableHeaderCell}>Img</th>
            <th className={styles.tableHeaderCellRight}>Acciones</th>
          </tr>
        </thead>

        {/* BODY DE LA TABLA */}
        <tbody>
          {productos.map((product) => (
            <ProductTableRow key={product._id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
