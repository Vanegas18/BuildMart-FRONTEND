import { Button } from "@/shared/components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import styles from "./styles/CategoriesMain.module.css";

export const CategoriesMain = ({ data }) => {
  return (
    <div className={styles.container}>
      {data.map((item, i) => (
        <Card key={i} className={styles.card}>
          <CardHeader className={styles.cardHeader}>
            <CardTitle className={styles.cardTitle}>{item.name}</CardTitle>
            <item.icon className={styles.icon} />
          </CardHeader>
          <CardContent className={styles.cardContent}>
            <div className={styles.contentWrapper}>
              <div>
                <p className={styles.countValue}>{item.count}</p>
                <p className={styles.countLabel}>Productos</p>
              </div>
              <div className={styles.buttonGroup}>
                <Button variant="outline" size="">
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size=""
                  className={styles.deleteButton}>
                  Desactivar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
