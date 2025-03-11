import { Home } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Button } from "../../ui";
import styles from "./Header.module.css";

export const Header = () => {
  const location = useLocation();

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
          <Link to={"/"} className={styles.navLink}>
            Inicio
          </Link>
          {location.pathname === "/" && (
            <>
              <a href="#projects" className={styles.navLink}>
                Destacados
              </a>
              <a href={"#contact"} className={styles.navLink}>
                Contacto
              </a>
            </>
          )}
          <Link to={"/catalogo"} className={styles.navLink}>
            Catálogo de productos
          </Link>
        </nav>
        <div className={styles.actionContainer}>
          <div className={styles.buttonContainer}>
            <Link to={"/login"}>
              <Button variant="outline">Iniciar Sesión</Button>
            </Link>
            <Link to={"/register"}>
              <Button className={styles.primaryButton}>Registrarse</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
