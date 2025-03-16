import { Home } from "lucide-react";
import { Link, NavLink } from "react-router";
import styles from "./Header.module.css";
import { Button } from "@/components";

export const HeaderLanding = () => {
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
          {/* <a href="#projects" className={styles.navLink}>
            Destacados
          </a>
          <a href={"#contact"} className={styles.navLink}>
            Contacto
          </a> */}
          <NavLink
            to="/catalogo"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeNavLink}`
                : styles.navLink
            }>
            Catálogo de productos
          </NavLink>
          <NavLink
            to="/mi-cuenta"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeNavLink}`
                : styles.navLink
            }>
            Mi cuenta
          </NavLink>
        </nav>
        <div className={styles.actionContainer}>
          <div className={styles.buttonContainer}>
            <Link to={"/login"}>
              <Button variant="outline">Iniciar Sesión</Button>
            </Link>
            <Link to={"/register"}>
              <Button className={styles.primaryButton}>Registrarse</Button>
            </Link>
            <Link to={"/dashboard"}>
              <Button variant="dark">DASHBOARD</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
