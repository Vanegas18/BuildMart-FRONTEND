import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Pencil,
  WholeWord,
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Button } from "@/shared/components";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useClientes } from "@/core/context";
import { toast } from "sonner";

export const EditarCliente = ({ cliente, onClienteEditado }) => {
  const { editarCliente } = useClientes();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Inicializar el formulario con los valores actuales del cliente
  const form = useForm({
    defaultValues: {
      nombre: cliente.nombre || "",
      correo: cliente.correo || "",
      telefono: cliente.telefono || "",
      direccion: cliente.direccion || "",
      departamento: cliente.departamento || "",
      ciudad: cliente.ciudad || "",
    },
  });

  // Manejo del submit
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Aseguramos de enviar el _id
      const clienteConId = { ...data, _id: cliente._id };

      const clienteEditado = await editarCliente(clienteConId);
      toast.success("Cliente actualizado exitosamente");
      onClienteEditado?.(clienteEditado);
      setOpen(false);
    } catch (error) {
      console.error("Error al editar cliente", error);
      toast.error("Error al actualizar el cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center text-gray-800">
            <User className="mr-2 h-5 w-5" />
            Editar Cliente
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Actualice la información del cliente en la base de datos.
          </DialogDescription>
          <Separator className="my-3" />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                {/* Nombre del cliente */}
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700">
                        <User className="mr-2 h-4 w-4 text-gray-600" />
                        Nombre del Cliente
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Juan Pérez"
                          {...field}
                          autoFocus
                          aria-label="nombre"
                          className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Nombre completo del cliente o empresa
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Correo del cliente */}
                <FormField
                  control={form.control}
                  name="correo"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel className="flex items-center text-gray-700">
                        <Mail className="mr-2 h-4 w-4 text-gray-600" />
                        Correo Electrónico
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="correo@ejemplo.com"
                          {...field}
                          className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Dirección de correo electrónico principal para contacto
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Teléfono del cliente */}
                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel className="flex items-center text-gray-700">
                        <Phone className="mr-2 h-4 w-4 text-gray-600" />
                        Teléfono
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123456789"
                          {...field}
                          className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Número telefónico principal para contacto
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dirección del cliente */}
                <FormField
                  control={form.control}
                  name="direccion"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel className="flex items-center text-gray-700">
                        <MapPin className="mr-2 h-4 w-4 text-gray-600" />
                        Dirección
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Av. Principal, #123"
                          className="resize-none border-gray-300 focus:border-gray-500 focus:ring-gray-500 min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Dirección completa incluyendo calle, número y
                        referencias
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Departamento */}
                <FormField
                  control={form.control}
                  name="departamento"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel className="flex items-center text-gray-700">
                        <Building className="mr-2 h-4 w-4 text-gray-600" />
                        Departamento
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Departamento de Ventas"
                          {...field}
                          className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Departamento o área funcional del cliente
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Ciudad */}
                <FormField
                  control={form.control}
                  name="ciudad"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel className="flex items-center text-gray-700">
                        <WholeWord className="mr-2 h-4 w-4 text-gray-600" />
                        Ciudad
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ciudad de México"
                          {...field}
                          className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Ciudad o localidad donde se ubica el cliente
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
                {loading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
