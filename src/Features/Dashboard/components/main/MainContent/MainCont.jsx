import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styles from "./styles/MainContent.module.css";

export const MainCont = ({ tittle, icon: Icon, quantity, info }) => {
  return (
    <Card>
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitle}>{tittle}</CardTitle>
        <Icon className={styles.cardIcon} />
      </CardHeader>
      <CardContent>
        <div className={styles.quantityText}>{quantity}</div>
        <p className={styles.infoText}>
          <span className="i-lucide-arrow-up mr-1"></span>
          {info}
        </p>
      </CardContent>
    </Card>
  );
};
