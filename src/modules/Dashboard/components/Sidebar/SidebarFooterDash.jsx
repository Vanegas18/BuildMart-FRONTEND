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

export const SidebarFooterDash = () => {
  // Constantes para datos estáticos que pueden extraerse
  const userData = {
    name: "Admin User",
    email: "admin@buildmart.com",
    avatar: "/placeholder.svg?height=36&width=36",
    initials: "AU",
  };

  return (
    <SidebarFooter className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Avatar del usuario */}
        <Avatar className={styles.avatar}>
          <AvatarImage src={userData.avatar} alt="Avatar" />
          <AvatarFallback>{userData.initials}</AvatarFallback>
        </Avatar>

        {/* Información del usuario */}
        <div className={styles.userInfo}>
          <p className={styles.userName}>{userData.name}</p>
          <p className={styles.userEmail}>{userData.email}</p>
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
                <Settings className={styles.menuItemIcon} />
                <span>Mi perfil</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link to="/">
              <DropdownMenuItem className={styles.Link}>
                <LogOut className={styles.menuItemIcon} />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SidebarFooter>
  );
};
