import { Home } from "lucide-react";
import { Link, NavLink } from "react-router";
import styles from "./Header.module.css";
import { Button } from "@/components";
import { useAuth } from "@/context/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export const HeaderLanding = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();

  const isAdmin = user?.rol === "67cb9a4fa5866273d8830fad";

  // Abre el diálogo de confirmación
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  // Ejecuta el cierre de sesión cuando se confirma
  const handleConfirmLogout = () => {
    logout();
    setIsDialogOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Home className={styles.logo} />
          <span className={styles.logoText}>
            Build<span className={styles.logoHighlight}>Mart</span>
          </span>
        </div>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeNavLink}`
                : styles.navLink
            }>
            Inicio
          </NavLink>
          <NavLink
            to="/catalogo"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeNavLink}`
                : styles.navLink
            }>
            Catálogo de productos
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/mi-cuenta"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.activeNavLink}`
                  : styles.navLink
              }>
              Mi cuenta
            </NavLink>
          )}
        </nav>
        <div className={styles.actionContainer}>
          <div className={styles.buttonContainer}>
            {!isAuthenticated ? (
              <>
                <Link to={"/login"}>
                  <Button variant="outline">Iniciar Sesión</Button>
                </Link>
                <Link to={"/register"}>
                  <Button className={styles.primaryButton}>Registrarse</Button>
                </Link>
              </>
            ) : (
              <>
                {isAdmin && (
                  <Link to={"/dashboard"}>
                    <Button variant="dark">DASHBOARD</Button>
                  </Link>
                )}
                <Button variant="outline" onClick={handleOpenDialog}>
                  Cerrar Sesion
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* AlertDialog fuera del return, pero dentro del componente */}
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
    </header>
  );
};
