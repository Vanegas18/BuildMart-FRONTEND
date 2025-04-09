import { Button } from "@/shared/components";
import { CheckCircle2, Clock, Eye, XCircle } from "lucide-react";
import styles from "./styles/Orders.module.css";
import { FormateoPrecio } from "@/modules/Dashboard/Layout"; // ya no se usa
import { CambiarEstado } from "./CambiarEstado/CambiarEstado";
import { useState } from "react";
import { DetallePedidoModal } from "./DetalleModal/DetallePedidoModal";
import { Badge } from "@/shared/components/ui/badge";

export const OrdersTableRow = ({ pedido, onEstadoCambiado }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              title={`ID: ${pedido.clienteId?._id || "Sin ID"}`}>
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
          <Badge
            className={
              pedido.estado === "pagado"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : pedido.estado === "pendiente"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                : "bg-red-100 text-red-800 hover:bg-red-100"
            }>
            {pedido.estado === "pagado" ? (
              <CheckCircle2 className="mr-1 h-3 w-3" />
            ) : pedido.estado === "pendiente" ? (
              <Clock className="mr-1 h-3 w-3" />
            ) : (
              <XCircle className="mr-1 h-3 w-3" />
            )}
            {pedido.estado}
          </Badge>
        </td>

        {/* Acciones */}
        <td className={styles.tableCellRight}>
          <div className="flex justify-end space-x-1">
            <Button
              variant="ghost"
              size="icon"
              title="Ver Pedido"
              onClick={() => setIsModalOpen(true)}>
              <Eye className="h-4 w-4" />
            </Button>
            <CambiarEstado
              pedido={pedido}
              onEstadoCambiado={onEstadoCambiado}
            />
          </div>
        </td>
      </tr>

      {/* Modal de Detalle del Pedido */}
      <DetallePedidoModal
        open={isModalOpen}
        onClose={setIsModalOpen}
        pedido={pedido}
      />
    </>
  );
};
