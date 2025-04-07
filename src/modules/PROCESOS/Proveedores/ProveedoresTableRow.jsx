import styles from "./styles/Proveedores.module.css";
import { useCallback, useMemo } from "react";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado"; // Componente para cambiar estado
import { EditarProveedor } from "./EditarProveedor/EditarProveedor"; // Componente para editar proveedor

export const ProveedorTableRow = ({ proveedor, onEstadoCambiado, onProveedorEditado }) => {
  // Función para determinar la clase de estilo del estado
  const getStatusClass = useCallback((estado) => {
    switch (estado) {
      case "Activo":
        return "bg-green-100 text-green-800";
      case "Inactivo":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  }, []);

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
        <div className={styles.proveedorInfo}>
          <span className={styles.tableCellSmall}>{proveedor.nit}</span>
        </div>
      </td>

      <td className={styles.proveedorName}>{proveedor.nombre}</td>
      <td className={styles.tableCellSmall}>{proveedor.direccion}</td>
      <td className={styles.tableCellSmall}>{proveedor.telefono}</td>
      <td className={styles.tableCellSmall}>{proveedor.correo}</td>
      <td className={styles.tableCellSmall}>
        {renderCategoria(proveedor.categoriaProveedorId)}
      </td>
      <td className={styles.tableCell}>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(
            proveedor.estado
          )}`}
        >
          {proveedor.estado}
        </span>
      </td>
      <td className={styles.tableCellRight}>
        <div className="flex justify-end space-x-1">
          {/* Editar proveedor */}
          <EditarProveedor
            proveedor={proveedor}
            onProveedorEditado={onProveedorEditado}
          />

          {/* Cambiar estado */}
          <CambiarEstado
            proveedor={proveedor}
            onEstadoCambiado={onEstadoCambiado}
          />
        </div>
      </td>
    </tr>
  );
};