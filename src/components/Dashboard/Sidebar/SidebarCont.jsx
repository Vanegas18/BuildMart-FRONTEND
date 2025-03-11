import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui";

export const SidebarCont = ({
  nameProcess,
  icon: Icon,
  isActive,
  onClick,
  styles,
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={`${styles.menuButton} ${
          isActive ? styles.menuButtonActive : ""
        }`}
        onClick={onClick}>
        <Icon
          className={`${styles.menuIcon} ${
            isActive ? styles.menuIconActive : ""
          }`}
        />
        <span className={styles.menuText}>{nameProcess}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
