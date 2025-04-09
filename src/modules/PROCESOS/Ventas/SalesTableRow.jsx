import { Button } from "@/shared/components";
import { CheckCircle2, Clock, Eye, RefreshCcw, XCircle } from "lucide-react";
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
        <td className={styles.tableCellSmall3}>
          <div className={styles.productInfo}>
            <span className={styles.productName}>{venta.ventaId}</span>
          </div>
        </td>

        {/* Cliente */}
        <td className={styles.tableCellSmall3}>
          <span
            className={styles.clientName}
            title={`ID: ${venta.clienteId?._id || "Sin ID"}`}>
            {venta.clienteId?.nombre || "Sin nombre"}
          </span>
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
              venta.estado === "Completada"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : venta.estado === "Pendiente"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                : venta.estado === "Cancelada"
                ? "bg-red-100 text-red-800 hover:bg-red-100"
                : "bg-purple-100 text-purple-800 hover:bg-purple-100" // Para "Reembolsada"
            }>
            {venta.estado === "Completada" ? (
              <CheckCircle2 className="mr-1 h-3 w-3" />
            ) : venta.estado === "Pendiente" ? (
              <Clock className="mr-1 h-3 w-3" />
            ) : venta.estado === "Cancelada" ? (
              <XCircle className="mr-1 h-3 w-3" />
            ) : (
              <RefreshCcw className="mr-1 h-3 w-3" /> // Icono para "Reembolsada"
            )}
            {venta.estado}
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
