import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/components";
import styles from "./Main.module.css";

// Componente mejorado
export const ImgPrincipal = () => {
  return (
    <main className={styles.main}>
      <section id="inicio" className={styles.hero}>
        <div className={styles.imageWrapper}>
          <img
            src="/images/imgLanding.jpg"
            alt="Casa de campo Landing"
            className={styles.fullImage}
            loading="eager"
          />
          <div className={styles.overlay}></div>
        </div>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.flexColumn}>
              <div className={`${styles.titleContainer} ${styles.fadeInUp}`}>
                <div className={styles.badge}>
                  <span>✓ Calidad Certificada</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                  Tu hogar prefabricado,
                  <span className={styles.highlight}>
                    {" "}
                    construido con calidad.
                  </span>
                </h1>
                <p className={styles.description}>
                  Ofrecemos placas prefabricadas resistentes y duraderas,
                  ideales para construir un hogar cómodo, seguro y con estilo.
                  ¡Haz de tu casa un verdadero hogar desde la base!
                </p>
              </div>
              <div
                className={`${styles.buttonContainer} ${styles.fadeInUp} ${styles.delaySmall}`}>
                {/* Botones con efectos mejorados */}
                <Link to="/catalogo">
                  <Button size="lg" className={styles.primaryButton}>
                    Ver catálogo <ChevronRight className={styles.buttonIcon} />
                  </Button>
                </Link>
                <Link
                  to="https://api.whatsapp.com/send?phone=573204580644&text=Hola%20%F0%9F%A4%97%20estamos%20felices%20de%20tenerte%20aqu%C3%AD.%20Me%20gustar%C3%ADa%20hacer%20una%20cotizaci%C3%B3n%20sobre..."
                  target="_blank"
                  rel="noopener noreferrer">
                  <Button
                    size="lg"
                    variant="outline"
                    className={styles.secondaryButton}>
                    Contactar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollDot}></div>
        </div>
      </section>
      <div className={styles.sectionSpacer}></div>
    </main>
  );
};
