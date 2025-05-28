import { Button } from "@/shared/components";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  Package,
  RefreshCcw,
  Truck,
  XCircle,
} from "lucide-react";
import styles from "../Productos/styles/Products.module.css";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado";
import { useMemo, useState } from "react";
import { DetalleVentaModal } from "./DetalleModal/DetalleVentaModal"; // Modal para mostrar detalles de la venta
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Badge } from "@/shared/components/ui/badge";

export const SalesTableRow = ({ venta, onEstadoCambiado }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memorización de los estilos de la fila para optimizar rendimiento
  const rowClassName = useMemo(() => styles.tableRow, []);

  return (
    <>
      <tr key={venta._id} className={rowClassName}>
        {/* ID de la venta */}
        <td>
          <div className={styles.productInfo}>
            <p className={styles.productName}>
              VEN-{venta.ventaId.toString().padStart(3, "0")}
            </p>
          </div>
        </td>

        {/* Cliente */}
        <td className={styles.tableCellSmall3}>
          {(venta.clienteId?.nombre?.length > 10
            ? venta.clienteId.nombre.slice(0, 12) + "..."
            : venta.clienteId?.nombre) || "Sin nombre"}
        </td>

        {/* Fecha de la venta */}
        <td className={styles.tableCellSmall3}>
          {new Date(venta.fecha).toLocaleDateString()}
        </td>

        {/* Total de la venta */}
        <td className={styles.tableCellSmall3}>
          ${FormateoPrecio(venta.total)}
        </td>

        {/* Estado de la venta */}
        <td className={styles.tableCellSmall3}>
          <Badge
            className={
              venta.estado === "completado"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : venta.estado === "entregado"
                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                : venta.estado === "enviado"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                : venta.estado === "procesando"
                ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                : venta.estado === "reembolsado"
                ? "bg-red-100 text-red-800 hover:bg-red-100"
                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
            }>
            {venta.estado === "completado" ? (
              <CheckCircle2 className="mr-1 h-3 w-3" />
            ) : venta.estado === "entregado" ? (
              <Package className="mr-1 h-3 w-3" />
            ) : venta.estado === "enviado" ? (
              <Truck className="mr-1 h-3 w-3" />
            ) : venta.estado === "procesando" ? (
              <Clock className="mr-1 h-3 w-3" />
            ) : venta.estado === "reembolsado" ? (
              <RefreshCcw className="mr-1 h-3 w-3" />
            ) : (
              <AlertCircle className="mr-1 h-3 w-3" />
            )}
            {venta.estado.charAt(0).toUpperCase() + venta.estado.slice(1)}
          </Badge>
        </td>

        {/* Acciones */}
        <td className={styles.tableCellRight3}>
          <div className="flex justify-end space-x-1">
            <Button
              variant="ghost"
              size="icon"
              title="Ver Venta"
              onClick={() => setIsModalOpen(true)}>
              <Eye className="h-4 w-4" />
            </Button>
            <CambiarEstado venta={venta} onEstadoCambiado={onEstadoCambiado} />
          </div>
        </td>
      </tr>

      {/* Modal de Detalle de la Venta */}
      <DetalleVentaModal
        open={isModalOpen}
        onClose={setIsModalOpen}
        venta={venta}
      />
    </>
  );
};
