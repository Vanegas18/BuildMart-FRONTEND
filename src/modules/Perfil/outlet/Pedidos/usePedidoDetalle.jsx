import { useNavigate } from "react-router";
import { useState } from "react";
import { PedidoDetalleDialog } from "./PedidoDetalleDialog ";

export const usePedidoDetalle = () => {
  const [pedidoActivo, setPedidoActivo] = useState(null);
  const [dialogAbierto, setDialogAbierto] = useState(false);
  const navigate = useNavigate();

  // Abrir el diálogo con los detalles del pedido
  const abrirDetallePedido = (pedido) => {
    setPedidoActivo(pedido);
    setDialogAbierto(true);
  };

  // Cerrar el diálogo
  const cerrarDetallePedido = () => {
    setDialogAbierto(false);
    // Opcional: limpiar el pedido activo después de un tiempo para mejorar la experiencia
    setTimeout(() => setPedidoActivo(null), 300);
  };

  // Función para manejar la acción "Comprar de nuevo"
  const manejarComprarNuevo = () => {
    cerrarDetallePedido();
    navigate("/catalogo");
  };

  // Componente que muestra el diálogo
  const DetallePedidoDialog = () => (
    <PedidoDetalleDialog
      pedido={pedidoActivo}
      abierto={dialogAbierto}
      onCerrar={cerrarDetallePedido}
      onComprarNuevo={manejarComprarNuevo}
    />
  );

  return {
    abrirDetallePedido,
    cerrarDetallePedido,
    DetallePedidoDialog,
  };
};
