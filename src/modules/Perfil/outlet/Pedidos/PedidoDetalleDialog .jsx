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
  Tag,
  Calculator,
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
      case "confirmado":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Confirmado
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
            Rechazado
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
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
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
                  Email: {pedido.clienteId?.correo}
                </span>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-gray-700">
                  Dirección de entrega: {pedido.direccionEntrega}
                </span>
              </div>
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
              {pedido.productos.map((producto, index) => {
                const precioUnitario = producto.precioUnitario || 0;
                const precioOriginal =
                  producto.precioOriginal || precioUnitario;
                const enOferta = producto.enOferta === true;
                const subtotalProducto =
                  producto.subtotalProducto ||
                  precioUnitario * producto.cantidad;

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span>
                            {producto.productoId?.nombre || "Producto"}
                          </span>
                          {enOferta && (
                            <Badge
                              variant="secondary"
                              className="bg-orange-100 text-orange-800 text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              Oferta
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{producto.cantidad}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>${FormateoPrecio(precioUnitario)}</span>
                        {enOferta && precioOriginal > precioUnitario && (
                          <span className="text-sm text-gray-500 line-through">
                            ${FormateoPrecio(precioOriginal)}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      ${FormateoPrecio(subtotalProducto)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-gray-700 font-medium mb-3 flex items-center">
              <Calculator className="mr-2 h-4 w-4 text-gray-600" />
              Resumen del Pedido
            </h4>

            <div className="space-y-3">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal:</span>
                <span>${FormateoPrecio(pedido.subtotal || 0)}</span>
              </div>

              {/* IVA */}
              {pedido.iva && pedido.iva > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">IVA:</span>
                  <span>${FormateoPrecio(pedido.iva)}</span>
                </div>
              )}

              {/* Domicilio */}
              {pedido.domicilio && pedido.domicilio > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-1">
                    Domicilio:
                  </span>
                  <span>${FormateoPrecio(pedido.domicilio)}</span>
                </div>
              )}

              {/* Separador */}
              <div className="border-t border-gray-300 my-3"></div>

              {/* Total */}
              <div className="flex justify-between items-center bg-white rounded-md p-3 border border-gray-200">
                <span className="font-bold text-lg text-gray-800">Total:</span>
                <span className="font-bold text-xl text-gray-900">
                  ${FormateoPrecio(pedido.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6 gap-2">
          <Button variant="outline" onClick={onCerrar}>
            Cerrar
          </Button>
          {pedido.estado === "confirmado" && (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={onComprarNuevo}>
              Comprar de Nuevo
            </Button>
          )}
          {pedido.estado === "rechazado" && (
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
