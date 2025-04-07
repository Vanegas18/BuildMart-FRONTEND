import { Button } from "@/shared/components";
import { AlertTriangle, Eye, Pencil, Power } from "lucide-react";
import styles from "./styles/Clients.module.css";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { EditarCliente } from "./EditarCliente/EditarCliente";
import { useCallback, useMemo } from "react";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado";

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
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(
            client.estado
          )}`}>
          {client.estado}
        </span>
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
