import styles from "../content/products/styles/Products.module.css";
import { Loader, AlertCircle, PackageX } from "lucide-react";

export const StateDisplay = ({ loading, error, empty }) => {
  if (loading) {
    return (
      <div className={styles.loadingState}>
        <Loader className="animate-spin mr-2" size={20} />
        Cargando productos...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <AlertCircle className="mr-2" size={20} />
        {error}
      </div>
    );
  }

  if (empty) {
    return (
      <div className={styles.emptyState}>
        <PackageX className="mb-2" size={24} />
        No hay productos disponibles
      </div>
    );
  }

  return null;
};
