import { Button } from "../../ui";
import styles from "./Projects.module.css";

export const Projects = () => {
  return (
    <section id="proyectos" className={styles.section}>
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
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className={styles.projectCard}>
              <img
                src={`/images/imgProyecto${item}.jpg`}
                alt={`Proyecto ${item}`}
                width={600}
                height={400}
                className={styles.projectImage}
              />
              <div className={styles.overlay}></div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>Proyecto {item}</h3>
                <p className={styles.projectSubtitle}>
                  Casa prefabricada moderna
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.buttonWrapper}>
          <Button className={styles.button}>Ver más proyectos</Button>
        </div>
      </div>
    </section>
  );
};
