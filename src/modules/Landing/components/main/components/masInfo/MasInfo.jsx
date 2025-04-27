import { ChevronRight, MessageCircle, Book } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/shared/components";
import styles from "./Cta.module.css";
import { memo, useState } from "react";

// Componente para el encabezado de la sección
const SectionHeader = memo(() => (
  <div className={styles.headerWrapper}>
    <div className={styles.headerContent}>
      <div className={styles.tagBadge}>Contáctanos</div>
      <h2 className={styles.headerTitle}>
        ¿Listo para comenzar{" "}
        <span className={styles.highlight}>tu proyecto</span>?
      </h2>
      <p className={styles.headerDescription}>
        Contacta con nosotros hoy mismo y te ayudaremos a hacer realidad el
        hogar de tus sueños.
      </p>
      <div className={styles.headerDivider}></div>
    </div>
  </div>
));

// Componente para los botones con animación
const ActionButton = memo(({ to, external, variant, children, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  const ButtonContent = (
    <Button
      size="lg"
      variant={variant}
      className={`${styles.actionButton} ${
        isHovered ? styles.buttonHovered : ""
      } ${variant === "outline" ? styles.outlineButton : styles.primaryButton}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <span>{children}</span>
      {Icon && (
        <div className={styles.iconWrapper}>
          <Icon className={styles.buttonIcon} />
        </div>
      )}
    </Button>
  );

  if (external) {
    return (
      <Link to={to} target="_blank" rel="noopener noreferrer">
        {ButtonContent}
      </Link>
    );
  }

  return <Link to={to}>{ButtonContent}</Link>;
});

export const MasInfo = memo(() => {
  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.container}>
        {/* Componente de encabezado */}
        <SectionHeader />

        <div className={styles.ctaContainer}>
          <ActionButton
            to="https://web.whatsapp.com/"
            external={true}
            variant="primary"
            icon={MessageCircle}>
            Solicitar presupuesto
          </ActionButton>

          <ActionButton
            to="/catalogo"
            external={false}
            variant="outline"
            icon={Book}>
            Ver catálogo
          </ActionButton>
        </div>
      </div>
    </section>
  );
});
