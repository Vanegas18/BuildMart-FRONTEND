import styles from "../Productos/styles/Products.module.css";
import { useCallback, useMemo } from "react";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado"; // Componente para cambiar estado
import { EditarProveedor } from "./EditarProveedor/EditarProveedor"; // Componente para editar proveedor
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

export const ProveedorTableRow = ({ proveedor }) => {
  // Función para renderizar categoría de forma segura
  const renderCategoria = useCallback((categoriaProveedorId) => {
    if (!categoriaProveedorId) return "Sin categoría";
    return typeof categoriaProveedorId === "object"
      ? categoriaProveedorId.nombre || "Categoría sin nombre"
      : categoriaProveedorId;
  }, []);

  // Memorización de los estilos de la fila para optimizar rendimiento
  const rowClassName = useMemo(() => styles.tableRow, []);

  // Renderizado de la fila de la tabla de proveedores
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
        {renderCategoria(proveedor.categoriaProveedorId)}
      </td>
      <td className={styles.tableCell}>
        <Badge
          className={
            proveedor.estado === "Activo"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-red-100 text-red-800 hover:bg-red-100"
          }>
          {proveedor.estado === "Activo" ? (
            <CheckCircle2 className="mr-1 h-3 w-3" />
          ) : (
            <XCircle className="mr-1 h-3 w-3" />
          )}
          {proveedor.estado}
        </Badge>
      </td>
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
