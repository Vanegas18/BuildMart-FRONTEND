import { Button } from "@/shared/components";
import { CheckCircle2, Clock, Eye, XCircle } from "lucide-react";
import styles from "../Productos/styles/Products.module.css";
import { FormateoPrecio } from "@/modules/Dashboard/Layout"; // ya no se usa
import { CambiarEstado } from "./CambiarEstado/CambiarEstado";
import { useMemo, useState } from "react";
import { DetallePedidoModal } from "./DetalleModal/DetallePedidoModal";
import { Badge } from "@/shared/components/ui/badge";

export const OrdersTableRow = ({ pedido, onEstadoCambiado }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memorización de los estilos de la fila para optimizar rendimiento
  const rowClassName = useMemo(() => styles.tableRow, []);

  return (
    <>
      <tr key={pedido._id} className={rowClassName}>
        {/* ID del pedido */}
        <td>
          <div className={styles.productInfo}>
            <p className={styles.productName}>
              PED-{pedido.pedidoId.toString().padStart(3, "0")}
            </p>
          </div>
        </td>

        {/* Cliente */}
        <td className={styles.tableCellSmall3}>
          {(pedido.clienteId?.nombre?.length > 10
            ? pedido.clienteId.nombre.slice(0, 12) + "..."
            : pedido.clienteId?.nombre) || "Sin nombre"}
        </td>

        {/* Fecha */}
        <td className={styles.tableCellSmall2}>
          {new Date(pedido.fecha).toLocaleDateString()}
        </td>

        {/* Total */}
        <td className={styles.tableCellSmall2}>
          ${FormateoPrecio(pedido.total)}
        </td>

        {/* Estado */}
        <td className={styles.tableCellSmall2}>
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
            {pedido.estado === "pagado"
              ? "Pagado"
              : pedido.estado === "pendiente"
              ? "Pendiente"
              : "Cancelado"}
          </Badge>
        </td>

        {/* Acciones */}
        <td className={styles.tableCellRight2}>
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
