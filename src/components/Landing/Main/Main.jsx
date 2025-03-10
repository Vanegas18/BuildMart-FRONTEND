import { ChevronRight } from "lucide-react";
import { Button } from "../../ui";
import styles from "./Main.module.css";

export const Main = () => {
  return (
    <main className={styles.main}>
      <section id="inicio" className={styles.hero}>
        <div className={styles.imageWrapper}>
          <img
            src="/images/imgLanding.jpg"
            alt="Casa de campo Landing"
            className="object-cover blur-sm animate__animated animate__pulse animate__delay-1s"
          />
        </div>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.flexColumn}>
              <div className={styles.titleContainer}>
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                  Tu hogar prefabricado, construido con calidad
                </h1>
                <p className={styles.description}>
                  Casas prefabricadas modernas y materiales de construcción de
                  primera calidad para hacer realidad el hogar de tus sueños.
                </p>
              </div>
              <div className={styles.buttonContainer}>
                <Button size="lg" className={styles.primaryButton}>
                  Ver catálogo <ChevronRight className={styles.buttonIcon} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={styles.secondaryButton}>
                  Contactar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
