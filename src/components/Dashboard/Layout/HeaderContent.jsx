import { Button } from "@/components";
import styles from "../pages/Productos/styles/Products.module.css";

export const HeaderContent = ({
  title,
  info,
  newInfo,
  icon: Icon,
  actionComponent,
}) => {
  return (
    <div className={styles.headerContainer}>
      <div>
        <h1 className={styles.headerTitle}>{title}</h1>
        <p className={styles.headerDescription}>{info}</p>
      </div>
      {actionComponent}
    </div>
  );
};
