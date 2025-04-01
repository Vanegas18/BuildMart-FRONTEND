import { CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import styles from "../Productos/styles/Products.module.css";
import { useCallback } from "react";

export const UsuariosTableRow = ({ usuarios }) => {
  // Función para renderizar rol de forma segura
  const renderRol = useCallback((rol) => {
    if (!rol) return "Sin Rol";
    return typeof rol === "object" ? rol.nombre || "Rol sin nombre" : rol;
  }, []);

  return (
    <tr key={usuarios._id} className={styles.tableRow}>
      <td className={styles.tableCell}>
        <div className={styles.productInfo}>
          <span className={styles.productName}>{usuarios.nombre}</span>
        </div>
      </td>
      <td className={styles.tableCellSmall}>{usuarios.cedula}</td>
      <td className={styles.tableCellSmall}>{usuarios.correo}</td>
      <td className={styles.tableCellSmall}>{usuarios.telefono}</td>
      <td className={styles.tableCellSmall}>{usuarios.direccion}</td>
      <td className={styles.tableCellSmall}>
        <Badge
          variant="outline"
          className={
            renderRol(usuarios.rol) === "Administrador"
              ? "border-blue-500 text-blue-500"
              : renderRol(usuarios.rol) === "Cliente"
              ? "border-green-500 text-green-500"
              : "border-gray-500 text-gray-500"
          }>
          {renderRol(usuarios.rol)}
        </Badge>
      </td>
      <td className={styles.tableCellSmall}>
        <Badge
          className={
            usuarios.estado === "Activo"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-red-100 text-red-800 hover:bg-red-100"
          }>
          {usuarios.estado === "Activo" ? (
            <CheckCircle2 className="mr-1 h-3 w-3" />
          ) : (
            <XCircle className="mr-1 h-3 w-3" />
          )}
          {usuarios.estado}
        </Badge>
      </td>
      <td className={styles.tableCellSmall}></td>
    </tr>
  );
};
