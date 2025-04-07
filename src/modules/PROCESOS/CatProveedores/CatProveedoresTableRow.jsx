import styles from "../Productos/styles/Products.module.css";
import { useCallback, useMemo } from "react";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado"; // Componente para cambiar estado
import { EditarCatProveedor } from "./EditarCategoria/EditarCatProveedor"; // Componente para editar categoría
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

export const CatProveedorTableRow = ({
  catProveedor,
  onEstadoCambiado,
  onCategoriaEditada,
}) => {
  // Memorización de los estilos de la fila para optimizar rendimiento
  const rowClassName = useMemo(() => styles.tableRow, []);

  // Renderizado de la fila de la tabla de categorías de proveedores
  return (
    <tr key={catProveedor._id} className={rowClassName}>
      <td className={styles.tableCell}>
        <div className={styles.productInfo}>
          <span className={`${styles.productName} `}>
            {catProveedor.nombre}
          </span>
        </div>
      </td>

      <td className={`${styles.tableCellSmall} ml-9`}>
        {catProveedor.descripcion}
      </td>
      <td className={styles.tableCellSmall}>
        <Badge
          className={
            catProveedor.estado === "Activo"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-red-100 text-red-800 hover:bg-red-100"
          }>
          {catProveedor.estado === "Activo" ? (
            <CheckCircle2 className="mr-1 h-3 w-3" />
          ) : (
            <XCircle className="mr-1 h-3 w-3" />
          )}
          {catProveedor.estado}
        </Badge>
      </td>
      <td className={styles.tableCellSmall}>
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
