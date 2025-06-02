import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ComprasDetalleDialog } from "./ComprasDetalleDialog";

export const useCompraDetalle = () => {
  const [compraActiva, setCompraActiva] = useState(null);
  const [dialogAbierto, setDialogAbierto] = useState(false);
  const navigate = useNavigate();

  // Abrir el diálogo con los detalles del pedido
  const abrirDetalleCompra = (compra) => {
    setCompraActiva(compra);
    setDialogAbierto(true);
  };

  // Cerrar el diálogo
  const cerrarDetalleCompra = () => {
    setDialogAbierto(false);
    // Opcional: limpiar el pedido activo después de un tiempo para mejorar la experiencia
    setTimeout(() => setCompraActiva(null), 300);
  };

  // Función para manejar la acción "Comprar de nuevo"
  const manejarComprarNuevo = () => {
    cerrarDetalleCompra();
    navigate("/catalogo");
  };

  // Componente que muestra el diálogo
  const DetalleCompraDialog = () => (
    <ComprasDetalleDialog
      compra={compraActiva}
      abierto={dialogAbierto}
      onCerrar={cerrarDetalleCompra}
      onComprarNuevo={manejarComprarNuevo}
    />
  );

  return {
    abrirDetalleCompra,
    cerrarDetalleCompra,
    DetalleCompraDialog,
  };
};
