import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import styles from "./styles/MainContent.module.css";

export const MainCont = ({ title, icon: Icon, quantity, info }) => {
  return (
    <Card>
      <CardHeader className={styles.cardHeader}>
        {/* Título de la tarjeta con el icono a la derecha */}
        <CardTitle className={styles.cardTitle}>{title}</CardTitle>
        {/* Uso del componente Icon pasado como prop */}
        <Icon className={styles.cardIcon} />
      </CardHeader>
      <CardContent>
        {/* Valor principal de la tarjeta */}
        <div className={styles.quantityText}>{quantity}</div>
        {/* Texto informativo con un ícono de flecha hacia arriba */}
        <p className={styles.infoText}>
          {/* Usando clase de Lucide para el ícono de flecha */}
          <span className="i-lucide-arrow-up mr-1"></span>
          {info}
        </p>
      </CardContent>
    </Card>
  );
};
