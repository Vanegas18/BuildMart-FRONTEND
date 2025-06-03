import {
  Plus,
  Trash,
  DollarSign,
  User,
  Package2,
  Calculator,
  Calendar,
  TrendingUp,
  X,
} from "lucide-react";
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
        const cantidad = producto.cantidad || 1;
        const precio = producto.precioCompra || 0;
        return acc + precio * cantidad;
      }, 0) || 0
    );
  }, [form.watch("productos")]);

  // Función para calcular precio recomendado
  const calcularPrecioRecomendado = (precioCompra) => {
    if (!precioCompra || precioCompra === "" || precioCompra === 0) return 0;
    return Math.round(Number(precioCompra) * 1.2);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (open && !newOpen) {
          return;
        }
        setOpen(newOpen);
      }}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Nueva Compra</span>
          <span className="sm:hidden">Nueva Compra</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[1200px] max-h-[90vh] overflow-y-auto w-[98vw] sm:w-full [&>button[aria-label='Close']]:hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center text-gray-800">
            <DollarSign className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Crear Nueva Compra
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-gray-600">
            Complete el formulario para registrar una nueva compra en el
            sistema.
          </DialogDescription>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-all">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
          <Separator className="my-3" />
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6">
            {/* Proveedor y Fecha */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="pt-4 sm:pt-6">
                  <FormField
                    control={form.control}
                    name="proveedorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700 text-sm">
                          <User className="mr-2 h-4 w-4 text-gray-600" />
                          Proveedor
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={field.value || ""}
                            onValueChange={field.onChange}
                            disabled={proveedores.length === 0}>
                            <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 h-10">
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
                          Seleccione el proveedor de esta compra.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="pt-4 sm:pt-6">
                  <FormField
                    control={form.control}
                    name="fecha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700 text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-gray-600" />
                          Fecha de la Compra
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            value={field.value || ""}
                            onChange={field.onChange}
                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 h-10"
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
            </div>

            {/* Productos */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-4 sm:pt-6">
                <FormField
                  control={form.control}
                  name="productos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700 text-sm">
                        <Package2 className="mr-2 h-4 w-4 text-gray-600" />
                        Productos de la Compra
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          {/* Vista Desktop - Tabla */}
                          <div className="hidden lg:block">
                            <div className="max-h-[400px] overflow-y-auto border rounded-md shadow-sm">
                              <table className="w-full text-sm">
                                <thead className="bg-gray-100 sticky top-0">
                                  <tr>
                                    <th className="text-left p-3 font-medium text-gray-700">
                                      Producto
                                    </th>
                                    <th className="text-left p-3 font-medium text-gray-700">
                                      Stock Actual
                                    </th>
                                    <th className="text-left p-3 font-medium text-gray-700">
                                      Cantidad
                                    </th>
                                    <th className="text-left p-3 font-medium text-gray-700">
                                      Precio Compra
                                    </th>
                                    <th className="text-left p-3 font-medium text-gray-700">
                                      Precio Venta
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
                                        colSpan={6}
                                        className="p-4 text-center text-gray-500 italic">
                                        Debes agregar al menos un producto
                                      </td>
                                    </tr>
                                  )}

                                  {field.value?.map((producto, index) => {
                                    const productoSeleccionado = productos.find(
                                      (p) => p._id === producto.productoId
                                    );

                                    const precioRecomendado =
                                      calcularPrecioRecomendado(
                                        producto.precioCompra
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

                                              const prodSeleccionado =
                                                productos.find(
                                                  (p) => p._id === value
                                                );

                                              if (prodSeleccionado) {
                                                nuevos[index].precioCompra =
                                                  Number(
                                                    prodSeleccionado.precioCompra
                                                  );
                                                nuevos[index].precio = Number(
                                                  prodSeleccionado.precio ||
                                                    prodSeleccionado.precioVenta
                                                );
                                              }
                                              field.onChange(nuevos);
                                            }}
                                            disabled={productos.length === 0}>
                                            <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                                              <SelectValue placeholder="Seleccionar" />
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

                                        <td className="p-3 w-24">
                                          <Input
                                            type="text"
                                            disabled
                                            value={
                                              productoSeleccionado
                                                ? FormateoPrecio(
                                                    productoSeleccionado.stock
                                                  )
                                                : ""
                                            }
                                            className="text-right bg-gray-50 border-gray-300"
                                          />
                                        </td>

                                        <td className="p-3 w-24">
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
                                                nuevos[index].cantidad =
                                                  cantidad;
                                                field.onChange(nuevos);
                                              }
                                            }}
                                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                                          />
                                        </td>

                                        <td className="p-3 w-32">
                                          <Input
                                            type="text"
                                            inputMode="decimal"
                                            value={
                                              producto.precioCompra ===
                                                undefined ||
                                              producto.precioCompra === null ||
                                              producto.precioCompra === ""
                                                ? ""
                                                : FormateoPrecio(
                                                    producto.precioCompra
                                                  )
                                            }
                                            onChange={(e) => {
                                              const nuevos = [...field.value];
                                              const raw =
                                                e.target.value.replace(
                                                  /[.,]/g,
                                                  ""
                                                );
                                              const value =
                                                raw === "" ? "" : Number(raw);
                                              nuevos[index].precioCompra =
                                                value === "" || isNaN(value)
                                                  ? ""
                                                  : value;
                                              field.onChange(nuevos);
                                            }}
                                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 text-right"
                                            placeholder="0"
                                          />
                                        </td>

                                        <td className="p-3 w-40">
                                          <div className="space-y-2">
                                            <Input
                                              type="text"
                                              inputMode="decimal"
                                              value={
                                                producto.precioVenta ===
                                                  undefined ||
                                                producto.precioVenta === null ||
                                                producto.precioVenta === ""
                                                  ? ""
                                                  : FormateoPrecio(
                                                      producto.precioVenta
                                                    )
                                              }
                                              onChange={(e) => {
                                                const nuevos = [...field.value];
                                                const raw =
                                                  e.target.value.replace(
                                                    /[.,]/g,
                                                    ""
                                                  );
                                                const value =
                                                  raw === "" ? "" : Number(raw);
                                                nuevos[index].precioVenta =
                                                  value === "" || isNaN(value)
                                                    ? ""
                                                    : value;
                                                field.onChange(nuevos);
                                              }}
                                              className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 text-right"
                                              placeholder="0"
                                            />

                                            {precioRecomendado > 0 && (
                                              <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-md px-2 py-1.5">
                                                <div className="flex items-center">
                                                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                                                  <span className="text-xs font-medium text-green-700">
                                                    Sugerido:
                                                  </span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                  <span className="text-xs font-bold text-green-800">
                                                    $
                                                    {FormateoPrecio(
                                                      precioRecomendado
                                                    )}
                                                  </span>
                                                  <button
                                                    type="button"
                                                    onClick={() => {
                                                      const nuevos = [
                                                        ...field.value,
                                                      ];
                                                      nuevos[
                                                        index
                                                      ].precioVenta =
                                                        precioRecomendado;
                                                      field.onChange(nuevos);
                                                    }}
                                                    className="text-xs bg-green-600 hover:bg-green-700 text-white px-1.5 py-0.5 rounded transition-colors"
                                                    title="Aplicar precio sugerido">
                                                    Usar
                                                  </button>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </td>

                                        <td className="p-3">
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                              const nuevos = field.value.filter(
                                                (_, i) => i !== index
                                              );
                                              field.onChange(nuevos);
                                            }}
                                            className="border-red-300 text-red-600 hover:bg-red-50 transition-all">
                                            <Trash className="h-4 w-4" />
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Vista Mobile - Cards */}
                          <div className="lg:hidden space-y-4">
                            {field.value?.length === 0 && (
                              <div className="p-6 text-center text-gray-500 italic border rounded-lg bg-gray-50">
                                Debes agregar al menos un producto
                              </div>
                            )}

                            {field.value?.map((producto, index) => {
                              const productoSeleccionado = productos.find(
                                (p) => p._id === producto.productoId
                              );

                              const precioRecomendado =
                                calcularPrecioRecomendado(
                                  producto.precioCompra
                                );

                              return (
                                <Card
                                  key={index}
                                  className="border border-gray-200">
                                  <CardContent className="pt-4">
                                    <div className="flex justify-between items-start mb-4">
                                      <h4 className="font-medium text-gray-800">
                                        Producto #{index + 1}
                                      </h4>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const nuevos = field.value.filter(
                                            (_, i) => i !== index
                                          );
                                          field.onChange(nuevos);
                                        }}
                                        className="border-red-300 text-red-600 hover:bg-red-50">
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </div>

                                    <div className="space-y-4">
                                      {/* Selector de Producto */}
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                          Producto
                                        </label>
                                        <Select
                                          value={producto.productoId || ""}
                                          onValueChange={(value) => {
                                            const nuevos = [...field.value];
                                            nuevos[index].productoId = value;

                                            const prodSeleccionado =
                                              productos.find(
                                                (p) => p._id === value
                                              );

                                            if (prodSeleccionado) {
                                              nuevos[index].precioCompra =
                                                Number(
                                                  prodSeleccionado.precioCompra
                                                );
                                              nuevos[index].precio = Number(
                                                prodSeleccionado.precio ||
                                                  prodSeleccionado.precioVenta
                                              );
                                            }
                                            field.onChange(nuevos);
                                          }}
                                          disabled={productos.length === 0}>
                                          <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 h-10">
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
                                      </div>

                                      {/* Stock y Cantidad */}
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Stock Actual
                                          </label>
                                          <Input
                                            type="text"
                                            disabled
                                            value={
                                              productoSeleccionado
                                                ? FormateoPrecio(
                                                    productoSeleccionado.stock
                                                  )
                                                : ""
                                            }
                                            className="text-right bg-gray-50 border-gray-300 h-10"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cantidad
                                          </label>
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
                                                nuevos[index].cantidad =
                                                  cantidad;
                                                field.onChange(nuevos);
                                              }
                                            }}
                                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 h-10"
                                          />
                                        </div>
                                      </div>

                                      {/* Precios */}
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Precio Compra
                                          </label>
                                          <Input
                                            type="text"
                                            inputMode="decimal"
                                            value={
                                              producto.precioCompra ===
                                                undefined ||
                                              producto.precioCompra === null ||
                                              producto.precioCompra === ""
                                                ? ""
                                                : FormateoPrecio(
                                                    producto.precioCompra
                                                  )
                                            }
                                            onChange={(e) => {
                                              const nuevos = [...field.value];
                                              const raw =
                                                e.target.value.replace(
                                                  /[.,]/g,
                                                  ""
                                                );
                                              const value =
                                                raw === "" ? "" : Number(raw);
                                              nuevos[index].precioCompra =
                                                value === "" || isNaN(value)
                                                  ? ""
                                                  : value;
                                              field.onChange(nuevos);
                                            }}
                                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 text-right h-10"
                                            placeholder="0"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Precio Venta
                                          </label>
                                          <Input
                                            type="text"
                                            inputMode="decimal"
                                            value={
                                              producto.precioVenta ===
                                                undefined ||
                                              producto.precioVenta === null ||
                                              producto.precioVenta === ""
                                                ? ""
                                                : FormateoPrecio(
                                                    producto.precioVenta
                                                  )
                                            }
                                            onChange={(e) => {
                                              const nuevos = [...field.value];
                                              const raw =
                                                e.target.value.replace(
                                                  /[.,]/g,
                                                  ""
                                                );
                                              const value =
                                                raw === "" ? "" : Number(raw);
                                              nuevos[index].precioVenta =
                                                value === "" || isNaN(value)
                                                  ? ""
                                                  : value;
                                              field.onChange(nuevos);
                                            }}
                                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 text-right h-10"
                                            placeholder="0"
                                          />
                                        </div>
                                      </div>

                                      {/* Precio Recomendado en Mobile */}
                                      {precioRecomendado > 0 && (
                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                              <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                                              <span className="text-sm font-medium text-green-700">
                                                Precio Sugerido:
                                              </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <span className="text-sm font-bold text-green-800">
                                                $
                                                {FormateoPrecio(
                                                  precioRecomendado
                                                )}
                                              </span>
                                              <Button
                                                type="button"
                                                size="sm"
                                                onClick={() => {
                                                  const nuevos = [
                                                    ...field.value,
                                                  ];
                                                  nuevos[index].precioVenta =
                                                    precioRecomendado;
                                                  field.onChange(nuevos);
                                                }}
                                                className="bg-green-600 hover:bg-green-700 text-white h-7 px-3 text-xs">
                                                Usar
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })}
                          </div>

                          {/* Controles inferiores */}
                          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                const nuevos = [
                                  ...(field.value || []),
                                  {
                                    productoId: "",
                                    cantidad: 1,
                                    precioCompra: "",
                                    precioVenta: "",
                                  },
                                ];
                                field.onChange(nuevos);
                              }}
                              disabled={
                                productos.length === 0 ||
                                (field.value?.length || 0) >= productos.length
                              }
                              className="w-full sm:w-auto border-gray-300 hover:bg-gray-100 transition-all">
                              <Plus className="mr-2 h-4 w-4" />
                              Agregar Producto
                            </Button>

                            <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg w-full sm:w-auto justify-center">
                              <Calculator className="mr-2 h-5 w-5 text-gray-600" />
                              <div className="text-center sm:text-right text-lg font-semibold text-gray-800">
                                Total:{" "}
                                <span className="text-blue-600">
                                  ${FormateoPrecio(totalCompra)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Agregue todos los productos que forman parte de esta
                        compra y defina los precios de compra y venta. El precio
                        sugerido incluye un margen del 20%.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="w-full sm:w-auto border-gray-300 hover:bg-gray-100 transition-all order-2 sm:order-1">
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-all order-1 sm:order-2">
                {loading ? "Guardando..." : "Guardar Compra"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
