import { Button, SidebarTrigger } from "@/shared/components/ui";
import { Bell } from "lucide-react";
import { Link } from "react-router";
import styles from "./styles/HeaderDashboard.module.css";

export const HeaderDashboard = () => {
  return (
    <header className={styles.header}>
      {/* SidebarTrigger envuelve todo el header para control del sidebar */}
      <SidebarTrigger>
        <div className={styles.container}>
          {/* Contenedor para barra de búsqueda - actualmente vacío */}
          <div className={styles.searchContainer}></div>
          {/* Contenedor para acciones/botones */}
          <div className={styles.actionContainer}>
            {/* Botón de notificaciones con badge indicando cantidad */}
            <Button
              variant="outline"
              size="icon"
              className={styles.notificationButton}>
              <Bell className={styles.notificationIcon} />
              {/* Badge con contador de notificaciones */}
              <span className={styles.notificationBadge}>3</span>
            </Button>
            {/* Botón para navegar a la tienda */}
            <Link to="/">
              <Button variant="ghost">Ver tienda</Button>
            </Link>
          </div>
        </div>
      </SidebarTrigger>
    </header>
  );
};
