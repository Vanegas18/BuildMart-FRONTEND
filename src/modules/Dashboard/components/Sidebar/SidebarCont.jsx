import { SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui";
import styles from "./styles/Sidebar.module.css";

export const SidebarCont = ({ nameProcess, icon: Icon, isActive, onClick }) => {
  // Convertir isActive a booleano para asegurar su tipo
  const active = Boolean(isActive);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={`${styles.menuButton} ${
          active ? styles.menuButtonActive : ""
        }`}
        onClick={onClick}>
        {/* Renderiza el componente Icon pasado como prop con clases condicionales */}
        <Icon
          className={`${styles.menuIcon} ${
            active ? styles.menuIconActive : ""
          }`}
        />
        {/* Texto del elemento de menú */}
        <span className={styles.menuText}>{nameProcess}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
