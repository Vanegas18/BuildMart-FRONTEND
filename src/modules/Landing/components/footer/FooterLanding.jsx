import { ArrowUp, Facebook, Home, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom"; // Corregido a react-router-dom
import styles from "./Footer.module.css";
import { memo, useCallback } from "react";

// Datos estáticos simplificados para secciones del footer con rutas específicas
const FOOTER_SECTIONS = [
  {
    title: "Productos",
    links: ["Placas Prefabricadas", "Materiales"],
    baseRoute: "/catalogo", // Ruta base para enlaces de productos
  },
  {
    title: "Legal",
    links: ["Términos y Condiciones", "Privacidad"],
    baseRoute: "/legal", // Ruta base para enlaces legales
  },
];

// Componente de redes sociales extraído para mejorar legibilidad
const SocialLinks = memo(() => (
  <div className={styles.socialContainer}>
    {[
      { icon: Facebook, name: "Facebook" },
      { icon: Instagram, name: "Instagram" },
      { icon: Twitter, name: "Twitter" },
    ].map(({ icon: Icon, name }) => (
      <Link key={name} to="#" className={styles.socialLink}>
        <Icon className={styles.socialIcon} />
        <span className={styles.visuallyHidden}>{name}</span>
      </Link>
    ))}
  </div>
));

// Componente para sección de enlaces con rutas dinámicas
const LinkSection = memo(({ title, links, baseRoute }) => (
  <div className={styles.column}>
    <h3 className={styles.columnTitle}>{title}</h3>
    <ul className={styles.linkList}>
      {links.map((link) => (
        <li key={link}>
          <Link to={`${baseRoute}`} className={styles.link}>
            {link}
          </Link>
        </li>
      ))}
    </ul>
  </div>
));

// Botón de regreso arriba
const BackToTopButton = memo(() => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <button
      className={styles.backToTop}
      onClick={scrollToTop}
      aria-label="Volver arriba">
      <ArrowUp className={styles.backToTopIcon} />
    </button>
  );
});

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
              construcción de alta calidad. Descubre nuestras soluciones
              innovadoras.
            </p>
            <SocialLinks />
          </div>

          {/* Renderiza las secciones de enlaces dinámicamente */}
          {FOOTER_SECTIONS.map((section) => (
            <LinkSection
              key={section.title}
              title={section.title}
              links={section.links}
              baseRoute={section.baseRoute}
            />
          ))}
        </div>

        <div className={styles.copyright}>
          <p>&copy; {currentYear} Build Mart. Todos los derechos reservados. <br /> Equipo de Desarrollo: Juan José Vanegas, David Gustavo Moncada y Miguel Alejandro Urango.</p>
        </div>

        {/* Botón para volver arriba */}
        <BackToTopButton />
      </div>
    </footer>
  );
});

// Asegura que el nombre se mantenga cuando se utilice memo
FooterLanding.displayName = "FooterLanding";