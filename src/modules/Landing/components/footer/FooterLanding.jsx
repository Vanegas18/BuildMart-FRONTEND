import { Facebook, Home, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router";
import styles from "./Footer.module.css";
import { memo } from "react";

// Datos estáticos para secciones del footer
const FOOTER_SECTIONS = [
  {
    title: "Productos",
    links: [
      "Casas Prefabricadas",
      "Materiales de Construcción",
      "Acabados",
      "Herramientas",
    ],
  },
  {
    title: "Empresa",
    links: ["Sobre Nosotros", "Proyectos", "Testimonios", "Blog"],
  },
  {
    title: "Legal",
    links: [
      "Términos y Condiciones",
      "Política de Privacidad",
      "Política de Cookies",
      "Aviso Legal",
    ],
  },
];

// Componente de redes sociales extraído para mejorar legibilidad
const SocialLinks = () => (
  <div className={styles.socialContainer}>
    {[
      { icon: Facebook, name: "Facebook" },
      { icon: Instagram, name: "Instagram" },
      { icon: Twitter, name: "Twitter" },
    ].map(({ icon: Icon, name }) => (
      <Link key={name} href="#" className={styles.socialLink}>
        <Icon className={styles.socialIcon} />
        <span className={styles.visuallyHidden}>{name}</span>
      </Link>
    ))}
  </div>
);

// Componente para sección de enlaces
const LinkSection = ({ title, links }) => (
  <div className={styles.column}>
    <h3 className={styles.columnTitle}>{title}</h3>
    <ul className={styles.linkList}>
      {links.map((link) => (
        <li key={link}>
          <Link href="#" className={styles.link}>
            {link}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// Componente principal optimizado con memo para evitar re-renders innecesarios
export const FooterLanding = memo(() => {
  // Calcular el año actual solo cuando se renderiza inicialmente
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Primera columna con logo e información */}
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
            <SocialLinks />
          </div>

          {/* Renderiza las secciones de enlaces dinámicamente */}
          {FOOTER_SECTIONS.map((section) => (
            <LinkSection
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>

        <div className={styles.copyright}>
          <p>&copy; {currentYear} Build Mart. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
});
