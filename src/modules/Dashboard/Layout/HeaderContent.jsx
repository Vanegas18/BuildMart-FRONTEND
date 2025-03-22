import styles from "../../PROCESOS/Productos/styles/Products.module.css";

export const HeaderContent = ({ title, info, actionComponent }) => {
  // Componente simple que muestra un encabezado con título, descripción y acción
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
