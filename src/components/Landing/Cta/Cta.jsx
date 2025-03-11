import { ChevronRight } from "lucide-react";
import { Button } from "../../ui";
import styles from "./Cta.module.css";

export const Cta = () => {
  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>¿Listo para comenzar tu proyecto?</h2>
            <p className={styles.paragraph}>
              Contacta con nosotros hoy mismo y te ayudaremos a hacer realidad
              el hogar de tus sueños.
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <Button size="lg" className={styles.primaryButton}>
              Solicitar presupuesto{" "}
              <ChevronRight className={styles.buttonIcon} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={styles.outlineButton}>
              Ver catálogo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
