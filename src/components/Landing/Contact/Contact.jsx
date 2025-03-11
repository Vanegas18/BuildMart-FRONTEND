import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import styles from "./Contact.module.css";

export const Contact = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.titleContent}>
            <div className={styles.contactLabel}>Contacto</div>
            <h2 className={styles.title}>Estamos aquí para ayudarte</h2>
            <p className={styles.description}>
              Ponte en contacto con nosotros para cualquier consulta o para
              solicitar información adicional.
            </p>
          </div>
        </div>
        <div className={styles.contactGrid}>
          <div className={styles.contactCard}>
            <Phone className={styles.icon} />
            <h3 className={styles.cardTitle}>Teléfono</h3>
            <p className={styles.cardText}>+34 912 345 678</p>
            <p className={styles.cardText}>Lun-Vie: 9:00 - 18:00</p>
          </div>
          <div className={styles.contactCard}>
            <Mail className={styles.icon} />
            <h3 className={styles.cardTitle}>Email</h3>
            <p className={styles.cardText}>info@buildmart.com</p>
            <p className={styles.cardText}>ventas@buildmart.com</p>
          </div>
          <div className={styles.contactCard}>
            <MapPin className={styles.icon} />
            <h3 className={styles.cardTitle}>Dirección</h3>
            <p className={styles.cardText}>Calle Construcción, 123</p>
            <p className={styles.cardText}>28001 Madrid, España</p>
          </div>
        </div>
      </div>
    </section>
  );
};
