import { ChevronRight } from "lucide-react";
import styles from "./Cta.module.css";
import { Link } from "react-router";
import { Button } from "@/components";

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
            <Link to={"https://web.whatsapp.com/"}>
              <Button size="lg" className={styles.primaryButton}>
                Solicitar presupuesto{" "}
                <ChevronRight className={styles.buttonIcon} />
              </Button>
            </Link>
            <Link to={"/catalogo"}>
              <Button
                size="lg"
                variant="outline"
                className={styles.outlineButton}>
                Ver catálogo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
