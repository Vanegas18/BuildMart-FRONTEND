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
import { useCallback, useEffect, useMemo, memo, useState } from "react";

// ID constante para el rol de administrador
const ADMIN_ROLE_ID = "67cb9a4fa5866273d8830fad";

// Componente optimizado para los elementos de navegación
const NavigationLinks = memo(({ isAuthenticated }) => (
  <nav className={styles.nav}>
    {[
      { to: "/", label: "Inicio" },
      { to: "/catalogo", label: "Catálogo de productos" },
      // Elemento condicional para usuarios autenticados
      ...(isAuthenticated ? [{ to: "/mi-cuenta", label: "Mi cuenta" }] : []),
    ].map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          isActive
            ? `${styles.navLink} ${styles.activeNavLink}`
            : styles.navLink
        }>
        {label}
      </NavLink>
    ))}
  </nav>
));

// Componente optimizado para los botones de acción
const ActionButtons = memo(({ isAuthenticated, isAdmin, onLogoutClick }) => (
  <div className={styles.actionContainer}>
    <div className={styles.buttonContainer}>
      {!isAuthenticated ? (
        // Botones para usuarios no autenticados
        <>
          <Link to={"/login"}>
            <Button variant="outline">Iniciar Sesión</Button>
          </Link>
          <Link to={"/register"}>
            <Button className={styles.primaryButton}>Registrarse</Button>
          </Link>
        </>
      ) : (
        // Botones para usuarios autenticados
        <>
          {isAdmin && (
            <Link to={"/dashboard"}>
              <Button variant="dark">DASHBOARD</Button>
            </Link>
          )}
          <Button variant="outline" onClick={onLogoutClick}>
            Cerrar Sesion
          </Button>
        </>
      )}
    </div>
  </div>
));

// Componente de logo extraído
const Logo = memo(() => (
  <div className={styles.logoContainer}>
    <Home className={styles.logo} />
    <span className={styles.logoText}>
      Build<span className={styles.logoHighlight}>Mart</span>
    </span>
  </div>
));

// Componente principal del header optimizado
export const HeaderLanding = memo(() => {
  // Destructure solo los valores necesarios del contexto
  const { user, isAuthenticated, logout, checkAuthStatus } = useAuth();

  // Estado para el diálogo de confirmación
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Usar useMemo para evitar recalcular si es admin en cada render
  const isAdmin = useMemo(() => {
    return user?.rol === ADMIN_ROLE_ID;
  }, [user?.rol]);

  // Verificar si el usuario es admin cuando cambian sus datos
  useEffect(() => {
    // Definición asíncrona dentro del efecto para evitar useEffect con async directamente
    const verifyAuth = async () => {
      // Solo recargamos datos si está autenticado pero faltan detalles del usuario
      if (isAuthenticated && (!user || !user.rol)) {
        await checkAuthStatus();
      }
    };

    verifyAuth();
    // Dependencias reducidas al mínimo necesario
  }, [isAuthenticated, user, checkAuthStatus]);

  // Callbacks memorizados para funciones de evento
  const handleOpenDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleConfirmLogout = useCallback(() => {
    logout();
    setIsDialogOpen(false);
  }, [logout]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />

        {/* Componentes memorizados para evitar re-renders innecesarios */}
        <NavigationLinks isAuthenticated={isAuthenticated} />

        <ActionButtons
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          onLogoutClick={handleOpenDialog}
        />
      </div>

      {/* Diálogo de confirmación para cerrar sesión */}
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
});
