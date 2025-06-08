import { Button } from "@/shared/components";
import {
  CheckCircle2,
  Clock,
  Eye,
  XCircle,
  User,
  Calendar,
  DollarSign,
  Hash,
} from "lucide-react";
import styles from "../Productos/styles/Products.module.css";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado";
import { useCallback, useMemo, useState } from "react";
import { DetallePedidoModal } from "./DetalleModal/DetallePedidoModal";
import { Badge } from "@/shared/components/ui/badge";

export const OrdersTableRow = ({
  pedido,
  onEstadoCambiado,
  viewMode = "desktop",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para truncar texto
  const truncateText = useCallback((text, maxLength = 30) => {
    if (!text) return "";
    const textString = String(text);
    if (textString.length <= maxLength) return text;
    return textString.substring(0, maxLength) + "...";
  }, []);

  // Memorización de los estilos de la fila para optimizar rendimiento
  const rowClassName = useMemo(() => styles.tableRow, []);

  const generateCompraId = (pedido) => {
    // Verificar si pedidoId existe y es válido
    if (pedido.pedidoId !== undefined && pedido.pedidoId !== null) {
      return `PED-${pedido.pedidoId.toString().padStart(3, "0")}`;
    }

    // Fallback: usar los últimos 3 caracteres del _id si pedidoId no existe
    if (pedido._id) {
      const idStr = pedido._id.toString();
      const lastThree = idStr.slice(-3);
      return `PED-${lastThree}`;
    }

    // Último fallback: usar un valor por defecto
    return "PED-000";
  };

  // Vista móvil como card
  if (viewMode === "mobile") {
    return (
      <>
        <div className={styles.mobileUserCard}>
          <div className={styles.mobileUserHeader}>
            <div className={styles.mobileUserInfo}>
              <div className={styles.mobileUserName}>
                <Hash className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-900">
                  {generateCompraId(pedido)}
                </span>
              </div>
            </div>
            <Badge
              className={
                pedido.estado === "confirmado"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : pedido.estado === "pendiente"
                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  : "bg-red-100 text-red-800 hover:bg-red-100"
              }>
              {pedido.estado === "confirmado" ? (
                <CheckCircle2 className="mr-1 h-3 w-3" />
              ) : pedido.estado === "pendiente" ? (
                <Clock className="mr-1 h-3 w-3" />
              ) : (
                <XCircle className="mr-1 h-3 w-3" />
              )}
              {pedido.estado === "confirmado"
                ? "Confirmado"
                : pedido.estado === "pendiente"
                ? "Pendiente"
                : "Rechazado"}
            </Badge>
          </div>

          <div className={styles.mobileUserDetails}>
            <div className={styles.mobileUserDetailItem}>
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {truncateText(pedido.clienteId?.nombre || "Sin nombre", 25)}
              </span>
            </div>
            <div className={styles.mobileUserDetailItem}>
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {new Date(pedido.fecha).toLocaleDateString()}
              </span>
            </div>
            <div className={styles.mobileUserDetailItem}>
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600 font-medium">
                ${FormateoPrecio(pedido.subtotal)}
              </span>
            </div>
          </div>

          <div className={styles.mobileUserActions}>
            <Button
              variant="ghost"
              size="sm"
              title="Ver Pedido"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Ver Detalle
            </Button>
            <CambiarEstado
              pedido={pedido}
              onEstadoCambiado={onEstadoCambiado}
            />
          </div>
        </div>

        {/* Modal de Detalle del Pedido */}
        <DetallePedidoModal
          open={isModalOpen}
          onClose={setIsModalOpen}
          pedido={pedido}
        />
      </>
    );
  }

  // Vista de escritorio como fila de tabla
  return (
    <>
      <tr key={pedido._id} className={rowClassName}>
        {/* ID del pedido */}
        <td className={styles.tableCell}>
          <div className={styles.productInfo}>
            <p className={styles.productName}>{generateCompraId(pedido)}</p>
          </div>
        </td>

        {/* Cliente */}
        <td className={styles.tableCellSmall}>
          {(pedido.clienteId?.nombre?.length > 10
            ? pedido.clienteId.nombre.slice(0, 12) + "..."
            : pedido.clienteId?.nombre) || "Sin nombre"}
        </td>

        {/* Fecha */}
        <td className={styles.tableCellSmall}>
          {new Date(pedido.fecha).toLocaleDateString()}
        </td>

        {/* Total */}
        <td className={styles.tableCellSmall}>
          ${FormateoPrecio(pedido.subtotal)}
        </td>

        {/* Estado */}
        <td className={styles.tableCellSmall}>
          <Badge
            className={
              pedido.estado === "confirmado"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : pedido.estado === "pendiente"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                : "bg-red-100 text-red-800 hover:bg-red-100"
            }>
            {pedido.estado === "confirmado" ? (
              <CheckCircle2 className="mr-1 h-3 w-3" />
            ) : pedido.estado === "pendiente" ? (
              <Clock className="mr-1 h-3 w-3" />
            ) : (
              <XCircle className="mr-1 h-3 w-3" />
            )}
            {pedido.estado === "confirmado"
              ? "Confirmado"
              : pedido.estado === "pendiente"
              ? "Pendiente"
              : "Rechazado"}
          </Badge>
        </td>

        {/* Acciones */}
        <td className={styles.tableCellRight}>
          <div className="flex justify space-x-4">
            <Button
              variant="ghost"
              size="icon"
              title="Ver Pedido"
              onClick={() => setIsModalOpen(true)}>
              <Eye className="h-4 w-4 " />
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
