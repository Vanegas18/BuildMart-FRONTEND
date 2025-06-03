import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { useNuevoUsuario } from "./useNuevoUsuario";
import { Button } from "@/shared/components";
import {
  Plus,
  User,
  Mail,
  Phone,
  Home,
  KeyRound,
  IdCard,
  UserPlus,
  Shield,
  X,
} from "lucide-react";
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
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { useRoles } from "@/core/context";
import { useEffect } from "react";

export const NuevoUsuario = ({ onUsuarioCreado }) => {
  const { form, loading, onSubmit, open, setOpen } =
    useNuevoUsuario(onUsuarioCreado);

  const { roles, obtenerRoles } = useRoles();

  // Obtener los roles al cargar el componente
  useEffect(() => {
    obtenerRoles();
  }, [obtenerRoles]);

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
          <Plus className="mr-2 h-4 w-4" /> Nuevo Administrador
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center text-gray-800">
            <UserPlus className="mr-2 h-5 w-5" />
            Añadir Nuevo Usuario
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Complete el formulario con los datos personales y de acceso del
            nuevo usuario.
          </DialogDescription>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-all">
              <X />
            </Button>
          </DialogClose>
          <Separator className="my-3" />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <h3 className="text-sm font-medium flex items-center mb-4 text-gray-700">
                  <User className="mr-2 h-4 w-4 text-gray-600" />
                  Información Personal
                </h3>

                {/* Primera fila: Nombre y Cédula */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-gray-700">
                          Nombre Completo
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center relative">
                            <User className="absolute left-2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="María González"
                              className="pl-8 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Nombre y apellidos del usuario.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cedula"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-gray-700">
                          Número de Documento
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center relative">
                            <IdCard className="absolute left-2 h-4 w-4 text-gray-400" />
                            <Input
                              type="text"
                              inputMode="numeric"
                              placeholder="10123456789"
                              {...field}
                              aria-label="cédula"
                              className="pl-8 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                              maxLength={15}
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Número de identificación sin puntos ni guiones.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Segunda fila: Teléfono y Dirección */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-gray-700">
                          Teléfono de Contacto
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center relative">
                            <Phone className="absolute left-2 h-4 w-4 text-gray-400" />
                            <Input
                              type="tel"
                              inputMode="tel"
                              placeholder="300 123 4567"
                              {...field}
                              aria-label="teléfono"
                              className="pl-8 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                              maxLength={15}
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Número celular para contacto directo.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="direccion"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-gray-700">
                          Dirección
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center relative">
                            <Home className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
                            <Textarea
                              placeholder="Calle 123 #45-67, Barrio Centro"
                              className="resize-none pl-8 h-20 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator className="my-6" />

                <h3 className="text-sm font-medium flex items-center mb-4 text-gray-700">
                  <Shield className="mr-2 h-4 w-4 text-gray-600" />
                  Información de Acceso
                </h3>

                {/* Correo y Contraseña */}
                <FormField
                  control={form.control}
                  name="correo"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700">
                        Correo Electrónico
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center relative">
                          <Mail className="absolute left-2 h-4 w-4 text-gray-400" />
                          <Input
                            type="email"
                            placeholder="ejemplo@correo.com"
                            {...field}
                            className="pl-8 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Email al que se enviarán notificaciones del sistema.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 flex items-center">
                        <Shield className="mr-2 h-4 w-4 text-gray-600" />
                        Rol
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            console.log("Rol seleccionado:", value); // Para depuración
                            field.onChange(value);
                          }}
                          value={field.value || ""}>
                          <SelectTrigger className="w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                            {/* Este valor se muestra dentro del trigger */}
                            <SelectValue placeholder="Seleccione un rol" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((rol) => (
                              <SelectItem
                                key={rol._id}
                                value={rol._id}
                                className="text-gray-700">
                                {rol.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Si desea registrar un Cliente, debe hacerlo desde el
                        formulario de registro específico.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <br />

                <FormField
                  control={form.control}
                  name="contraseña"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-gray-700 flex items-center">
                        <KeyRound className="mr-2 h-4 w-4 text-gray-600" />
                        Contraseña
                      </FormLabel>
                      <Card className="bg-gray-50 border border-gray-200">
                        <CardContent className="py-3 px-4">
                          <p className="text-sm text-gray-600">
                            La contraseña por defecto es{" "}
                            <span className="font-medium">
                              Administrador123,
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Las indicaciones para el cambio de contraseña serán
                            enviadas al correo electrónico registrado.
                          </p>
                        </CardContent>
                      </Card>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <DialogFooter className="pt-2 gap-2">
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
                {loading ? "Guardando..." : "Guardar Usuario"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
