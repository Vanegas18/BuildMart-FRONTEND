import { Button } from "@/shared/components";
import { AlertTriangle, Ban, Eye, Package, Pencil, Power } from "lucide-react";
import styles from "./styles/Products.module.css";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { EditarProducto } from "./EditarProducto/EditarProducto";
import { useCallback, useMemo } from "react";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado";

export const ProductTableRow = ({ product }) => {
  // Función para determinar la clase de estilo del estado
  const getStatusClass = useCallback((estado) => {
    switch (estado) {
      case "Disponible":
        return "bg-green-100 text-green-800";
      case "No disponible":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  }, []);

  // Función para renderizar categoría de forma segura
  const renderCategoria = useCallback((categoriaId) => {
    if (!categoriaId) return "Sin categoría";
    return typeof categoriaId === "object"
      ? categoriaId.nombre || "Categoría sin nombre"
      : categoriaId;
  }, []);

  // Renderizar stock con alerta si es menor a 10
  const renderStock = useCallback((stock) => {
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
  }, []);

  // Memorización de los estilos de la fila para optimizar rendimiento
  const rowClassName = useMemo(() => styles.tableRow, []);

  // Renderizado de la fila de la tabla de productos
  return (
    <tr key={product.productId} className={rowClassName}>
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
      <td className={styles.tableCellSmall}>
        ${FormateoPrecio(product.precioCompra)}
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
        <img
          src={product.img}
          alt=""
          className="max-w-20 max-h-20 object-cover"
        />
      </td>
      <td className={styles.tableCellRight}>
        <div className="flex justify-end space-x-1">
          {/* Editar producto */}
          <EditarProducto producto={product} onProductoEditado={() => {}} />

          <CambiarEstado producto={product} onEstadoCambiado={() => {}} />
        </div>
      </td>
    </tr>
  );
};
