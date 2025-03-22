import React, { useMemo } from "react";
import { Link } from "react-router";
import { Button } from "@/shared/components";
import styles from "./Products.module.css";

export const ServiciosLanding = () => {
  // Memorizamos los datos de los servicios para evitar recrearlos en cada renderizado
  const servicios = useMemo(
    () => [
      {
        id: 1,
        title: "Casas Prefabricadas",
        description:
          "Diseños modernos, eficientes y personalizables para adaptarse a tus necesidades.",
        image: "/images/imgHouseProduct.jpg",
        alt: "Casas prefabricadas",
        buttonText: "Ver modelos",
        link: "/catalogo",
      },
      {
        id: 2,
        title: "Materiales de Construcción",
        description:
          "Todo lo que necesitas para tu proyecto, desde cimientos hasta acabados finales.",
        image: "/images/toolsProduct.jpg",
        alt: "Materiales de construcción",
        buttonText: "Ver catálogo",
        link: "/catalogo",
      },
    ],
    []
  ); // Array vacío porque los datos son estáticos

  return (
    <section id="productos" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div>
            <div className={styles.tagBadge}>Nuestros Servicios</div>
            <h2 className={styles.headerTitle}>
              Soluciones completas para tu proyecto
            </h2>
            <p className={styles.headerDescription}>
              Ofrecemos casas prefabricadas de alta calidad y una amplia gama de
              materiales de construcción para todos tus proyectos.
            </p>
          </div>
        </div>

        <div className={styles.productsGrid}>
          {servicios.map((servicio) => (
            <div key={servicio.id} className={styles.productCard}>
              <div className={styles.cardOverlay}></div>
              <img
                src={servicio.image}
                alt={servicio.alt}
                width={800}
                height={600}
                className={styles.productImage}
                loading={servicio.id === 1 ? "eager" : "lazy"} // Primera imagen carga inmediatamente, las demás son lazy
              />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{servicio.title}</h3>
                <p className={styles.cardDescription}>{servicio.description}</p>
                <Link to={servicio.link}>
                  <Button className={styles.cardButton}>
                    {servicio.buttonText}
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
