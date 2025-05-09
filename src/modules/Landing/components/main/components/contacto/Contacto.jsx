import { Mail, MapPin, Phone } from "lucide-react";
import React, { memo, useState } from "react";
import styles from "./Contact.module.css";

// Datos estáticos de información de contacto
const CONTACT_INFO = [
  {
    icon: Phone,
    title: "Teléfono",
    details: ["+34 912 345 678", "Lun-Vie: 9:00 - 18:00"],
    color: "#3b82f6", // Azul
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@buildmart.com", "ventas@buildmart.com"],
    color: "#10b981", // Verde
  },
  {
    icon: MapPin,
    title: "Dirección",
    details: ["Calle Construcción, 123", "28001 Madrid, España"],
    color: "#f59e0b", // Ámbar
  },
];

// Componente para el encabezado de la sección
const SectionHeader = memo(() => (
  <div className={styles.headerWrapper}>
    <div className={styles.headerContent}>
      <div className={styles.tagBadge}>Contacto</div>
      <h2 className={styles.headerTitle}>
        Estamos aquí para <span className={styles.highlight}>ayudarte</span>
      </h2>
      <p className={styles.headerDescription}>
        Ponte en contacto con nosotros para cualquier consulta o para solicitar
        información adicional sobre nuestros productos y servicios.
      </p>
      <div className={styles.headerDivider}></div>
    </div>
  </div>
));

// Componente para la tarjeta de contacto
const ContactCard = memo(({ icon: Icon, title, details, color, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.contactCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}>
      <div
        className={styles.iconContainer}
        style={{ backgroundColor: `${color}15` }}>
        <Icon className={styles.icon} style={{ color }} />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      {details.map((detail, index) => (
        <p key={index} className={styles.cardText}>
          {detail}
        </p>
      ))}
      <div
        className={styles.cardDecoration}
        style={{ backgroundColor: color }}></div>
    </div>
  );
});

// Componente principal optimizado
export const Contacto = memo(() => {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        {/* Componente de encabezado mejorado */}
        <SectionHeader />

        {/* Grid de tarjetas de contacto con renderizado dinámico */}
        <div className={styles.contactGrid}>
          {CONTACT_INFO.map((contact, index) => (
            <ContactCard
              key={index}
              icon={contact.icon}
              title={contact.title}
              details={contact.details}
              color={contact.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
