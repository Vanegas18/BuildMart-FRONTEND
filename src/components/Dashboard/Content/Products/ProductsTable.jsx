import { Button } from "@/components";
import { Package } from "lucide-react";
import styles from "./styles/Products.module.css";

export const ProductsTable = ({ products }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.productsTable}>
        <thead>
          <tr className={styles.tableHead}>
            <th className={styles.tableHeaderCell}>Producto</th>
            <th className={styles.tableHeaderCell}>Categoría</th>
            <th className={styles.tableHeaderCell}>Precio</th>
            <th className={styles.tableHeaderCell}>Stock</th>
            <th className={styles.tableHeaderCell}>Estado</th>
            <th className={styles.tableHeaderCellRight}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className={styles.tableRow}>
              <td className={styles.tableCell}>
                <div className={styles.productInfo}>
                  <div className={styles.productIcon}>
                    <Package className={styles.productIconSvg} />
                  </div>
                  <span className={styles.productName}>{product.name}</span>
                </div>
              </td>
              <td className={styles.tableCellSmall}>{product.category}</td>
              <td className={styles.tableCellSmall}>{product.price}</td>
              <td className={styles.tableCellSmall}>{product.stock}</td>
              <td className={styles.tableCell}>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    product.status === "Activo"
                      ? "bg-green-100 text-green-800"
                      : product.status === "Agotado"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {product.status}
                </span>
              </td>
              <td className={styles.tableCellRight}>
                <div className={styles.actionsContainer}>
                  <Button variant="ghost" size="xl">
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="xl"
                    className={styles.deleteButton}>
                    Desactivar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
