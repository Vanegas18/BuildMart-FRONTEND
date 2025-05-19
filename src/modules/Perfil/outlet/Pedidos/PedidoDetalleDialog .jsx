import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Button } from "@/shared/components/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Package,
  Truck,
  Calendar,
  MapPin,
  CreditCard,
} from "lucide-react";

export const PedidoDetalleDialog = ({
  pedido,
  abierto,
  onCerrar,
  onReintentar,
  onComprarNuevo,
}) => {
  if (!pedido) return null;

  const estadoBadge = () => {
    switch (pedido.estado) {
      case "pagado":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Pagado
          </Badge>
        );
      case "pendiente":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="mr-1 h-3 w-3" />
            Pendiente
          </Badge>
        );
      default:
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="mr-1 h-3 w-3" />
            Cancelado
          </Badge>
        );
    }
  };

  const fechaFormateada = new Date(pedido.fecha).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Dialog open={abierto} onOpenChange={onCerrar}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <span>
                Detalles del Pedido PED-
                {pedido.pedidoId.toString().padStart(4, "0")}
              </span>
            </div>
            {estadoBadge()}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-3 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium">Información del Pedido</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">
                  Fecha del pedido: {fechaFormateada}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">
                  Método de pago: {pedido.metodoPago || "Contraentrega"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium">Información del Cliente</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-700">
                  Nombre: {pedido.clienteId.nombre}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">
                  {/* Email: {pedido.clienteId.email} */}
                </span>
              </div>
              {pedido.direccionEntrega && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                  <span className="text-gray-700">
                    Dirección de entrega: {pedido.direccionEntrega}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-3">Productos</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Precio Unitario</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedido.productos.map((producto, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {producto.productoId.nombre}
                  </TableCell>
                  <TableCell>{producto.cantidad}</TableCell>
                  <TableCell>
                    ${FormateoPrecio(producto.productoId.precio)}
                  </TableCell>
                  <TableCell className="text-right">
                    $
                    {FormateoPrecio(
                      producto.productoId.precio * producto.cantidad
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="flex flex-col gap-1 items-end">
            <div className="flex justify-between w-64 font-bold text-lg border-t border-gray-200 pt-2 mt-2">
              <span>Total:</span>
              <span>${FormateoPrecio(pedido.total)}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6 gap-2">
          <Button variant="outline" onClick={onCerrar}>
            Cerrar
          </Button>
          {pedido.estado === "pagado" && (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={onComprarNuevo}>
              Comprar de Nuevo
            </Button>
          )}
          {pedido.estado === "cancelado" && (
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={onComprarNuevo}>
              Comprar de Nuevo
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
