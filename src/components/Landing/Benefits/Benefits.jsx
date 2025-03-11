import { Clock, Home, Ruler, Shield, Truck, Warehouse } from "lucide-react";
import styles from "./Benefits.module.css";

export const Benefits = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div>
            <div className={styles.tagBadge}>Beneficios</div>
            <h2 className={styles.headerTitle}>¿Por qué elegir Build Mart?</h2>
            <p className={styles.headerDescription}>
              Nos destacamos por ofrecer productos de calidad y un servicio
              excepcional a nuestros clientes.
            </p>
          </div>
        </div>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <Clock className={styles.benefitIcon} />
            <h3 className={styles.benefitTitle}>Entrega Rápida</h3>
            <p className={styles.benefitDescription}>
              Cumplimos con los plazos de entrega para que puedas disfrutar de
              tu hogar lo antes posible.
            </p>
          </div>
          <div className={styles.benefitCard}>
            <Shield className={styles.benefitIcon} />
            <h3 className={styles.benefitTitle}>Garantía de Calidad</h3>
            <p className={styles.benefitDescription}>
              Todos nuestros productos cuentan con garantía y están fabricados
              con los mejores materiales.
            </p>
          </div>
          <div className={styles.benefitCard}>
            <Ruler className={styles.benefitIcon} />
            <h3 className={styles.benefitTitle}>Diseño Personalizado</h3>
            <p className={styles.benefitDescription}>
              Adaptamos nuestros modelos a tus necesidades específicas y
              preferencias de diseño.
            </p>
          </div>
          <div className={styles.benefitCard}>
            <Truck className={styles.benefitIcon} />
            <h3 className={styles.benefitTitle}>Envío a Domicilio</h3>
            <p className={styles.benefitDescription}>
              Entregamos todos los materiales directamente en el lugar de tu
              proyecto.
            </p>
          </div>
          <div className={styles.benefitCard}>
            <Warehouse className={styles.benefitIcon} />
            <h3 className={styles.benefitTitle}>Amplio Inventario</h3>
            <p className={styles.benefitDescription}>
              Disponemos de una gran variedad de productos para satisfacer todas
              tus necesidades.
            </p>
          </div>
          <div className={styles.benefitCard}>
            <Home className={styles.benefitIcon} />
            <h3 className={styles.benefitTitle}>Eficiencia Energética</h3>
            <p className={styles.benefitDescription}>
              Nuestras casas están diseñadas para maximizar la eficiencia
              energética y reducir costos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
