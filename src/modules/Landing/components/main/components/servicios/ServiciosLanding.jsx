import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/components";
import { ArrowRight } from "lucide-react";
import styles from "./Products.module.css";

export const ServiciosLanding = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Memorizamos los datos de los servicios para evitar recrearlos en cada renderizado
  const servicios = useMemo(
    () => [
      {
        id: 6,
        title: "Casas Prefabricadas",
        description:
          "Diseños modernos, eficientes y personalizables con construcción rápida y sostenible.",
        image: "/images/imgHouseProduct.jpg",
        alt: "Casas prefabricadas",
        buttonText: "Ver modelos",
        link: "/catalogo/casas",
        icon: "🏠",
      },
      {
        id: 7,
        title: "Materiales de Construcción",
        description:
          "Amplio catálogo de materiales de primera calidad para todos tus proyectos constructivos.",
        image: "/images/toolsProduct.jpg",
        alt: "Materiales de construcción",
        buttonText: "Ver catálogo",
        link: "/catalogo/materiales",
        icon: "🛠️",
      },
    ],
    []
  ); // Array vacío porque los datos son estáticos

  return (
    <section id="productos" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerContent}>
            <div className={styles.tagBadge}>Nuestros Servicios</div>
            <h2 className={styles.headerTitle}>
              Soluciones <span className={styles.highlight}>integrales</span>{" "}
              para construcción.
            </h2>
            <p className={styles.headerDescription}>
              Desde retoques decorativos hasta construcciones completas,
              ofrecemos servicios especializados con materiales de primera
              calidad y técnicas avanzadas para hacer realidad tus proyectos.
            </p>
            <div className={styles.headerDivider}></div>
          </div>
        </div>

        <div className={styles.productsGrid}>
          {servicios.map((servicio) => (
            <div
              key={servicio.id}
              className={`${styles.productCard} ${
                hoveredCard === servicio.id ? styles.cardHovered : ""
              }`}
              onMouseEnter={() => setHoveredCard(servicio.id)}
              onMouseLeave={() => setHoveredCard(null)}>
              <div className={styles.cardOverlay}></div>
              <div className={styles.iconBadge}>{servicio.icon}</div>
              <img
                src={servicio.image}
                alt={servicio.alt}
                width={800}
                height={600}
                className={styles.productImage}
                loading={servicio.id === 1 ? "eager" : "lazy"}
              />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{servicio.title}</h3>
                <p className={styles.cardDescription}>{servicio.description}</p>
                <Link to={servicio.link}>
                  <Button className={styles.cardButton}>
                    {servicio.buttonText}
                    <ArrowRight className={styles.buttonIcon} />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Exportamos con memo para prevenir renderizados innecesarios
export default React.memo(ServiciosLanding);
