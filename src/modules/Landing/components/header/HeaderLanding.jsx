import { Home } from "lucide-react";
import { Link, NavLink } from "react-router";
import styles from "./Header.module.css";
import { Button } from "@/shared/components";
import { useAuth } from "@/core/context/Acceso/AuthContext";
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
import { useEffect, useState } from "react";

export const HeaderLanding = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, isAuthenticated, logout, checkAuthStatus } = useAuth();

  // Efecto para verificar si el usuario es admin cada vez que cambie user o isAuthenticated
  useEffect(() => {
    const verifyAdmin = async () => {
      // Si el usuario está autenticado pero no tenemos datos completos, refrescamos
      if (isAuthenticated && (!user || !user.rol)) {
        await checkAuthStatus();
      }
      // Verificamos si es admin
      setIsAdmin(user?.rol === "67cb9a4fa5866273d8830fad");
    };

    verifyAdmin();
  }, [user, isAuthenticated, checkAuthStatus]);

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
