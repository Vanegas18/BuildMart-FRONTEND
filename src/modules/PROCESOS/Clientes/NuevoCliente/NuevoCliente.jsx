import {
  Plus,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  CitrusIcon,
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
import { Button } from "@/shared/components/ui";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";

import { useNuevoCliente } from "./useNuevoCliente";

export const NuevoCliente = ({ onClienteCreado }) => {
  const { open, setOpen, loading, form, onSubmit } =
    useNuevoCliente(onClienteCreado);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Cliente
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center text-gray-800">
            <User className="mr-2 h-5 w-5" />
            Crear Nuevo Cliente
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Complete el formulario para añadir un nuevo cliente a la base de
            datos.
          </DialogDescription>
          <Separator className="my-3" />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="cedula"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700">
                        <User className="mr-2 h-4 w-4 text-gray-600" />
                        Cedula del Cliente
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="10135647"
                          {...field}
                          autoFocus
                          aria-label="cedula"
                          className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Cedula completa del cliente
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <br />
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

                <FormField
                  control={form.control}
                  name="contraseña"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel className="flex items-center text-gray-700">
                        <Mail className="mr-2 h-4 w-4 text-gray-600" />
                        Contraseña
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Contraseña246,"
                          {...field}
                          className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Contraseña con la estructura requerida
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
                {loading ? "Guardando..." : "Guardar Cliente"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
