import styles from "../Productos/styles/Products.module.css";
import { useCallback, useMemo } from "react";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado"; // Componente para cambiar estado
import { EditarProveedor } from "./EditarProveedor/EditarProveedor"; // Componente para editar proveedor
import { Badge } from "@/shared/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Building2,
  MapPin,
  Phone,
  Mail,
  Tag,
  Hash,
} from "lucide-react";

export const ProveedorTableRow = ({ proveedor, viewMode = "desktop" }) => {
  // Función para renderizar categoría de forma segura
  const renderCategoria = useCallback((categoriaProveedorId) => {
    if (!categoriaProveedorId) return "Sin categoría";
    return typeof categoriaProveedorId === "object"
      ? categoriaProveedorId.nombre || "Categoría sin nombre"
      : categoriaProveedorId;
  }, []);

  // Función para renderizar el estado con badge e ícono
  const renderEstado = useCallback((estado) => {
    const isActivo = estado === "Activo";
    return (
      <Badge
        className={
          isActivo
            ? "bg-green-100 text-green-800 hover:bg-green-100"
            : "bg-red-100 text-red-800 hover:bg-red-100"
        }>
        {isActivo ? (
          <CheckCircle2 className="mr-1 h-3 w-3" />
        ) : (
          <XCircle className="mr-1 h-3 w-3" />
        )}
        {estado}
      </Badge>
    );
  }, []);

  // Función para truncar texto en vista móvil
  const truncateText = useCallback((text, maxLength = 30) => {
    if (!text) return "";
    const textString = String(text);
    if (textString.length <= maxLength) return text;
    return textString.substring(0, maxLength) + "...";
  }, []);

  // Memorización de los estilos de la fila para optimizar rendimiento
  const rowClassName = useMemo(() => styles.tableRow, []);

  // Vista móvil como card
  if (viewMode === "mobile") {
    return (
      <div className={styles.mobileUserCard}>
        <div className={styles.mobileUserHeader}>
          <div className={styles.mobileUserInfo}>
            <div className={styles.mobileUserName}>
              <Building2 className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-900">
                {truncateText(proveedor.nombre, 25)}
              </span>
            </div>
            <div className={styles.mobileUserRole}>
              {renderEstado(proveedor.estado)}
            </div>
          </div>
        </div>

        <div className={styles.mobileUserDetails}>
          <div className={styles.mobileUserDetailItem}>
            <Hash className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">NIT: {proveedor.nit}</span>
          </div>

          <div className={styles.mobileUserDetailItem}>
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {truncateText(proveedor.direccion, 35)}
            </span>
          </div>

          <div className={styles.mobileUserDetailItem}>
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{proveedor.telefono}</span>
          </div>

          <div className={styles.mobileUserDetailItem}>
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {truncateText(proveedor.correo, 30)}
            </span>
          </div>

          <div className={styles.mobileUserDetailItem}>
            <Tag className="h-4 w-4 text-gray-400" />
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-800 border-blue-200">
              {renderCategoria(proveedor.categoriaProveedorId)}
            </Badge>
          </div>
        </div>

        <div className={styles.mobileUserActions}>
          {/* Editar proveedor */}
          <EditarProveedor
            proveedor={proveedor}
            onProveedorEditado={() => {}}
          />

          {/* Cambiar estado */}
          <CambiarEstado proveedor={proveedor} onEstadoCambiado={() => {}} />
        </div>
      </div>
    );
  }

  // Vista de escritorio como fila de tabla
  return (
    <tr key={proveedor._id} className={rowClassName}>
      <td className={styles.tableCell}>
        <div className={styles.productInfo}>
          <span className={styles.productName}>{proveedor.nit}</span>
        </div>
      </td>

      <td className={styles.tableCellSmall}>{proveedor.nombre}</td>
      <td className={styles.tableCellSmall}>{proveedor.direccion}</td>
      <td className={styles.tableCellSmall}>{proveedor.telefono}</td>
      <td className={styles.tableCellSmall}>{proveedor.correo}</td>
      <td className={styles.tableCellSmall}>
        <Badge
          key={proveedor._id}
          variant="outline"
          className="bg-blue-50 text-blue-800 border-blue-200">
          {renderCategoria(proveedor.categoriaProveedorId)}
        </Badge>
      </td>
      <td className={styles.tableCell}>{renderEstado(proveedor.estado)}</td>
      <td className={styles.tableCellRight}>
        <div className="flex justify-end space-x-1">
          {/* Editar proveedor */}
          <EditarProveedor
            proveedor={proveedor}
            onProveedorEditado={() => {}}
          />

          {/* Cambiar estado */}
          <CambiarEstado proveedor={proveedor} onEstadoCambiado={() => {}} />
        </div>
      </td>
    </tr>
  );
};
