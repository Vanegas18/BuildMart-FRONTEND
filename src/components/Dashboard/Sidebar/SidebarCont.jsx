import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui";
import styles from "./styles/Sidebar.module.css";

export const SidebarCont = ({ nameProcess, icon: Icon, isActive, onClick }) => {
  const active = Boolean(isActive);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={`${styles.menuButton} ${
          active ? styles.menuButtonActive : ""
        }`}
        onClick={onClick}>
        <Icon
          className={`${styles.menuIcon} ${
            active ? styles.menuIconActive : ""
          }`}
        />
        <span className={styles.menuText}>{nameProcess}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
