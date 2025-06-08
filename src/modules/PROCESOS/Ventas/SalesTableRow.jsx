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
  User,
  Calendar,
  DollarSign,
  Hash,
} from "lucide-react";
import styles from "../Productos/styles/Products.module.css";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado";
import { useCallback, useMemo, useState } from "react";
import { DetalleVentaModal } from "./DetalleModal/DetalleVentaModal";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Badge } from "@/shared/components/ui/badge";

export const SalesTableRow = ({
  venta,
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

  // Función para obtener el icono del estado
  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "completado":
        return <CheckCircle2 className="mr-1 h-3 w-3" />;
      case "entregado":
        return <Package className="mr-1 h-3 w-3" />;
      case "enviado":
        return <Truck className="mr-1 h-3 w-3" />;
      case "procesando":
        return <Clock className="mr-1 h-3 w-3" />;
      case "reembolsado":
        return <RefreshCcw className="mr-1 h-3 w-3" />;
      default:
        return <AlertCircle className="mr-1 h-3 w-3" />;
    }
  };

  // Función para obtener la clase CSS del estado
  const getEstadoClassName = (estado) => {
    switch (estado) {
      case "completado":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "entregado":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "enviado":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "procesando":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "reembolsado":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
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
                  VEN-{venta.ventaId.toString().padStart(3, "0")}
                </span>
              </div>
            </div>
            <Badge className={getEstadoClassName(venta.estado)}>
              {getEstadoIcon(venta.estado)}
              {venta.estado.charAt(0).toUpperCase() + venta.estado.slice(1)}
            </Badge>
          </div>

          <div className={styles.mobileUserDetails}>
            <div className={styles.mobileUserDetailItem}>
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {truncateText(venta.clienteId?.nombre || "Sin nombre", 25)}
              </span>
            </div>
            <div className={styles.mobileUserDetailItem}>
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {new Date(venta.fecha).toLocaleDateString()}
              </span>
            </div>
            <div className={styles.mobileUserDetailItem}>
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600 font-medium">
                ${FormateoPrecio(venta.subtotal)}
              </span>
            </div>
          </div>

          <div className={styles.mobileUserActions}>
            <Button
              variant="ghost"
              size="sm"
              title="Ver Venta"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Ver Detalle
            </Button>
            <CambiarEstado venta={venta} onEstadoCambiado={onEstadoCambiado} />
          </div>
        </div>

        {/* Modal de Detalle de la Venta */}
        <DetalleVentaModal
          open={isModalOpen}
          onClose={setIsModalOpen}
          venta={venta}
        />
      </>
    );
  }

  // Vista de escritorio como fila de tabla
  return (
    <>
      <tr key={venta._id} className={rowClassName}>
        {/* ID de la venta */}
        <td className={styles.tableCell}>
          <div className={styles.productInfo}>
            <p className={styles.productName}>
              VEN-{venta.ventaId.toString().padStart(3, "0")}
            </p>
          </div>
        </td>

        {/* Cliente */}
        <td className={styles.tableCellSmall}>
          {(venta.clienteId?.nombre?.length > 10
            ? venta.clienteId.nombre.slice(0, 12) + "..."
            : venta.clienteId?.nombre) || "Sin nombre"}
        </td>

        {/* Fecha de la venta */}
        <td className={styles.tableCellSmall}>
          {new Date(venta.fecha).toLocaleDateString()}
        </td>

        {/* Total de la venta */}
        <td className={styles.tableCellSmall}>
          ${FormateoPrecio(venta.subtotal)}
        </td>

        {/* Estado de la venta */}
        <td className={styles.tableCellSmall}>
          <Badge className={getEstadoClassName(venta.estado)}>
            {getEstadoIcon(venta.estado)}
            {venta.estado.charAt(0).toUpperCase() + venta.estado.slice(1)}
          </Badge>
        </td>

        {/* Acciones */}
        <td className={styles.tableCellRight3}>
          <div className="flex justify space-x-1">
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
