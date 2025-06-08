import { Mail, MapPin, Phone, Facebook, Instagram } from "lucide-react";
import React, { memo, useState } from "react";
import styles from "./Contact.module.css";
import { FaWhatsapp } from "react-icons/fa";

// Para WhatsApp, necesitarás instalar react-icons si no lo tienes:
// npm install react-icons
// import { FaWhatsapp } from "react-icons/fa";

// Alternativa usando lucide-react para WhatsApp (si no quieres usar react-icons)
import { MessageCircle as WhatsApp } from "lucide-react";

// Datos estáticos de información de contacto
const CONTACT_INFO = [
  {
    icon: Phone,
    title: "Teléfono",
    details: [
      "Prefabricados Mcv",
      "+57 320 458 0644",
      "Lun-Vie: 8:00 a.m - 06:00 p.m",
    ],
    color: "#3b82f6", // Azul
  },
  {
    icon: Mail,
    title: "Correo Electrónico",
    details: [
      "Prefabricados Mcv",
      "agustin161081@gmail.com",
      "Lun-Vie: 8:00 a.m - 06:00 p.m",
    ],
    color: "#10b981", // Verde
  },
  {
    icon: MapPin,
    title: "¡Visitanos!",
    details: [
      "Calle 46 # 78-340",
      "Vía Machado,Copacabana",
      "Lun-Vie: 8:00 a.m - 06:00 p.m",
    ],
    color: "#f59e0b", // Ámbar
  },
];

// Datos de redes sociales
const SOCIAL_LINKS = [
  {
    icon: Facebook,
    name: "Facebook",
    url: "https://www.facebook.com/prefabricados.mcv/",
    color: "#1877f2",
  },
  {
    icon: Instagram,
    name: "Instagram",
    url: "https://www.instagram.com/prefabricados_mcv?utm_source=ig_web_button_share_sheet",
    color: "#e4405f",
  },
  {
    icon: FaWhatsapp, // o FaWhatsapp si usas react-icons
    name: "WhatsApp",
    url: "https://api.whatsapp.com/send?phone=573204580644&text=Hola%20%F0%9F%A4%97%20estamos%20felices%20de%20tenerte%20aqu%C3%AD.%20Me%20gustar%C3%ADa%20hacer%20una%20cotizaci%C3%B3n%20sobre...",
    color: "#25d366",
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

// Componente de redes sociales
const SocialLinks = memo(() => (
  <div className={styles.socialSection}>
    <h3 className={styles.socialTitle}>Síguenos en nuestras redes</h3>
    <div className={styles.socialContainer}>
      {SOCIAL_LINKS.map(({ icon: Icon, name, url, color }, index) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          style={{ animationDelay: `${(index + 3) * 0.1}s` }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
            e.currentTarget.querySelector(`.${styles.socialIcon}`).style.color =
              color;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.querySelector(`.${styles.socialIcon}`).style.color =
              "";
          }}>
          <Icon className={styles.socialIcon} />
          <span className={styles.socialName}>{name}</span>
        </a>
      ))}
    </div>
  </div>
));

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

        {/* Sección de redes sociales */}
        <SocialLinks />
      </div>
    </section>
  );
});
