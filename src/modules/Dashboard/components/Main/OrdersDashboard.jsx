import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router";
import styles from "./styles/ContentDashboard.module.css";

export const OrdersDashboard = ({ title, description, orders = [] }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Completado":
        return styles.statusCompleted;
      case "Procesando":
        return styles.statusProcessing;
      case "Pendiente":
        return styles.statusPending;
      default:
        return styles.statusOther;
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
          {orders.map((order) => (
            <div key={order.id} className={styles.itemRow}>
              <div>
                <p className={styles.itemTitle}>{order.id}</p>
                <p className={styles.itemSubtitle}>{order.customer}</p>
              </div>
              <div className="text-right">
                <p className={styles.itemValue}>{order.amount}</p>
                <span
                  className={`${styles.statusBadge} ${getStatusClass(
                    order.status
                  )}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
          <Link to={"/pedidos"}>
            <Button variant="outline" className={styles.fullWidthButton}>
              Ver todos los pedidos
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
