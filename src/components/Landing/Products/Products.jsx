import { Link } from "react-router";
import { Button } from "../../ui";
import styles from "./Products.module.css";

export const Products = () => {
  return (
    <section id="productos" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div>
            <div className={styles.tagBadge}>Nuestros Productos</div>
            <h2 className={styles.headerTitle}>
              Soluciones completas para tu proyecto
            </h2>
            <p className={styles.headerDescription}>
              Ofrecemos casas prefabricadas de alta calidad y una amplia gama de
              materiales de construcción para todos tus proyectos.
            </p>
          </div>
        </div>
        <div className={styles.productsGrid}>
          <div className={styles.productCard}>
            <div className={styles.cardOverlay}></div>
            <img
              src="/images/imgHouseProduct.jpg"
              alt="Casas prefabricadas"
              width={800}
              height={600}
              className={styles.productImage}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Casas Prefabricadas</h3>
              <p className={styles.cardDescription}>
                Diseños modernos, eficientes y personalizables para adaptarse a
                tus necesidades.
              </p>
              <Link to={"/catalogo"}>
                <Button className={styles.cardButton}>Ver modelos</Button>
              </Link>
            </div>
          </div>
          <div className={styles.productCard}>
            <div className={styles.cardOverlay}></div>
            <img
              src="/images/toolsProduct.webp"
              alt="Materiales de construcción"
              width={800}
              height={600}
              className={styles.productImage}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Materiales de Construcción</h3>
              <p className={styles.cardDescription}>
                Todo lo que necesitas para tu proyecto, desde cimientos hasta
                acabados finales.
              </p>
              <Link to={"/catalogo"}>
                <Button className={styles.cardButton}>Ver catálogo</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
