import { CheckCircle2, XCircle } from "lucide-react";
import styles from "../Productos/styles/Products.module.css";
import { EditarCliente } from "./EditarCliente/EditarCliente";
import { useMemo } from "react";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado";
import { Badge } from "@/shared/components/ui/badge";

export const ClientsTableRow = ({ client }) => {
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

  // Renderizado de la fila de la tabla de clientes
  return (
    <tr key={client.clienteId} className={styles.tableRow}>
      <td className={styles.tableCell3}>
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
