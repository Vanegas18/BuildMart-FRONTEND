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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import styles from "./styles/Sidebar.module.css";
import { useAuth } from "@/core/context";
import { useState } from "react";

export const SidebarFooterDash = () => {
  const { user, logout } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getInitials = () => {
    if (!user || !user.nombre) return "*";
    const nameParts = user.nombre.split(" ");
    return nameParts.length > 1
      ? `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`
      : user.nombre.substring(0, 2);
  };

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleConfirmLogout = () => {
    logout();
    setIsDialogOpen(false);
  };

  return (
    <SidebarFooter className={styles.footer}>
      <div className={styles.footerContent}>
        <Avatar className={styles.avatar}>
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>

        <div className={styles.userInfo}>
          <p className={styles.userName}>{user.nombre}</p>
          <p className={styles.userEmail}>{user.correo}</p>
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
            <DropdownMenuItem
              onClick={handleOpenDialog}
              className={styles.Link}>
              <LogOut className={styles.menuItemIcon} />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Diálogo de confirmación */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas cerrar tu sesión? Tendrás que volver a
              iniciar sesión para acceder a tu cuenta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmLogout}
              className="bg-red-600 hover:bg-red-700">
              Cerrar Sesión
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarFooter>
  );
};