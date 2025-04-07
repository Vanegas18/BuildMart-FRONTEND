import { Button } from "@/shared/components";
import { Eye } from "lucide-react";
import styles from "./styles/Orders.module.css";
import { FormateoPrecio } from "@/modules/Dashboard/Layout"; // ya no se usa
import { CambiarEstado } from "./CambiarEstado/CambiarEstado";
import { useState } from "react";
import { DetallePedidoModal } from "./DetalleModal/DetallePedidoModal";

export const OrdersTableRow = ({ pedido, onEstadoCambiado }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusClass = (estado) => {
    switch (estado) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "pagado":
        return "bg-green-100 text-green-800";
      case "cancelado":
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <>
      <tr key={pedido.pedidoId} className={styles.tableRow}>
        {/* ID del pedido */}
        <td className={styles.tableCellSmall}>{pedido.pedidoId}</td>

        {/* Cliente */}
        <td className={styles.tableCell}>
          <div className={styles.clientInfo}>
            <span
              className={styles.clientName}
              title={`ID: ${pedido.clienteId?._id || "Sin ID"}`}
            >
              {pedido.clienteId?.nombre || "Sin nombre"}
            </span>
          </div>
        </td>

        {/* Fecha */}
        <td className={styles.tableCellSmall}>
          {new Date(pedido.fecha).toLocaleDateString()}
        </td>

        {/* Total */}
        <td className={styles.tableCellSmall}>
          ${FormateoPrecio(pedido.total)}
        </td>

        {/* Estado */}
        <td className={styles.tableCell}>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(
              pedido.estado
            )}`}
          >
            {pedido.estado}
          </span>
        </td>

        {/* Acciones */}
        <td className={styles.tableCellRight}>
          <div className="flex justify-end space-x-1">
            <Button
              variant="ghost"
              size="icon"
              title="Ver Pedido"
              onClick={() => setIsModalOpen(true)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <CambiarEstado pedido={pedido} onEstadoCambiado={onEstadoCambiado} />
          </div>
        </td>
      </tr>

      {/* Modal de Detalle del Pedido */}
      <DetallePedidoModal open={isModalOpen} onClose={setIsModalOpen} pedido={pedido} />
    </>
  );
};
