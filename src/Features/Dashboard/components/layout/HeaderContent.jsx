import { Button } from "@/components";
import styles from "../content/products/styles/Products.module.css";

export const HeaderContent = ({ title, info, newInfo, icon: Icon }) => {
  return (
    <div className={styles.headerContainer}>
      <div>
        <h1 className={styles.headerTitle}>{title}</h1>
        <p className={styles.headerDescription}>
          {info}
        </p>
      </div>
      <Button className={styles.addButton}>
        <Icon className={styles.buttonIcon} />
        {newInfo}
      </Button>
    </div>
  );
};
