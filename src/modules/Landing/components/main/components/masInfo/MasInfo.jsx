import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/shared/components";
import styles from "./Cta.module.css";

export const MasInfo = () => {
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
            {/* Enlace externo para WhatsApp */}
            <Link
              to="https://web.whatsapp.com/"
              target="_blank"
              rel="noopener noreferrer">
              <Button size="lg" className={styles.primaryButton}>
                Solicitar presupuesto{" "}
                {/* {" "} añade un espacio en blanco entre el texto y el icono */}
                <ChevronRight className={styles.buttonIcon} />
              </Button>
            </Link>
            {/* Navegación interna al catálogo */}
            <Link to="/catalogo">
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
