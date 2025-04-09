import { Button } from "@/shared/components";
import { CheckCircle2, Clock, Eye, RefreshCcw, XCircle } from "lucide-react";
import styles from "./styles/Sales.module.css"; // Asegúrate de que las clases de estilo estén definidas correctamente en este archivo
import { CambiarEstado } from "./CambiarEstado/CambiarEstado";
import { useState } from "react";
import { DetalleVentaModal } from "./DetalleModal/DetalleVentaModal"; // Modal para mostrar detalles de la venta
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Badge } from "@/shared/components/ui/badge";

export const SalesTableRow = ({ venta, onEstadoCambiado }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para determinar el color del estado
  const getStatusClass = (estado) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "Completada":
        return "bg-green-100 text-green-800";
      case "Cancelada":
        return "bg-red-100 text-red-800";
      case "Reembolsada":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <tr key={venta._id} className={styles.tableRow}>
        {/* ID de la venta */}
        <td className={styles.tableCellSmall}>{venta.ventaId}</td>

        {/* Cliente */}
        <td className={styles.tableCell}>
          <div className={styles.clientInfo}>
            <span
              className={styles.clientName}
              title={`ID: ${venta.clienteId?._id || "Sin ID"}`}>
              {venta.clienteId?.nombre || "Sin nombre"}
            </span>
          </div>
        </td>

        {/* Fecha de la venta */}
        <td className={styles.tableCellSmall}>
          {new Date(venta.fecha).toLocaleDateString()}
        </td>

        {/* Total de la venta */}
        <td className={styles.tableCellSmall}>
          ${FormateoPrecio(venta.total)}
        </td>

        {/* Estado de la venta */}
        <td className={styles.tableCell}>
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
        <td className={styles.tableCellRight}>
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
