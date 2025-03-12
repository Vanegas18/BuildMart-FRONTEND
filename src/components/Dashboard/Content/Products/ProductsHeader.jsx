import { Button } from "@/components";
import { Package } from "lucide-react";
import styles from "./styles/Products.module.css";


export const ProductsHeader = () => {
  return (
    <div className={styles.headerContainer}>
      <div>
        <h1 className={styles.headerTitle}>Gestión de Productos</h1>
        <p className={styles.headerDescription}>
          Administra el catálogo de productos
        </p>
      </div>
      <Button className={styles.addButton}>
        <Package className={styles.buttonIcon} />
        Añadir Producto
      </Button>
    </div>
  );
};
