import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
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
                    construido con calidad
                  </span>
                </h1>
                <p className={styles.description}>
                  Casas prefabricadas modernas y materiales de construcción de
                  primera calidad para hacer realidad el hogar de tus sueños.
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
                  to="https://web.whatsapp.com/"
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

              <div
                className={`${styles.trust} ${styles.fadeInUp} ${styles.delayMedium}`}>
                <div className={styles.trustItem}>
                  ★★★★★ <span>4.9/5 (128 reseñas)</span>
                </div>
                <div className={styles.trustItem}>
                  ✓ <span>Entrega en 60 días</span>
                </div>
                <div className={styles.trustItem}>
                  🛡️ <span>Garantía de 10 años</span>
                </div>
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
