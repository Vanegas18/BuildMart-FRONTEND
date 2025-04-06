import { Button } from "@/shared/components";
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  Eye,
  Package,
  Pencil,
  Power,
  XCircle,
} from "lucide-react";
import styles from "./styles/Products.module.css";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { EditarProducto } from "./EditarProducto/EditarProducto";
import { useCallback, useMemo } from "react";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado";
import { Badge } from "@/shared/components/ui/badge";

export const ProductTableRow = ({ product }) => {
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

  const getImageUrl = (img, imgType) => {
    if (!img) return null;
    if (imgType === "file") {
      return `https://buildmart-back-billowing-feather-8375.fly.dev${img}`;
    }
    return img;
  };

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
        <Badge
          className={
            product.estado === "Disponible"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-red-100 text-red-800 hover:bg-red-100"
          }>
          {product.estado === "Disponible" ? (
            <CheckCircle2 className="mr-1 h-3 w-3" />
          ) : (
            <XCircle className="mr-1 h-3 w-3" />
          )}
          {product.estado}
        </Badge>
      </td>
      <td className={styles.tableCellSmall}>
        {product.img ? (
          <img
            src={getImageUrl(product.img, product.imgType)}
            alt={product.nombre}
            className="max-w-20 max-h-20 object-cover"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-400">
            Sin imagen
          </div>
        )}
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
