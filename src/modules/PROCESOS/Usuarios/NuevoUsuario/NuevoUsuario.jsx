import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { useNuevoUsuario } from "./useNuevoUsuario";
import { Button } from "@/shared/components";
import { Plus, User, Mail, Phone, Home, KeyRound, IdCard } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";

export const NuevoUsuario = ({ onUsuarioCreado }) => {
  const { form, loading, onSubmit, open, setOpen } =
    useNuevoUsuario(onUsuarioCreado);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center">
          <Plus className="mr-2 h-4 w-4" /> Nuevo Usuario
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg font-semibold">
            Añadir Nuevo Usuario
          </DialogTitle>
          <DialogDescription>
            Complete el formulario con los datos del nuevo usuario
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Primera fila: Nombre y Cédula */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <div className="flex items-center relative">
                        <User className="absolute left-2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="María González"
                          className="pl-8"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cedula"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Cédula</FormLabel>
                    <FormControl>
                      <div className="flex items-center relative">
                        <IdCard className="absolute left-2 h-4 w-4 text-gray-400" />
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="10123456789"
                          {...field}
                          aria-label="cédula"
                          className="pl-8"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Segunda fila: Teléfono y Rol */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rol"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Rol</FormLabel>
                    {/* <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Administrador" />{" "}
                          Administrador
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent></SelectContent>
                    </Select> */}
                    <FormDescription>
                      El rol siempre sera Administrador, si desea registrar un
                      Cliente debe ser desde el formulario de registro.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <div className="flex items-center relative">
                        <Phone className="absolute left-2 h-4 w-4 text-gray-400" />
                        <Input
                          type="tel"
                          inputMode="tel"
                          placeholder="300 123 4567"
                          {...field}
                          aria-label="teléfono"
                          className="pl-8"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Correo y Contraseña */}
            <FormField
              control={form.control}
              name="correo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <div className="flex items-center relative">
                      <Mail className="absolute left-2 h-4 w-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        {...field}
                        className="pl-8"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contraseña"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  {/* <FormControl>
                    <div className="flex items-center relative">
                      <KeyRound className="absolute left-2 h-4 w-4 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="Mínimo 8 caracteres"
                        {...field}
                        className="pl-8"
                      />
                    </div>
                  </FormControl> */}
                  <FormDescription>
                    La contraseña por defecto es "Administrador123,", Las
                    indicaciones para el cambio de contraseña serán enviadas al
                    corre electrónico
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dirección */}
            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <div className="flex items-center relative">
                      <Home className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
                      <Textarea
                        placeholder="Calle 123 #45-67, Barrio Centro"
                        className="resize-none pl-8 h-20"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="mr-2">
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Guardar Usuario"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
