import {
  CheckCircle2,
  XCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Hash,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import styles from "../Productos/styles/Products.module.css";
import { useCallback, useMemo } from "react";
import { EditarCliente } from "./EditarCliente/EditarCliente";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado";

export const ClientsTableRow = ({ client, viewMode = "desktop" }) => {
  // Función para truncar texto
  const truncateText = useCallback((text, maxLength = 30) => {
    if (!text) return "";
    const textString = String(text);
    if (textString.length <= maxLength) return text;
    return textString.substring(0, maxLength) + "...";
  }, []);

  // Obtener la dirección principal
  const direccionPrincipal = useMemo(() => {
    if (!client.direcciones || client.direcciones.length === 0)
      return "No disponible";
    const principal =
      client.direcciones.find((dir) => dir.esPrincipal) ||
      client.direcciones[0];
    return `${principal.calle || ""}, ${principal.ciudad || ""}, ${
      principal.departamento || ""
    }`;
  }, [client.direcciones]);

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
              <span className="font-medium text-gray-900">{client.nombre}</span>
            </div>
          </div>
          <Badge
            className={
              client.estado === "Activo"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : "bg-red-100 text-red-800 hover:bg-red-100"
            }>
            {client.estado === "Activo" ? (
              <CheckCircle2 className="mr-1 h-3 w-3" />
            ) : (
              <XCircle className="mr-1 h-3 w-3" />
            )}
            {client.estado}
          </Badge>
        </div>

        <div className={styles.mobileUserDetails}>
          <div className={styles.mobileUserDetailItem}>
            <Hash className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{client.cedula}</span>
          </div>
          <div className={styles.mobileUserDetailItem}>
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {truncateText(client.correo, 25)}
            </span>
          </div>
          <div className={styles.mobileUserDetailItem}>
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{client.telefono}</span>
          </div>
          <div className={styles.mobileUserDetailItem}>
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {truncateText(direccionPrincipal, 30)}
            </span>
          </div>
        </div>

        <div className={styles.mobileUserActions}>
          <EditarCliente cliente={client} onClienteEditado={() => {}} />
          <CambiarEstado cliente={client} onEstadoCambiado={() => {}} />
        </div>
      </div>
    );
  }

  // Vista de escritorio como fila de tabla
  return (
    <tr key={client.clienteId} className={rowClassName}>
      <td className={styles.tableCell}>
        <div className={styles.clientInfo}>
          <span className={styles.productName}>{client.cedula}</span>
        </div>
      </td>
      <td className={styles.tableCellSmall}>{client.nombre}</td>
      <td className={styles.tableCellSmall}>{client.correo}</td>
      <td className={styles.tableCellSmall}>{client.telefono}</td>
      <td className={styles.tableCellSmall}>{direccionPrincipal}</td>
      <td className={styles.tableCell}>
        <Badge
          className={
            client.estado === "Activo"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-red-100 text-red-800 hover:bg-red-100"
          }>
          {client.estado === "Activo" ? (
            <CheckCircle2 className="mr-1 h-3 w-3" />
          ) : (
            <XCircle className="mr-1 h-3 w-3" />
          )}
          {client.estado}
        </Badge>
      </td>
      <td className={styles.tableCellRight}>
        <div className="flex justify-end space-x-1">
          {/* Editar cliente */}
          <EditarCliente cliente={client} onClienteEditado={() => {}} />

          {/* Cambiar estado */}
          <CambiarEstado cliente={client} onEstadoCambiado={() => {}} />
        </div>
      </td>
    </tr>
  );
};
