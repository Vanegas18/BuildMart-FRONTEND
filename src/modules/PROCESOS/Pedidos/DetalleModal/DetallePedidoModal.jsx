import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/shared/components/ui/dialog";
  import { Button } from "@/shared/components";
  import { FormateoPrecio } from "@/modules/Dashboard/Layout";
  
  export const DetallePedidoModal = ({ open, onClose, pedido }) => {
    if (!pedido) return null; // Si no hay pedido, no mostrar nada
  
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl"> {/* Modal más ancho */}
          <DialogHeader>
            <DialogTitle>Detalles del Pedido</DialogTitle>
          </DialogHeader>
  
          <div className="py-4">
            {/* Contenedor de la información del pedido */}
            <div className="flex justify-between mb-4">
              <div>
                <strong>ID del Pedido:</strong> {pedido.pedidoId}
              </div>
              <div>
                <strong>Cliente:</strong> {pedido.clienteId?.nombre || "Sin nombre"}
              </div>
            </div>
  
            {/* Contenedor de la fecha y el estado */}
            <div className="flex justify-between mb-4">
              <div>
                <strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleDateString()}
              </div>
              <div>
                <strong>Estado:</strong> {pedido.estado}
              </div>
            </div>
  
            <h3 className="mt-4 font-medium">Productos</h3>
  
            {/* Tabla con scroll si hay muchos productos */}
            <div className="max-h-60 overflow-y-auto mt-2 rounded border">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left px-4 py-2 border border-gray-300">Producto</th>
                    <th className="text-left px-4 py-2 border border-gray-300">Cantidad</th>
                    <th className="text-left px-4 py-2 border border-gray-300">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {pedido.productos?.map((producto, index) => (
                    <tr key={index} className="odd:bg-gray-50 even:bg-gray-200">
                      <td className="px-4 py-2 border border-gray-300">{producto.productoId.nombre}</td>
                      <td className="px-4 py-2 border border-gray-300">{producto.cantidad}</td>
                      <td className="px-4 py-2 border border-gray-300">
                        {FormateoPrecio(producto.productoId.precio)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
  
            <div className="mt-4">
              <strong>Total:</strong> {FormateoPrecio(pedido.total)}
            </div>
          </div>
  
          <DialogFooter>
            <Button onClick={() => onClose(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  