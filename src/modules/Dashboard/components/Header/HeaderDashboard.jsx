import { Button, SidebarTrigger } from "@/shared/components/ui";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
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
            {/* Botón para navegar a la tienda */}
            <Link to="/">
              <Button className="hover:bg-blue-100" variant="ghost">Ir a la tienda</Button>
            </Link>
          </div>
        </div>
      </SidebarTrigger>
    </header>
  );
};
