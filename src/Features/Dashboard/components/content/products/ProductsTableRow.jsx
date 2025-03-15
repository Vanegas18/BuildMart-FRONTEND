import { Button } from "@/components";
import { AlertTriangle, Package } from "lucide-react";
import styles from "./styles/Products.module.css";
import { FormateoPrecio } from "../../layout";

export const ProductTableRow = ({ product }) => {
  // Función para determinar la clase de estilo del estado
  const getStatusClass = (estado) => {
    switch (estado) {
      case "Disponible":
        return "bg-green-100 text-green-800";
      case "No disponible":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  // Función para renderizar categoría de forma segura
  const renderCategoria = (categoriaId) => {
    if (!categoriaId) return "Sin categoría";
    return typeof categoriaId === "object"
      ? categoriaId.nombre || "Categoría sin nombre"
      : categoriaId;
  };

  // Determinar texto del botón según el estado
  const getToggleButtonText = () => {
    return product.estado === "Disponible" ? "Desactivar" : "Activar";
  };

  // Renderizar stock con alerta si es menor a 10
  const renderStock = (stock) => {
    if (stock < 10) {
      return (
        <div
          className="flex items-center text-amber-500 font-medium"
          title="Alerta stock: Nivel bajo de inventario">
          <span className="mr-1">{stock}</span>
          <AlertTriangle size={16} />
        </div>
      );
    }
    return stock;
  };

  return (
    <tr key={product._id} className={styles.tableRow}>
      <td className={styles.tableCell}>
        <div className={styles.productInfo}>
          <div className={styles.productIcon}>
            <Package className={styles.productIconSvg} size={18} />
          </div>
          <span className={styles.productName}>{product.nombre}</span>
        </div>
      </td>

      <td className={styles.tableCellSmall}>{product.descripcion}</td>
      <td className={styles.tableCellSmall}>
        {renderCategoria(product.categoriaId)}
      </td>
      <td className={styles.tableCellSmall}>
        ${FormateoPrecio(product.precio)}
      </td>
      <td className={styles.tableCellSmall}>{renderStock(product.stock)}</td>
      <td className={styles.tableCell}>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(
            product.estado
          )}`}>
          {product.estado}
        </span>
      </td>
      <td className={styles.tableCellSmall}>
        <img src={product.img} alt="" />
      </td>
      <td className={styles.tableCellRight}>
        <div className={styles.actionsContainer}>
          <Button variant="ghost" size="lx">
            Editar
          </Button>
          <Button variant="ghost" size="lx" className={styles.deleteButton}>
            {getToggleButtonText()}
          </Button>
        </div>
      </td>
    </tr>
  );
};
