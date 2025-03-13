import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import styles from "./styles/ContentDashboard.module.css";
import { FormateoPrecio } from "../../layout";

export const ProductsDashboard = ({ title, description, products }) => {
  const getStockClass = (stock) => {
    if (stock <= 3) {
      return styles.demandHigh; // Reutilizamos las clases existentes
    } else if (stock <= 7) {
      return styles.demandMedium;
    } else {
      return styles.demandLow;
    }
  };

  const getStockText = (stock) => {
    if (stock <= 3) {
      return "Crítico";
    } else if (stock <= 7) {
      return "Bajo";
    } else {
      return "Aceptable";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={styles.itemsContainer}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className={styles.itemRow}>
                <div>
                  <p className={styles.itemTitle}>{product.nombre}</p>
                  <p className={styles.itemSubtitle}>Stock: {product.stock}</p>
                </div>
                <div className="text-right">
                  <p className={styles.itemValue}>
                    ${FormateoPrecio(product.precio)}
                  </p>
                  <span
                    className={`${styles.statusBadge} ${getStockClass(
                      product.stock
                    )}`}>
                    {getStockText(product.stock)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noItemsMessage}>
              No hay productos con bajo stock
            </p>
          )}
          <Link to={"productos"}>
            <Button variant="outline" className={styles.fullWidthButton}>
              Administrar inventario
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
