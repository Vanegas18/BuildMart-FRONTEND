import {
  Plus,
  Trash,
  ShoppingCart,
  User,
  Package2,
  Calculator,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useMemo } from "react";
import { useNuevoPedido } from "./useNuevoPedido";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";

export const NuevoPedido = ({ onPedidoCreado }) => {
  const { open, setOpen, loading, form, onSubmit, clientes, productos } =
    useNuevoPedido(onPedidoCreado);

  const totalPedido = useMemo(() => {
    return (
      form.watch("productos")?.reduce((acc, producto) => {
        const prodInfo = productos.find((p) => p._id === producto.productoId);
        const cantidad = producto.cantidad || 1;
        const precio = prodInfo?.precio || 0;
        return acc + precio * cantidad;
      }, 0) || 0
    );
  }, [form.watch("productos"), productos]);

  // Filtrar productos que están disponibles para agregar (Activo o En oferta)
  const productosSeleccionables = useMemo(() => {
    return productos.filter(
      (p) => p.estado === "Activo" || p.estado === "En oferta"
    );
  }, [productos]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Pedido
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center text-gray-800">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Crear Nuevo Pedido
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Complete el formulario para registrar un nuevo pedido en el sistema.
          </DialogDescription>
          <Separator className="my-3" />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                {/* Cliente */}
                <FormField
                  control={form.control}
                  name="clienteId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700">
                        <User className="mr-2 h-4 w-4 text-gray-600" />
                        Cliente
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value || ""}
                          onValueChange={field.onChange}
                          disabled={clientes.length === 0}>
                          <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                            <SelectValue placeholder="Seleccionar Cliente" />
                          </SelectTrigger>
                          <SelectContent>
                            {clientes.map((cliente) => (
                              <SelectItem key={cliente._id} value={cliente._id}>
                                {cliente.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Seleccione el cliente que realizará este pedido
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Productos */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="productos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700">
                        <Package2 className="mr-2 h-4 w-4 text-gray-600" />
                        Productos del Pedido
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div className="max-h-[300px] overflow-y-auto border rounded-md shadow-sm">
                            <table className="w-full text-sm">
                              <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                  <th className="text-left p-3 font-medium text-gray-700">
                                    Producto
                                  </th>
                                  <th className="text-left p-3 font-medium text-gray-700">
                                    Precio
                                  </th>
                                  <th className="text-left p-3 font-medium text-gray-700">
                                    Cantidad
                                  </th>
                                  <th className="text-left p-3 font-medium text-gray-700">
                                    Acciones
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {field.value?.length === 0 && (
                                  <tr>
                                    <td
                                      colSpan={4}
                                      className="p-4 text-center text-gray-500 italic">
                                      Debes agregar al menos un producto
                                    </td>
                                  </tr>
                                )}

                                {field.value?.map((producto, index) => {
                                  const productoSeleccionado = productos.find(
                                    (p) => p._id === producto.productoId
                                  );

                                  // Filtrar productos disponibles para selección
                                  const productosDisponibles =
                                    productosSeleccionables.filter(
                                      (p) =>
                                        !field.value.some(
                                          (other, i) =>
                                            other.productoId === p._id &&
                                            i !== index
                                        )
                                    );

                                  return (
                                    <tr
                                      key={index}
                                      className="hover:bg-gray-50">
                                      <td className="p-3">
                                        <Select
                                          value={producto.productoId || ""}
                                          onValueChange={(value) => {
                                            const nuevos = [...field.value];
                                            nuevos[index].productoId = value;
                                            field.onChange(nuevos);
                                          }}
                                          disabled={
                                            productosDisponibles.length === 0
                                          }>
                                          <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                                            <SelectValue placeholder="Seleccionar Producto" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {productosDisponibles.map(
                                              (producto) => (
                                                <SelectItem
                                                  key={producto._id}
                                                  value={producto._id}>
                                                  {producto.nombre}
                                                </SelectItem>
                                              )
                                            )}
                                          </SelectContent>
                                        </Select>
                                      </td>

                                      <td className="p-3 w-32">
                                        <Input
                                          type="text"
                                          disabled
                                          value={
                                            productoSeleccionado
                                              ? `$${FormateoPrecio(
                                                  productoSeleccionado.precio
                                                )}`
                                              : ""
                                          }
                                          className="text-right bg-gray-50 border-gray-300"
                                        />
                                      </td>

                                      <td className="p-3 w-28">
                                        <Input
                                          type="number"
                                          min={1}
                                          value={producto.cantidad || 1}
                                          onChange={(e) => {
                                            const nuevos = [...field.value];
                                            const cantidad = parseInt(
                                              e.target.value,
                                              10
                                            );
                                            if (
                                              !isNaN(cantidad) &&
                                              cantidad > 0
                                            ) {
                                              nuevos[index].cantidad = cantidad;
                                              field.onChange(nuevos);
                                            }
                                          }}
                                          className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                                        />
                                      </td>

                                      <td className="p-3">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => {
                                            const nuevos = field.value.filter(
                                              (_, i) => i !== index
                                            );
                                            field.onChange(nuevos);
                                          }}
                                          className="hover:bg-red-50">
                                          <Trash className="h-5 w-5 text-red-500" />
                                        </Button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>

                          <div className="flex justify-between items-center py-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                const nuevos = [
                                  ...(field.value || []),
                                  { productoId: "", cantidad: 1 },
                                ];
                                field.onChange(nuevos);
                              }}
                              disabled={
                                productosSeleccionables.length === 0 ||
                                (field.value?.length || 0) >=
                                  productosSeleccionables.filter(
                                    (p) =>
                                      !field.value?.some(
                                        (item) => item.productoId === p._id
                                      )
                                  ).length
                              }
                              className="border-gray-300 hover:bg-gray-100 transition-all">
                              <Plus className="mr-2 h-4 w-4" />
                              Agregar Producto
                            </Button>

                            <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg">
                              <Calculator className="mr-2 h-5 w-5 text-gray-600" />
                              <div className="text-right text-lg font-semibold text-gray-800">
                                Total:{" "}
                                <span className="text-blue-600">
                                  ${FormateoPrecio(totalPedido)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Agregue todos los productos que formarán parte de este
                        pedido
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <DialogFooter className="space-x-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="border-gray-300 hover:bg-gray-100 transition-all">
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 transition-all">
                {loading ? "Guardando..." : "Guardar Pedido"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
