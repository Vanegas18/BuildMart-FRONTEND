import { Facebook, Home, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router";
import styles from "./Footer.module.css";

export const FooterLanding = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <div className={styles.logoContainer}>
              <Home className={styles.logo} />
              <span className={styles.title}>
                Build<span className={styles.highlight}>Mart</span>
              </span>
            </div>
            <p className={styles.description}>
              Tu socio de confianza para casas prefabricadas y materiales de
              construcción de alta calidad.
            </p>
            <div className={styles.socialContainer}>
              <Link href="#" className={styles.socialLink}>
                <Facebook className={styles.socialIcon} />
                <span className={styles.visuallyHidden}>Facebook</span>
              </Link>
              <Link href="#" className={styles.socialLink}>
                <Instagram className={styles.socialIcon} />
                <span className={styles.visuallyHidden}>Instagram</span>
              </Link>
              <Link href="#" className={styles.socialLink}>
                <Twitter className={styles.socialIcon} />
                <span className={styles.visuallyHidden}>Twitter</span>
              </Link>
            </div>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Productos</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="#" className={styles.link}>
                  Casas Prefabricadas
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.link}>
                  Materiales de Construcción
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.link}>
                  Acabados
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.link}>
                  Herramientas
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Empresa</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="#" className={styles.link}>
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.link}>
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.link}>
                  Testimonios
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.link}>
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Legal</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="#" className={styles.link}>
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.link}>
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.link}>
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.link}>
                  Aviso Legal
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>
            &copy; {new Date().getFullYear()} Build Mart. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
