import { Button } from "@/shared/components";
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  Eye,
  Package,
  Pencil,
  Power,
  TagIcon,
  XCircle,
  ShoppingCart,
  DollarSign,
  Layers,
} from "lucide-react";
import styles from "./styles/Products.module.css";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { EditarProducto } from "./EditarProducto/EditarProducto";
import { useCallback, useMemo } from "react";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado";
import { Badge } from "@/shared/components/ui/badge";
import { DetallesProductos } from "./DetallesProductos";
import { OfertaProductos } from "./OfertaProductos/OfertaProductos";

export const ProductTableRow = ({ product, viewMode = "desktop" }) => {
  // Función para truncar texto
  const truncateText = useCallback((text, maxLength = 30) => {
    if (!text) return "";
    const textString = String(text);
    if (textString.length <= maxLength) return text;
    return textString.substring(0, maxLength) + "...";
  }, []);

  // Función para renderizar categorías de forma segura
  const renderCategorias = useCallback((categorias) => {
    // Si no hay categorías o el array está vacío
    if (!categorias || (Array.isArray(categorias) && categorias.length === 0)) {
      return (
        <Badge
          variant="outline"
          className="bg-gray-50 text-gray-600 border-gray-200">
          Sin categoría
        </Badge>
      );
    }

    // Si es un array de categorías
    if (Array.isArray(categorias)) {
      return (
        <div className="flex flex-wrap gap-1">
          {categorias.slice(0, 2).map((cat, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-blue-50 text-blue-800 border-blue-200">
              {typeof cat === "object"
                ? cat.nombre || "Categoría sin nombre"
                : cat}
            </Badge>
          ))}
          {categorias.length > 2 && (
            <Badge variant="outline" className="bg-gray-50 text-gray-600">
              +{categorias.length - 2}
            </Badge>
          )}
        </div>
      );
    }

    // Si es una sola categoría (retrocompatibilidad)
    if (typeof categorias === "object") {
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-800 border-blue-200">
          {categorias.nombre || "Categoría sin nombre"}
        </Badge>
      );
    }

    return (
      <Badge
        variant="outline"
        className="bg-blue-50 text-blue-800 border-blue-200">
        {categorias}
      </Badge>
    );
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
    return <span className="text-gray-900">{stock}</span>;
  }, []);

  // Función para renderizar el estado del producto con el ícono correcto
  const renderEstado = useCallback((estado) => {
    let badgeClass = "";
    let Icon = null;

    switch (estado) {
      case "Activo":
        badgeClass = "bg-green-100 text-green-800 hover:bg-green-100";
        Icon = CheckCircle2;
        break;
      case "Descontinuado":
        badgeClass = "bg-red-100 text-red-800 hover:bg-red-100";
        Icon = Ban;
        break;
      case "Agotado":
        badgeClass = "bg-gray-100 text-gray-800 hover:bg-gray-100";
        Icon = XCircle;
        break;
      case "En oferta":
        badgeClass = "bg-amber-100 text-amber-800 hover:bg-amber-100";
        Icon = TagIcon;
        break;
      default:
        badgeClass = "bg-blue-100 text-blue-800 hover:bg-blue-100";
        Icon = Eye;
    }
    return (
      <Badge className={badgeClass}>
        <Icon className="mr-1 h-3 w-3" />
        {estado}
      </Badge>
    );
  }, []);

  // Función actualizada para obtener la URL de la imagen
  const getImageUrl = (img, imgType) => {
    if (!img) return null;

    // Para URLs de Cloudinary, ya vienen completas
    if (imgType === "file") {
      // Si la URL ya es de Cloudinary, devolverla tal cual
      if (img.includes("cloudinary.com")) {
        return img;
      }
      // Si no, mantener la compatibilidad con el formato anterior
      return `https://buildmart-back-billowing-feather-8375.fly.dev${img}`;
    }
    return img;
  };

  // Memorización de los estilos de la fila para optimizar rendimiento
  const rowClassName = useMemo(() => styles.tableRow, []);

  // Manejo de categorías (para compatibilidad con ambos formatos)
  const categoriasToRender = product.categorias || product.categoriaId;

  // Vista móvil como card
  if (viewMode === "mobile") {
    return (
      <div className={styles.mobileUserCard}>
        <div className={styles.mobileUserHeader}>
          <div className={styles.mobileUserInfo}>
            <div className={styles.mobileUserName}>
              <Package className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-900">
                {truncateText(product.nombre, 25)}
              </span>
            </div>
            <div className={styles.mobileUserRole}>
              {renderEstado(product.estado)}
            </div>
          </div>

          {/* Imagen del producto */}
          <div className="flex-shrink-0">
            {product.img ? (
              <img
                src={getImageUrl(product.img, product.imgType)}
                alt={product.nombre}
                className="w-16 h-16 object-cover rounded-lg"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-400 rounded-lg">
                <Package className="w-6 h-6" />
              </div>
            )}
          </div>
        </div>

        <div className={styles.mobileUserDetails}>
          <div className={styles.mobileUserDetailItem}>
            <Layers className="h-4 w-4 text-gray-400" />
            <div className="flex-1 min-w-0">
              {renderCategorias(categoriasToRender)}
            </div>
          </div>

          <div className={styles.mobileUserDetailItem}>
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Compra: ${FormateoPrecio(product.precioCompra)} | Venta: $
              {FormateoPrecio(product.precio)}
            </span>
          </div>

          <div className={styles.mobileUserDetailItem}>
            <ShoppingCart className="h-4 w-4 text-gray-400" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Stock:</span>
              {renderStock(product.stock)}
            </div>
          </div>
        </div>

        <div className={styles.mobileUserActions}>
          <DetallesProductos producto={product} />
          <EditarProducto producto={product} onProductoEditado={() => {}} />
          <CambiarEstado producto={product} onEstadoCambiado={() => {}} />
          <OfertaProductos producto={product} onProductoEditado={() => {}} />
        </div>
      </div>
    );
  }

  // Vista de escritorio como fila de tabla
  return (
    <tr key={product._id} className={rowClassName}>
      <td className={styles.tableCell}>
        <div className={styles.productInfo}>
          <span className={styles.productName}>
            {truncateText(product.nombre, 32)}
          </span>
        </div>
      </td>

      <td className={styles.tableCellSmall}>
        {renderCategorias(categoriasToRender)}
      </td>
      <td className={styles.tableCellSmall}>
        ${FormateoPrecio(product.precioCompra)}
      </td>
      <td className={styles.tableCellSmall}>
        ${FormateoPrecio(product.precio)}
      </td>
      <td className={styles.tableCellSmall}>{renderStock(product.stock)}</td>
      <td className={styles.tableCell}>{renderEstado(product.estado)}</td>
      <td className={styles.tableCellSmall}>
        {product.img ? (
          <img
            src={getImageUrl(product.img, product.imgType)}
            alt={product.nombre}
            className="max-w-20 max-h-20 object-cover rounded-lg"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-400 rounded-lg">
            <Package className="w-8 h-8" />
          </div>
        )}
      </td>

      {/* Columna individual para Ver detalles */}
      <td className={styles.tableCellCenter}>
        <DetallesProductos producto={product} />
      </td>

      {/* Columna individual para Editar */}
      <td className={styles.tableCellCenter}>
        <div className="flex gap-1">
          <EditarProducto producto={product} onProductoEditado={() => {}} />
          <CambiarEstado producto={product} onEstadoCambiado={() => {}} />
        </div>
      </td>

      {/* Columna individual para Ofertas */}
      <td className={styles.tableCellCenter}>
        <OfertaProductos producto={product} onProductoEditado={() => {}} />
      </td>
    </tr>
  );
};
