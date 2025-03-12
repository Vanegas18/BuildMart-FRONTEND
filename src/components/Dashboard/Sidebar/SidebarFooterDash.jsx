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
} from "@/components/ui";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { Link } from "react-router";
import styles from "./styles/Sidebar.module.css";

export const SidebarFooterDash = () => {
  return (
    <SidebarFooter className={styles.footer}>
      <div className={styles.footerContent}>
        <Avatar className={styles.avatar}>
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>AU</AvatarFallback>
        </Avatar>

        <div className={styles.userInfo}>
          <p className={styles.userName}>Admin User</p>
          <p className={styles.userEmail}>admin@buildmart.com</p>
        </div>

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
