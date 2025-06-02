import {
  CheckCircle2,
  Info,
  XCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Hash,
  Shield,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import styles from "../Productos/styles/Products.module.css";
import { useCallback, useMemo } from "react";
import { CambiarEstadoUsuario } from "./CambiarEstado";
import { EditarUsuario } from "./EditarUsuario";
import { DetallesUsuarios } from "./DetallesUsuarios";

export const UsuariosTableRow = ({ usuarios, viewMode = "desktop" }) => {
  // Función para truncar texto
  const truncateText = useCallback((text, maxLength = 30) => {
    if (!text) return "";
    const textString = String(text);
    if (textString.length <= maxLength) return text;
    return textString.substring(0, maxLength) + "...";
  }, []);

  // Función para renderizar rol de forma segura
  const renderRol = useCallback(
    (rol) => {
      if (!rol) return "Sin Rol";
      const rolText =
        typeof rol === "object" ? rol.nombre || "Rol sin nombre" : rol;
      return truncateText(rolText, 20);
    },
    [truncateText]
  );

  // Memorización de los estilos de la fila para optimizar rendimiento
  const rowClassName = useMemo(() => styles.tableRow, []);

  // Vista móvil como card
  if (viewMode === "mobile") {
    return (
      <div className={styles.mobileUserCard}>
        <div className={styles.mobileUserHeader}>
          <div className={styles.mobileUserInfo}>
            <div className={styles.mobileUserName}>
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-900">
                {usuarios.nombre}
              </span>
            </div>
            <div className={styles.mobileUserRole}>
              <Badge
                variant="outline"
                className={
                  renderRol(usuarios.rol) === "Administrador"
                    ? "border-blue-500 text-blue-500"
                    : renderRol(usuarios.rol) === "Cliente"
                    ? "border-green-500 text-green-500"
                    : "border-gray-500 text-gray-500"
                }>
                <Shield className="mr-1 h-3 w-3" />
                {renderRol(usuarios.rol)}
              </Badge>
            </div>
          </div>
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
        </div>

        <div className={styles.mobileUserDetails}>
          <div className={styles.mobileUserDetailItem}>
            <Hash className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{usuarios.cedula}</span>
          </div>
          <div className={styles.mobileUserDetailItem}>
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {truncateText(usuarios.correo, 25)}
            </span>
          </div>
          <div className={styles.mobileUserDetailItem}>
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{usuarios.telefono}</span>
          </div>
          <div className={styles.mobileUserDetailItem}>
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {truncateText(usuarios.direccion, 30)}
            </span>
          </div>
        </div>

        <div className={styles.mobileUserActions}>
          <DetallesUsuarios usuario={usuarios} />
          <EditarUsuario usuario={usuarios} onEditComplete={() => {}} />
          <CambiarEstadoUsuario
            usuario={usuarios}
            onEstadoCambiado={() => {}}
          />
        </div>
      </div>
    );
  }

  // Vista de escritorio como fila de tabla
  return (
    <tr className={rowClassName}>
      <td title={usuarios.nombre} className={styles.tableCellSmall}>
        {truncateText(usuarios.nombre, 20)}
      </td>
      <td title={usuarios.cedula} className={styles.tableCellSmall}>
        {truncateText(usuarios.cedula, 15)}
      </td>
      <td title={usuarios.correo} className={styles.tableCellSmall}>
        {truncateText(usuarios.correo, 15)}
      </td>
      <td title={usuarios.telefono} className={styles.tableCellSmall}>
        {truncateText(usuarios.telefono, 15)}
      </td>
      <td title={usuarios.direccion} className={styles.tableCellSmall}>
        {truncateText(usuarios.direccion, 30)}
      </td>
      <td
        title={
          typeof usuarios.rol === "object" ? usuarios.rol?.nombre : usuarios.rol
        }
        className={styles.tableCellSmall}>
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
      <td>
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
      <td>
        <div className="flex gap-2">
          <DetallesUsuarios usuario={usuarios} />
          <EditarUsuario usuario={usuarios} onEditComplete={() => {}} />
          <CambiarEstadoUsuario
            usuario={usuarios}
            onEstadoCambiado={() => {}}
          />
        </div>
      </td>
    </tr>
  );
};
