import styles from "./styles/CatProveedores.module.css";
import { useCallback, useMemo } from "react";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado"; // Componente para cambiar estado
import { EditarCatProveedor } from "./EditarCategoria/EditarCatProveedor"; // Componente para editar categoría

export const CatProveedorTableRow = ({ catProveedor, onEstadoCambiado, onCategoriaEditada }) => {
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

  // Memorización de los estilos de la fila para optimizar rendimiento
  const rowClassName = useMemo(() => styles.tableRow, []);

  // Renderizado de la fila de la tabla de categorías de proveedores
  return (
    <tr key={catProveedor._id} className={rowClassName}>
      <td className={styles.tableCell}>
        <div className={styles.proveedorInfo}>
          <span className={styles.proveedorName}>{catProveedor.nombre}</span>
        </div>
      </td>

      <td className={styles.tableCellSmall}>{catProveedor.descripcion}</td>
      <td className={styles.tableCell}>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(
            catProveedor.estado
          )}`}
        >
          {catProveedor.estado}
        </span>
      </td>
      <td className={styles.tableCellRight}>
        <div className="flex justify-end space-x-1">
          {/* Editar categoría */}
          <EditarCatProveedor
            CatProveedor={catProveedor}
            onCategoriaEditada={onCategoriaEditada}
          />

          {/* Cambiar estado */}
          <CambiarEstado
            categoria={catProveedor}
            onEstadoCambiado={onEstadoCambiado}
          />
        </div>
      </td>
    </tr>
  );
};