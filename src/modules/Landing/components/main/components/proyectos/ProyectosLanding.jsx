import React, { useMemo } from "react";
import styles from "./Projects.module.css";

export const ProyectosLanding = () => {
  // Memorizamos los datos de proyectos para evitar recrear el array en cada renderizado
  const proyectos = useMemo(() => {
    return [1, 2, 3, 4, 5, 6].map((item) => ({
      id: item,
      title: `Proyecto ${item}`,
      subtitle: "Casa prefabricada moderna",
      imageSrc: `/images/imgProyecto${item}.jpg`,
      alt: `Proyecto ${item}`,
    }));
  }, []); // Sin dependencias porque los datos son estáticos

  return (
    <section className={styles.section} id="projects">
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div>
            <div className={styles.tagBadge}>Proyectos</div>
            <h2 className={styles.headerTitle}>
              Nuestros proyectos destacados
            </h2>
            <p className={styles.headerDescription}>
              Conoce algunos de los proyectos que hemos realizado y cómo hemos
              ayudado a nuestros clientes a hacer realidad sus sueños.
            </p>
          </div>
        </div>
        <div className={styles.projectsGrid}>
          {proyectos.map((proyecto) => (
            <div key={proyecto.id} className={styles.projectCard}>
              <img
                src={proyecto.imageSrc}
                alt={proyecto.alt}
                width={600}
                height={400}
                className={styles.projectImage}
                loading={proyecto.id === 1 ? "eager" : "lazy"} // Carga eager solo para la primera imagen
              />
              <div className={styles.overlay}></div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>{proyecto.title}</h3>
                <p className={styles.projectSubtitle}>{proyecto.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Exportamos como memo para evitar renderizados innecesarios
export default React.memo(ProyectosLanding);
