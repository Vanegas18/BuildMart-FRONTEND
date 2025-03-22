import { Clock, Home, Ruler, Shield, Truck, Warehouse } from "lucide-react";
import styles from "./Benefits.module.css";
import { memo } from "react";

// Datos estáticos para los beneficios
const BENEFITS_DATA = [
  {
    icon: Clock,
    title: "Entrega Rápida",
    description:
      "Cumplimos con los plazos de entrega para que puedas disfrutar de tu hogar lo antes posible.",
  },
  {
    icon: Shield,
    title: "Garantía de Calidad",
    description:
      "Todos nuestros productos cuentan con garantía y están fabricados con los mejores materiales.",
  },
  {
    icon: Ruler,
    title: "Diseño Personalizado",
    description:
      "Adaptamos nuestros modelos a tus necesidades específicas y preferencias de diseño.",
  },
  {
    icon: Truck,
    title: "Envío a Domicilio",
    description:
      "Entregamos todos los materiales directamente en el lugar de tu proyecto.",
  },
  {
    icon: Warehouse,
    title: "Amplio Inventario",
    description:
      "Disponemos de una gran variedad de productos para satisfacer todas tus necesidades.",
  },
  {
    icon: Home,
    title: "Eficiencia Energética",
    description:
      "Nuestras casas están diseñadas para maximizar la eficiencia energética y reducir costos.",
  },
];

// Componente para la tarjeta de beneficio
const BenefitCard = memo(({ icon: Icon, title, description }) => (
  <div className={styles.benefitCard}>
    <Icon className={styles.benefitIcon} />
    <h3 className={styles.benefitTitle}>{title}</h3>
    <p className={styles.benefitDescription}>{description}</p>
  </div>
));

// Componente para el encabezado de la sección
const SectionHeader = memo(() => (
  <div className={styles.headerWrapper}>
    <div>
      <div className={styles.tagBadge}>Beneficios</div>
      <h2 className={styles.headerTitle}>¿Por qué elegir Build Mart?</h2>
      <p className={styles.headerDescription}>
        Nos destacamos por ofrecer productos de calidad y un servicio
        excepcional a nuestros clientes.
      </p>
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
            />
          ))}
        </div>
      </div>
    </section>
  );
});
