import React, { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./Projects.module.css";
import { Button } from "@/shared/components";
import { NavLink } from "react-router-dom";

// Componente para el encabezado de la sección
const SectionHeader = React.memo(() => (
  <div className={styles.headerWrapper}>
    <div className={styles.headerContent}>
      <div className={styles.tagBadge}>Proyectos</div>
      <h2 className={styles.headerTitle}>
        Nuestros <span className={styles.highlight}>proyectos</span> destacados
      </h2>
      <p className={styles.headerDescription}>
        Conoce algunos de los proyectos que hemos realizado y cómo hemos ayudado
        a nuestros clientes a hacer realidad sus sueños.
      </p>
      <div className={styles.headerDivider}></div>
    </div>
  </div>
));

// Componente para la tarjeta de proyecto
const ProjectCard = React.memo(({ project, index }) => {
  return (
    <div
      className={styles.projectCard}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}>
      <img
        src={project.imageSrc}
        alt={project.alt}
        width={600}
        height={400}
        className={styles.projectImage}
        loading={index === 0 ? "eager" : "lazy"}
      />
      <div className={styles.overlay}></div>
      <div className={styles.projectInfo}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectSubtitle}>{project.subtitle}</p>
      </div>
    </div>
  );
});

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
        {/* Componente de encabezado extraído */}
        <SectionHeader />

        {/* Grid de proyectos con renderizado dinámico */}
        <div className={styles.projectsGrid}>
          {proyectos.map((proyecto, index) => (
            <ProjectCard key={proyecto.id} project={proyecto} index={index} />
          ))}
        </div>

        {/* Botón de ver más proyectos */}
        <div className={styles.buttonWrapper}>
          <NavLink to={"/catalogo"}>
            <Button className={styles.button}>
              <span className={styles.viewMoreText}>
                Ver más proyectos
                <ArrowRight className={styles.arrowIcon} size={18} />
              </span>
            </Button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

// Exportamos como memo para evitar renderizados innecesarios
export default React.memo(ProyectosLanding);
