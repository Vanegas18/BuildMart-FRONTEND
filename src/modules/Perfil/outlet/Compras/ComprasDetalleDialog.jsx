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
  Package,
  Truck,
  Calendar,
  CreditCard,
  Hash,
  ShoppingCart,
  RotateCcw,
} from "lucide-react";

export const ComprasDetalleDialog = ({
  compra,
  abierto,
  onCerrar,
  onComprarNuevo,
}) => {
  // Función para obtener el badge del estado (actualizada)
  const estadoBadge = () => {
    switch (compra?.estado?.toLowerCase()) {
      case "procesando":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Clock className="mr-1 h-3 w-3" />
            Procesando
          </Badge>
        );
      case "enviado":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Truck className="mr-1 h-3 w-3" />
            Enviado
          </Badge>
        );
      case "entregado":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            <Package className="mr-1 h-3 w-3" />
            Entregado
          </Badge>
        );
      case "completado":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Completado
          </Badge>
        );
      case "reembolsado":
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            <RotateCcw className="mr-1 h-3 w-3" />
            Reembolsado
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <Clock className="mr-1 h-3 w-3" />
            {compra?.estado || "Desconocido"}
          </Badge>
        );
    }
  };

  // Calcular subtotal de productos
  const calcularSubtotal = () => {
    if (!compra?.productos) return 0;
    return compra.productos.reduce((total, item) => {
      const precio = item.productoId?.precio || 0;
      const cantidad = item.cantidad || 0;
      return total + precio * cantidad;
    }, 0);
  };

  const subtotal = calcularSubtotal();
  const total = compra?.total || 0;

  return (
    <Dialog open={abierto} onOpenChange={onCerrar}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <span>
                Detalles de la compra COM-
                {compra?.ventaId?.toString().padStart(4, "0") ||
                  compra?._id?.slice(-4)}
              </span>
            </div>
            {compra && estadoBadge()}
          </DialogTitle>
        </DialogHeader>

        {compra && (
          <div className="space-y-6">
            {/* Información general */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Hash className="h-4 w-4 mr-2" />
                    Información de la Compra
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID de Venta:</span>
                      <span className="font-medium">
                        COM-{compra.ventaId?.toString().padStart(4, "0")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fecha:</span>
                      <span className="font-medium">
                        {new Date(compra.fecha).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Resumen de Pago
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">
                        ${FormateoPrecio(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Envío:</span>
                      <span className="font-medium">
                        $
                        {FormateoPrecio(
                          total - subtotal >= 0 ? total - subtotal : 0
                        )}
                      </span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-blue-600">
                          ${FormateoPrecio(total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Productos */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Productos Comprados ({compra.productos?.length || 0})
              </h3>

              {compra.productos && compra.productos.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="w-16">#</TableHead>
                        <TableHead>Producto</TableHead>
                        <TableHead className="text-center">Cantidad</TableHead>
                        <TableHead className="text-right">
                          Precio Unit.
                        </TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {compra.productos.map((item, index) => (
                        <TableRow key={item._id || index}>
                          <TableCell className="font-medium">
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                                <Package className="h-5 w-5 text-gray-500" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {item.productoId?.nombre ||
                                    "Producto no disponible"}
                                </p>
                                {item.productoId?.categoria && (
                                  <p className="text-xs text-gray-500">
                                    {item.productoId.categoria}
                                  </p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                              {item.cantidad || 0}
                            </span>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ${FormateoPrecio(item.productoId?.precio || 0)}
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            $
                            {FormateoPrecio(
                              (item.productoId?.precio || 0) *
                                (item.cantidad || 0)
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No hay productos en esta compra</p>
                </div>
              )}
            </div>

            {/* Timeline de estados actualizado */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Estado Actual
              </h3>
              <div className="flex items-center gap-2 text-sm">
                {compra.estado?.toLowerCase() === "completado" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 font-medium">
                      Compra completada exitosamente
                    </span>
                  </>
                ) : compra.estado?.toLowerCase() === "entregado" ? (
                  <>
                    <Package className="h-4 w-4 text-purple-600" />
                    <span className="text-purple-600 font-medium">
                      Producto entregado
                    </span>
                  </>
                ) : compra.estado?.toLowerCase() === "enviado" ? (
                  <>
                    <Truck className="h-4 w-4 text-yellow-600" />
                    <span className="text-yellow-600 font-medium">
                      Producto en camino
                    </span>
                  </>
                ) : compra.estado?.toLowerCase() === "reembolsado" ? (
                  <>
                    <RotateCcw className="h-4 w-4 text-orange-600" />
                    <span className="text-orange-600 font-medium">
                      Compra reembolsada
                    </span>
                  </>
                ) : compra.estado?.toLowerCase() === "procesando" ? (
                  <>
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-600 font-medium">
                      Procesando tu pedido
                    </span>
                  </>
                ) : (
                  <>
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-600 font-medium">
                      Estado desconocido
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={onCerrar}>
            Cerrar
          </Button>
          <div className="flex gap-2">
            {(compra?.estado?.toLowerCase() === "completado" ||
              compra?.estado?.toLowerCase() === "entregado") && (
              <Button
                onClick={onComprarNuevo}
                className="bg-blue-600 hover:bg-blue-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Comprar de Nuevo
              </Button>
            )}
            {compra?.estado?.toLowerCase() === "reembolsado" && (
              <Button
                onClick={onComprarNuevo}
                className="bg-blue-600 hover:bg-blue-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Realizar Nueva Compra
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
