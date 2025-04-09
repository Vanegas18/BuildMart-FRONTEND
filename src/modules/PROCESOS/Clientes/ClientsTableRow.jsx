import { Button } from "@/shared/components";
import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  Pencil,
  Power,
  XCircle,
} from "lucide-react";
import styles from "./styles/Clients.module.css";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { EditarCliente } from "./EditarCliente/EditarCliente";
import { useCallback, useMemo } from "react";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado";
import { Badge } from "@/shared/components/ui/badge";

export const ClientsTableRow = ({ client }) => {
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

  // Renderizado de la fila de la tabla de clientes
  return (
    <tr key={client.clienteId} className={styles.tableRow}>
      <td className={styles.tableCell}>
        <div className={styles.clientInfo}>
          <span className={styles.clientName}>{client.nombre}</span>
        </div>
      </td>

      <td className={styles.tableCellSmall}>{client.correo}</td>
      <td className={styles.tableCellSmall}>{client.telefono}</td>
      <td className={styles.tableCellSmall}>{client.direccion}</td>
      <td className={styles.tableCellSmall}>{client.departamento}</td>
      <td className={styles.tableCellSmall}>{client.ciudad}</td>
      <td className={styles.tableCell}>
        <Badge
          className={
            client.estado === "activo"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-red-100 text-red-800 hover:bg-red-100"
          }>
          {client.estado === "activo" ? (
            <CheckCircle2 className="mr-1 h-3 w-3" />
          ) : (
            <XCircle className="mr-1 h-3 w-3" />
          )}
          {client.estado === "activo" ? "Activo" : "Inactivo"}
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
