import { Clock, Home, Ruler, Shield, Truck, Warehouse } from "lucide-react";
import styles from "./Benefits.module.css";
import { memo, useState } from "react";

// Datos estáticos para los beneficios
const BENEFITS_DATA = [
  {
    icon: Clock,
    title: "Entrega Rápida",
    description:
      "Cumplimos con los plazos de entrega para que puedas disfrutar de tu hogar lo antes posible.",
    color: "#3b82f6", // Azul
  },
  {
    icon: Shield,
    title: "Garantía de Calidad",
    description:
      "Todos nuestros productos cuentan con garantía y están fabricados con los mejores materiales.",
    color: "#10b981", // Verde
  },
  {
    icon: Ruler,
    title: "Diseño Personalizado",
    description:
      "Adaptamos nuestros modelos a tus necesidades específicas y preferencias de diseño.",
    color: "#f59e0b", // Ámbar
  },
  {
    icon: Truck,
    title: "Envío a Domicilio",
    description:
      "Entregamos todos los materiales directamente en el lugar de tu proyecto.",
    color: "#6366f1", // Índigo
  },
  {
    icon: Warehouse,
    title: "Amplio Inventario",
    description:
      "Disponemos de una gran variedad de productos para satisfacer todas tus necesidades.",
    color: "#ec4899", // Rosa
  },
  {
    icon: Home,
    title: "Eficiencia Energética",
    description:
      "Nuestras casas están diseñadas para maximizar la eficiencia energética y reducir costos.",
    color: "#8b5cf6", // Violeta
  },
];

// Componente para la tarjeta de beneficio mejorada
const BenefitCard = memo(({ icon: Icon, title, description, color, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${styles.benefitCard} ${isHovered ? styles.cardHovered : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}>
      <div
        className={styles.iconContainer}
        style={{ backgroundColor: `${color}15` }}>
        <Icon className={styles.benefitIcon} style={{ color }} />
      </div>
      <h3 className={styles.benefitTitle}>{title}</h3>
      <p className={styles.benefitDescription}>{description}</p>
      <div
        className={styles.cardDecoration}
        style={{ backgroundColor: color }}></div>
    </div>
  );
});

// Componente para el encabezado de la sección
const SectionHeader = memo(() => (
  <div className={styles.headerWrapper}>
    <div className={styles.headerContent}>
      <div className={styles.tagBadge}>Beneficios</div>
      <h2 className={styles.headerTitle}>
        ¿Por qué elegir <span className={styles.highlight}>Build Mart</span>?
      </h2>
      <p className={styles.headerDescription}>
        Nos destacamos por ofrecer productos de calidad y un servicio
        excepcional a nuestros clientes.
      </p>
      <div className={styles.headerDivider}></div>
    </div>
  </div>
));

// Componente principal optimizado
export const BeneficiosLanding = memo(() => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Componente de encabezado extraído */}
        <SectionHeader />

        {/* Grid de beneficios con renderizado dinámico */}
        <div className={styles.benefitsGrid}>
          {BENEFITS_DATA.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              color={benefit.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
