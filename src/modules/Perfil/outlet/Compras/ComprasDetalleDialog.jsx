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
  Calendar,
  CreditCard,
  Hash,
  ShoppingCart,
  ShoppingBag,
  User,
  CalendarDays,
  Tag,
  Package2,
  Calculator,
  Clock,
  Truck,
  Package,
  CheckCircle2,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";

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

  return (
    <Dialog open={abierto} onOpenChange={onCerrar}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
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
            {/* Información General */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700 font-medium">
                      <Tag className="mr-2 h-4 w-4 text-gray-600" />
                      ID de la Venta
                    </div>
                    <div className="ml-6 text-gray-800">
                      VEN-{compra.ventaId.toString().padStart(3, "0")}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700 font-medium">
                      <CalendarDays className="mr-2 h-4 w-4 text-gray-600" />
                      Fecha
                    </div>
                    <div className="ml-6 text-gray-800">
                      {new Date(compra.fecha).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700 font-medium">
                      <User className="mr-2 h-4 w-4 text-gray-600" />
                      Cliente
                    </div>
                    <div className="ml-6 text-gray-800">
                      {compra.clienteId?.nombre || "Sin nombre"}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700 font-medium">
                      <Tag className="mr-2 h-4 w-4 text-gray-600" />
                      Estado
                    </div>
                    <div className="ml-6">{estadoBadge()}</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-gray-700 font-medium mb-3 flex items-center">
                    Información de Contacto
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="mr-2 h-3 w-3" />
                          Teléfono
                        </div>
                        <div className="ml-5 text-gray-800">
                          {compra.clienteId?.telefono || "No disponible"}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="mr-2 h-3 w-3" />
                          Correo
                        </div>
                        <div className="ml-5 text-gray-800">
                          {compra.clienteId?.correo || "No disponible"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="mr-2 h-3 w-3" />
                        Dirección de Entrega
                      </div>
                      <div className="ml-5 text-gray-800">
                        {compra.direccionEntrega || "No especificada"}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Productos */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center text-gray-700 font-medium mb-4">
                  <Package2 className="mr-2 h-4 w-4 text-gray-600" />
                  Productos Vendidos
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  Lista de productos incluidos en esta compra.
                </div>

                <div className="max-h-[300px] overflow-y-auto border rounded-md shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="text-left p-3 font-medium text-gray-700">
                          Producto
                        </th>
                        <th className="text-left p-3 font-medium text-gray-700">
                          Cantidad
                        </th>
                        <th className="text-left p-3 font-medium text-gray-700">
                          Precio Unitario
                        </th>
                        <th className="text-right p-3 font-medium text-gray-700">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {!compra.productos?.length && (
                        <tr>
                          <td
                            colSpan={4}
                            className="p-4 text-center text-gray-500 italic">
                            No hay productos en esta compra.
                          </td>
                        </tr>
                      )}

                      {compra.productos?.map((producto, index) => {
                        const precioUnitario = producto.precioUnitario || 0;
                        const precioOriginal =
                          producto.precioOriginal || precioUnitario;
                        const enOferta = producto.enOferta === true;
                        const subtotalProducto =
                          producto.subtotalProducto ||
                          precioUnitario * producto.cantidad;

                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="p-3 text-gray-800">
                              {producto.productoId?.nombre || "Producto"}
                            </td>
                            <td className="p-3 text-gray-800">
                              {producto.cantidad}
                            </td>
                            <td className="p-3 text-gray-800">
                              <span>${FormateoPrecio(precioUnitario)}</span>
                              {enOferta && precioOriginal > precioUnitario && (
                                <span className="text-sm text-gray-500 line-through">
                                  ${FormateoPrecio(precioOriginal)}
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-right text-gray-800">
                              ${FormateoPrecio(subtotalProducto)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 border-t pt-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-gray-700 font-medium mb-3 flex items-center">
                      <Calculator className="mr-2 h-4 w-4 text-gray-600" />
                      Resumen de la compra
                    </h4>

                    <div className="space-y-3">
                      {/* Subtotal */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">
                          ${FormateoPrecio(compra.subtotal || 0)}
                        </span>
                      </div>

                      {/* IVA */}
                      {compra.iva && compra.iva > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">IVA:</span>
                          <span className="font-medium">
                            ${FormateoPrecio(Number(compra.iva) || 0)}
                          </span>
                        </div>
                      )}

                      {/* Domicilio */}
                      {compra.domicilio && compra.domicilio > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 flex items-center gap-1">
                            <Truck className="h-4 w-4" />
                            Domicilio:
                          </span>
                          <span className="font-medium">
                            ${FormateoPrecio(compra.domicilio)}
                          </span>
                        </div>
                      )}

                      {/* Separador */}
                      <div className="border-t border-gray-300 my-3"></div>

                      {/* Total */}
                      <div className="flex justify-between items-center bg-white rounded-md p-3 border border-gray-200">
                        <span className="font-bold text-lg text-gray-800">
                          Total:
                        </span>
                        <span className="font-bold text-xl text-gray-900">
                          ${FormateoPrecio(compra.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
