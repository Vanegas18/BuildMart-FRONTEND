import { Plus, Trash } from "lucide-react"; // <--- AÑADIDA esta línea
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

export const NuevoPedido = ({ onPedidoCreado }) => {
  const {
    open,
    setOpen,
    loading,
    form,
    onSubmit,
    clientes,
    productos,
  } = useNuevoPedido(onPedidoCreado);

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Pedido
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Pedido</DialogTitle>
          <DialogDescription>
            Complete el formulario para registrar un nuevo pedido.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Cliente */}
            <FormField
              control={form.control}
              name="clienteId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || ""}
                      onValueChange={field.onChange}
                      disabled={clientes.length === 0}
                    >
                      <SelectTrigger>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Productos */}
            <FormField
              control={form.control}
              name="productos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Productos</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="max-h-[200px] overflow-y-auto border rounded">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="text-left p-2">Producto</th>
                              <th className="text-left p-2">Precio</th>
                              <th className="text-left p-2">Cantidad</th>
                              <th className="text-left p-2">Acciones</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {field.value?.length === 0 && (
                              <tr>
                                <td colSpan={4} className="p-4 text-center text-muted-foreground">
                                  Debes agregar al menos un producto
                                </td>
                              </tr>
                            )}

                            {field.value?.map((producto, index) => {
                              const productoSeleccionado = productos.find(
                                (p) => p._id === producto.productoId
                              );

                              const productosDisponibles = productos.filter(
                                (p) =>
                                  !field.value.some(
                                    (other, i) =>
                                      other.productoId === p._id && i !== index
                                  )
                              );

                              return (
                                <tr key={index}>
                                  <td className="p-2">
                                    <Select
                                      value={producto.productoId || ""}
                                      onValueChange={(value) => {
                                        const nuevos = [...field.value];
                                        nuevos[index].productoId = value;
                                        field.onChange(nuevos);
                                      }}
                                      disabled={productos.length === 0}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar Producto" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {productosDisponibles.map((producto) => (
                                          <SelectItem key={producto._id} value={producto._id}>
                                            {producto.nombre}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </td>

                                  <td className="p-2 w-32">
                                    <Input
                                      type="text"
                                      disabled
                                      value={
                                        productoSeleccionado
                                          ? `$${FormateoPrecio(productoSeleccionado.precio)}`
                                          : ""
                                      }
                                      className="text-right bg-muted"
                                    />
                                  </td>

                                  <td className="p-2 w-28">
                                    <Input
                                      type="number"
                                      min={1}
                                      value={producto.cantidad || 1}
                                      onChange={(e) => {
                                        const nuevos = [...field.value];
                                        const cantidad = parseInt(e.target.value, 10);
                                        if (!isNaN(cantidad) && cantidad > 0) {
                                          nuevos[index].cantidad = cantidad;
                                          field.onChange(nuevos);
                                        }
                                      }}
                                    />
                                  </td>

                                  <td className="p-2">
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        const nuevos = field.value.filter((_, i) => i !== index);
                                        field.onChange(nuevos);
                                      }}
                                    >
                                      <Trash className="h-5 w-5 text-red-500" />
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <br />

                      <div className="flex justify-between items-center">
                        <Button
                          type="button"
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
                        >
                          Agregar Producto
                        </Button>
                        <br />

                        <div className="text-right text-lg font-semibold">
                          Total: ${FormateoPrecio(totalPedido)}
                        </div>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br /><br /><br />

            {/* Footer */}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Guardar Pedido"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
