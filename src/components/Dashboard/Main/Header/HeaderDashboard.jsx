import { Button, SidebarTrigger } from "@/components/ui";
import { Bell } from "lucide-react";
import { Link } from "react-router";
import styles from "./styles/HeaderDashboard.module.css";

export const HeaderDashboard = () => {
  return (
    <header className={styles.header}>
      <SidebarTrigger>
        <div className={styles.container}>
          <div className={styles.searchContainer}></div>
          <div className={styles.actionContainer}>
            <Button
              variant="outline"
              size="icon"
              className={styles.notificationButton}>
              <Bell className={styles.notificationIcon} />
              <span className={styles.notificationBadge}>3</span>
            </Button>
            <Link to="/">
              <Button variant="ghost">Ver tienda</Button>
            </Link>
          </div>
        </div>
      </SidebarTrigger>
    </header>
  );
};
