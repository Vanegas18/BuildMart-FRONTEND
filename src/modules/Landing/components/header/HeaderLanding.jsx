import { Home, Loader, Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, checkAuthStatus, loading } = useAuth();

  // Efecto para verificar si el usuario es admin
  useEffect(() => {
    // Verifica si el usuario es admin
    const verifyAdmin = async () => {
      if (isAuthenticated && (!user || !user.rol)) {
        await checkAuthStatus();
      }
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

  // Toggle para el menú móvil
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/">
          <div className={styles.logoContainer}>
            <Home className={styles.logo} />
            <span className={styles.logoText}>
              Build<span className={styles.logoHighlight}>Mart</span>
            </span>
          </div>
        </Link>

        {/* Navegación - escritorio */}
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
          {isAuthenticated && !isAdmin && (
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

        {/* Botones de acción */}
        <div className={styles.actionContainer}>
          {/* Botón de menú móvil */}
          <div className="block md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {/* Botones en escritorio */}
          <div className={`${styles.buttonContainer} hidden md:flex`}>
            {loading ? (
              <div className={styles.loadingState}>
                <Loader className="animate-spin" size={24} />
              </div>
            ) : !isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="outline">Iniciar Sesión</Button>
                </Link>
                <Link to="/register">
                  <Button className={styles.primaryButton}>Registrarse</Button>
                </Link>
              </>
            ) : (
              <>
                {isAdmin && (
                  <Link to="/dashboard">
                    <Button variant="dark">DASHBOARD</Button>
                  </Link>
                )}
                <Button variant="outline" onClick={handleOpenDialog}>
                  Cerrar Sesión
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeNavLink}`
                : styles.navLink
            }
            onClick={() => setIsMobileMenuOpen(false)}>
            Inicio
          </NavLink>
          <NavLink
            to="/catalogo"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeNavLink}`
                : styles.navLink
            }
            onClick={() => setIsMobileMenuOpen(false)}>
            Catálogo de productos
          </NavLink>
          {isAuthenticated && !isAdmin && (
            <NavLink
              to="/mi-cuenta"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.activeNavLink}`
                  : styles.navLink
              }
              onClick={() => setIsMobileMenuOpen(false)}>
              Mi cuenta
            </NavLink>
          )}

          <div className={styles.buttonContainer}>
            {loading ? (
              <div className={styles.loadingState}>
                <Loader className="animate-spin" size={24} />
              </div>
            ) : !isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className={`${styles.primaryButton} w-full`}>
                    Registrarse
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {isAdmin && (
                  <Link to="/dashboard" className="w-full">
                    <Button variant="dark" className="w-full">
                      DASHBOARD
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  onClick={handleOpenDialog}
                  className="w-full">
                  Cerrar Sesión
                </Button>
              </>
            )}
          </div>
        </div>
      )}

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
    </header>
  );
};
