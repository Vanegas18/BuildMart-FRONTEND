import { Mail, MapPin, Phone } from "lucide-react";
import React, { memo } from "react";
import styles from "./Contact.module.css";

// Datos estáticos de información de contacto
const CONTACT_INFO = [
  {
    icon: Phone,
    title: "Teléfono",
    details: ["+34 912 345 678", "Lun-Vie: 9:00 - 18:00"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@buildmart.com", "ventas@buildmart.com"],
  },
  {
    icon: MapPin,
    title: "Dirección",
    details: ["Calle Construcción, 123", "28001 Madrid, España"],
  },
];

// Componente para el encabezado de la sección
const ContactTitle = memo(() => (
  <div className={styles.titleContainer}>
    <div className={styles.titleContent}>
      <h2 className={styles.title}>Estamos aquí para ayudarte</h2>
      <p className={styles.description}>
        Ponte en contacto con nosotros para cualquier consulta o para solicitar
        información adicional.
      </p>
    </div>
  </div>
));

// Componente para la tarjeta de contacto
const ContactCard = memo(({ icon: Icon, title, details }) => (
  <div className={styles.contactCard}>
    <Icon className={styles.icon} />
    <h3 className={styles.cardTitle}>{title}</h3>
    {details.map((detail, index) => (
      <p key={index} className={styles.cardText}>
        {detail}
      </p>
    ))}
  </div>
));

// Componente principal optimizado
export const Contacto = memo(() => {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        {/* Componente de título extraído */}
        <ContactTitle />

        {/* Grid de tarjetas de contacto con renderizado dinámico */}
        <div className={styles.contactGrid}>
          {CONTACT_INFO.map((contact, index) => (
            <ContactCard
              key={index}
              icon={contact.icon}
              title={contact.title}
              details={contact.details}
            />
          ))}
        </div>
      </div>
    </section>
  );
});