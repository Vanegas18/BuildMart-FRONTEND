import {
  Plus,
  Trash,
  DollarSign,
  User,
  Package2,
  Calculator,
  Calendar,
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
import { useNuevaCompra } from "./useNuevaCompra";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";

export const NuevaCompra = ({ onCompraCreada }) => {
  const { open, setOpen, loading, form, onSubmit, proveedores, productos } =
    useNuevaCompra(onCompraCreada);

  const totalCompra = useMemo(() => {
    return (
      form.watch("productos")?.reduce((acc, producto) => {
        const prodInfo = productos.find((p) => p._id === producto.productoId);
        const cantidad = producto.cantidad || 1;
        const precio = prodInfo?.precio || 0;
        return acc + precio * cantidad;
      }, 0) || 0
    );
  }, [form.watch("productos"), productos]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Compra
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center text-gray-800">
            <DollarSign className="mr-2 h-5 w-5" />
            Crear Nueva Compra
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Complete el formulario para registrar una nueva compra en el
            sistema.
          </DialogDescription>
          <Separator className="my-3" />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Proveedor */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="proveedorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700">
                        <User className="mr-2 h-4 w-4 text-gray-600" />
                        Proveedor
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value || ""}
                          onValueChange={field.onChange}
                          disabled={proveedores.length === 0}>
                          <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                            <SelectValue placeholder="Seleccionar Proveedor" />
                          </SelectTrigger>
                          <SelectContent>
                            {proveedores.map((proveedor) => (
                              <SelectItem
                                key={proveedor._id}
                                value={proveedor._id}>
                                {proveedor.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Seleccione el proveedor de esta compra
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Fecha */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="fecha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700">
                        <Calendar className="mr-2 h-4 w-4 text-gray-600" />
                        Fecha de la Compra
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value || ""}
                          onChange={field.onChange}
                          className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Seleccione la fecha en la que se realizó la compra.
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
                        Productos de la Compra
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
                                    Stock
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
                                          disabled={productos.length === 0}>
                                          <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                                            <SelectValue placeholder="Seleccionar Producto" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {productos.map((producto) => (
                                              <SelectItem
                                                key={producto._id}
                                                value={producto._id}>
                                                {producto.nombre}
                                              </SelectItem>
                                            ))}
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
                                                  productoSeleccionado.precioCompra
                                                )}` // Mostrar precioCompra
                                              : ""
                                          }
                                          className="text-right bg-gray-50 border-gray-300"
                                        />
                                      </td>

                                      <td className="p-3 w-32">
                                        <Input
                                          type="text"
                                          disabled
                                          value={
                                            productoSeleccionado
                                              ? `${FormateoPrecio(
                                                  productoSeleccionado.stock
                                                )}` // Mostrar precioCompra
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
                                productos.length === 0 ||
                                (field.value?.length || 0) >= productos.length
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
                                  $
                                  {FormateoPrecio(
                                    form
                                      .watch("productos")
                                      ?.reduce((total, producto) => {
                                        const productoSeleccionado =
                                          productos.find(
                                            (p) => p._id === producto.productoId
                                          );
                                        const precioCompra =
                                          productoSeleccionado?.precioCompra ||
                                          0; // Usar precioCompra
                                        return (
                                          total +
                                          precioCompra * producto.cantidad
                                        );
                                      }, 0)
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Agregue todos los productos que forman parte de esta
                        compra
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
                {loading ? "Guardando..." : "Guardar Compra"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
