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

export const ProductsDashboard = ({ title, description, products = [] }) => {
  const getDemandClass = (sales) => {
    if (sales > 30) {
      return styles.demandHigh;
    } else if (sales > 20) {
      return styles.demandMedium;
    } else {
      return styles.demandLow;
    }
  };

  const getDemandText = (sales) => {
    if (sales > 30) {
      return "Alta demanda";
    } else if (sales > 20) {
      return "Demanda media";
    } else {
      return "Baja demanda";
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
          {products.map((product, index) => (
            <div key={index} className={styles.itemRow}>
              <div>
                <p className={styles.itemTitle}>{product.name}</p>
                <p className={styles.itemSubtitle}>Ventas: {product.sales}</p>
              </div>
              <div className="text-right">
                <p className={styles.itemValue}>{product.revenue}</p>
                <span
                  className={`${styles.statusBadge} ${getDemandClass(
                    product.sales
                  )}`}>
                  {getDemandText(product.sales)}
                </span>
              </div>
            </div>
          ))}
          <Link to={"productos"}>
            <Button variant="outline" className={styles.fullWidthButton}>
              Ver todos los productos
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
