import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarFooter,
} from "@/shared/components/ui";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { Link } from "react-router";
import styles from "./styles/Sidebar.module.css";
import { useAuth } from "@/core/context";

export const SidebarFooterDash = () => {
  const { user } = useAuth();

  // Obtener iniciales para el AvatarFallback
  const getInitials = () => {
    if (!user || !user.nombre) return "*"; // Fallback por defecto

    // Si tienes solo el nombre completo
    const nameParts = user.nombre.split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`;
    }

    return user.nombre.substring(0, 2);
  };

  return (
    <SidebarFooter className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Avatar del usuario */}
        <Avatar className={styles.avatar}>
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>

        {/* Información del usuario */}
        <div className={styles.userInfo}>
          <p className={styles.userName}>{user.nombre}</p>
          <p className={styles.userEmail}>{user.correo}</p>
        </div>

        {/* Menú desplegable */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={styles.dropdownButton}>
              <ChevronDown className={styles.dropdownIcon} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link to="/">
              <DropdownMenuItem className={styles.Link}>
                <LogOut className={styles.menuItemIcon} />
                <span>Ver tienda</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SidebarFooter>
  );
};
