import { Home } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../ui";
import styles from "./Header.module.css";

export const Header = () => {
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
          <a href="#" className={styles.navLink}>
            Inicio
          </a>
          <a href="#projects" className={styles.navLink}>
            Destacados
          </a>
          <a href={"#contact"} className={styles.navLink}>
            Contacto
          </a>
          <Link to={"/"} className={styles.navLink}>
            Catálogo
          </Link>
        </nav>
        <div className={styles.actionContainer}>
          <div className={styles.buttonContainer}>
            <Button variant="outline">Iniciar Sesión</Button>
            <Button className={styles.primaryButton}>Registrarse</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
