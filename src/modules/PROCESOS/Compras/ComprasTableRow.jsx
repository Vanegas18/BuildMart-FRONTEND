import { useEffect, useMemo, useState } from "react";
import { getProveedorById } from "@/core/api/Proveedores/proveedores";
import { Button } from "@/shared/components";
import { CheckCircle2, Clock, Eye, RefreshCcw, XCircle } from "lucide-react";
import styles from "../Productos/styles/Products.module.css";
import styles2 from "../../Dashboard/components/Main/styles/ContentDashboard.module.css";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado";
import { DetalleCompraModal } from "./DetalleModal/DetalleCompraModal";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Badge } from "@/shared/components/ui/badge";

export const ComprasTableRow = ({ compra, onEstadoCambiado }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proveedor, setProveedor] = useState(null);

  // Memorización de los estilos de la fila para optimizar rendimiento
  const rowClassName = useMemo(() => styles.tableRow, []);

  useEffect(() => {
    const fetchDatosRelacionados = async () => {
      try {
        // CORRECCIÓN: Usar compra.proveedor en lugar de compra.proveedorId
        const proveedorId = compra.proveedor;

        // Si no hay ID o es un valor inválido
        if (!proveedorId) {
          setProveedor({ nombre: "Proveedor no definido" });
          return;
        }

        // Si es un objeto ya (quizás ya viene incluido en la compra)
        if (typeof proveedorId === "object" && proveedorId !== null) {
          setProveedor(proveedorId);
          return;
        }

        // Si es un string (ID), hacer la petición
        if (typeof proveedorId === "string" && proveedorId.trim() !== "") {
          const proveedorResponse = await getProveedorById(proveedorId);

          if (proveedorResponse && proveedorResponse.data) {
            setProveedor(proveedorResponse.data);
          } else {
            setProveedor({ nombre: "Datos incompletos" });
          }
        } else {
          setProveedor({ nombre: "Formato de ID no válido" });
        }
      } catch (error) {
        console.error("Error al obtener el proveedor:", error);
        setProveedor({ nombre: "Error: " + (error.message || "Desconocido") });
      }
    };

    fetchDatosRelacionados();
  }, [compra.proveedor]); // CORRECCIÓN: Actualizar la dependencia también

  // SOLUCIÓN: Función para generar el ID de compra de forma segura
  const generateCompraId = (compra) => {
    // Verificar si compraId existe y es válido
    if (compra.compraId !== undefined && compra.compraId !== null) {
      return `COM-${compra.compraId.toString().padStart(3, "0")}`;
    }
    
    // Fallback: usar los últimos 3 caracteres del _id si compraId no existe
    if (compra._id) {
      const idStr = compra._id.toString();
      const lastThree = idStr.slice(-3);
      return `COM-${lastThree}`;
    }
    
    // Último fallback: usar un valor por defecto
    return "COM-000";
  };

  return (
    <>
      <tr key={compra._id} className={rowClassName}>
        {/* ID de la compra - CORREGIDO */}
        <td>
          <div className={styles.productInfo}>
            <p className={styles.productName}>
              {generateCompraId(compra)}
            </p>
          </div>
        </td>

        {/* Proveedor */}
        <td className={styles.tableCellSmall3}>
          <span
            className={styles.clientName}
            title={`ID: ${proveedor?._id || "Sin ID"}`}>
            {proveedor?.nombre || "Sin nombre"}
          </span>
        </td>

        {/* Fecha de la compra */}
        <td className={styles.tableCellSmall3}>
          {new Date(compra.fecha).toLocaleDateString()}
        </td>

        {/* Total de la compra */}
        <td className={styles.tableCellSmall3}>
          ${FormateoPrecio(compra.total)}
        </td>

        {/* Estado de la compra */}
        <td className={styles.tableCellSmall3}>
          <Badge
            className={
              compra.estado === "Completado"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : compra.estado === "Pendiente"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                : compra.estado === "Cancelado"
                ? "bg-red-100 text-red-800 hover:bg-red-100"
                : "bg-purple-100 text-purple-800 hover:bg-purple-100"
            }>
            {compra.estado === "Completado" ? (
              <CheckCircle2 className="mr-1 h-3 w-3" />
            ) : compra.estado === "Pendiente" ? (
              <Clock className="mr-1 h-3 w-3" />
            ) : compra.estado === "Cancelado" ? (
              <XCircle className="mr-1 h-3 w-3" />
            ) : (
              <RefreshCcw className="mr-1 h-3 w-3" />
            )}
            {compra.estado}
          </Badge>
        </td>

        {/* Acciones */}
        <td className={styles.tableCellRight3}>
          <div className="flex justify-end space-x-1">
            {/* Botón para ver la compra */}
            <Button
              as="div"
              variant="ghost"
              size="icon"
              title="Ver Compra"
              onClick={() => setIsModalOpen(true)}>
              <Eye className="h-4 w-4" />
            </Button>

            {/* Botón para cambiar el estado */}
            <CambiarEstado
              compra={compra}
              onEstadoCambiado={onEstadoCambiado}
            />
          </div>
        </td>
      </tr>

      {/* Modal de Detalle de la Compra */}
      <DetalleCompraModal
        open={isModalOpen}
        onClose={setIsModalOpen}
        compra={compra}
      />
    </>
  );
};