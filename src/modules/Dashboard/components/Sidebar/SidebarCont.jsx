import { SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui";
import styles from "./styles/Sidebar.module.css";
import { useUserPermissions } from "@/core/context/Usuarios/UserPermissionsContext";

export const SidebarCont = ({
  nameProcess,
  process,
  icon: Icon,
  isActive,
  onClick,
}) => {
  // Obtener el hook de permisos
  const { hasMenuAccess } = useUserPermissions();

  // Verificar si el usuario tiene acceso a este elemento del menú
  const hasAccess = hasMenuAccess(process);

  // Si el usuario no tiene acceso, no renderizamos el componente
  if (!hasAccess) return null;

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
