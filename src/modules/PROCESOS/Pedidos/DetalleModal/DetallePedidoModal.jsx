import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import {
  ShoppingCart,
  User,
  CalendarDays,
  Tag,
  Package2,
  Calculator,
} from "lucide-react";

export const DetallePedidoModal = ({ open, onClose, pedido }) => {
  if (!pedido) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (open && !newOpen) {
          return;
        }
        // Nota: Aquí falta la definición de setOpen, debería ser onClose(!newOpen)
        onClose(!newOpen);
      }}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center text-gray-800">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Detalles del Pedido
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Información completa sobre el pedido y sus productos.
          </DialogDescription>
          <Separator className="my-3" />
        </DialogHeader>

        <div className="space-y-6">
          {/* Información General */}
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="pt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700 font-medium">
                    <User className="mr-2 h-4 w-4 text-gray-600" />
                    Cliente
                  </div>
                  <div className="ml-6 text-gray-800">
                    {pedido.clienteId?.nombre || "Sin nombre"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-700 font-medium">
                    <Tag className="mr-2 h-4 w-4 text-gray-600" />
                    ID del Pedido
                  </div>
                  <div className="ml-6 text-gray-800">{pedido.pedidoId}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700 font-medium">
                    <CalendarDays className="mr-2 h-4 w-4 text-gray-600" />
                    Fecha
                  </div>
                  <div className="ml-6 text-gray-800">
                    {new Date(pedido.fecha).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-700 font-medium">
                    <Tag className="mr-2 h-4 w-4 text-gray-600" />
                    Estado
                  </div>
                  <div className="ml-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        pedido.estado === "Completado"
                          ? "bg-green-100 text-green-800"
                          : pedido.estado === "Pendiente"
                          ? "bg-yellow-100 text-yellow-800"
                          : pedido.estado === "Cancelado"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                      {pedido.estado}
                    </span>
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
                Productos del Pedido
              </div>
              <div className="text-xs text-gray-500 mb-3">
                Lista de productos incluidos en este pedido
              </div>

              <div className="max-h-[300px] overflow-y-auto border rounded-md shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-700">
                        Producto
                      </th>
                      <th className="text-left p-3 font-medium text-gray-700">
                        Precio Unitario
                      </th>
                      <th className="text-left p-3 font-medium text-gray-700">
                        Cantidad
                      </th>
                      <th className="text-right p-3 font-medium text-gray-700">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pedido.productos?.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="p-4 text-center text-gray-500 italic">
                          No hay productos en este pedido
                        </td>
                      </tr>
                    )}

                    {pedido.productos?.map((producto, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-3 text-gray-800">
                          {/* CORREGIDO: Acceder directamente a nombre en lugar de productoId.nombre */}
                          {producto.nombre || producto.productoId?.nombre || "Producto sin nombre"}
                        </td>
                        <td className="p-3 text-gray-800">
                          {/* CORREGIDO: Acceder directamente a precio en lugar de productoId.precio */}
                          ${FormateoPrecio(producto.precio || producto.productoId?.precio || 0)}
                        </td>
                        <td className="p-3 text-gray-800">
                          {producto.cantidad || 0}
                        </td>
                        <td className="p-3 text-right text-gray-800">
                          $
                          {FormateoPrecio(
                            (producto.precio || producto.productoId?.precio || 0) * (producto.cantidad || 0)
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-4">
                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg">
                  <Calculator className="mr-2 h-5 w-5 text-gray-600" />
                  <div className="text-right text-lg font-semibold text-gray-800">
                    Total:{" "}
                    <span className="text-blue-600">
                      ${FormateoPrecio(pedido.total || 0)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="space-x-3 pt-4">
          <Button
            onClick={() => onClose(false)}
            className="bg-blue-600 hover:bg-blue-700 transition-all">
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};