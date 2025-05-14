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
import { Button } from "@/shared/components";
import {
  Plus,
  User,
  Mail,
  Phone,
  Home,
  KeyRound,
  IdCard,
  Pencil,
  Shield,
  EyeOff,
  Eye,
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
import { useEditarUsuario } from "./useEditarUsuario";
import { Separator } from "@/shared/components/ui/separator";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useState } from "react";

export const EditarUsuario = ({ usuario, onUsuarioEditado }) => {
  const { form, loading, onSubmit, open, setOpen } = useEditarUsuario(
    onUsuarioEditado,
    usuario
  );
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
        <Button variant="ghost" size="icon" className="flex items-center">
          <Pencil className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center text-gray-800">
            <Pencil className="mr-2 h-5 w-5" />
            Editar Administrador
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Modifique la información del usuario y guarde los cambios.
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
                          Nombre completo
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
                          Nombre y apellidos del usuario
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
                          Cédula de Ciudadanía
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
                          Número de identificación sin puntos ni guiones
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                              type="string"
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
                          Número celular para contacto directo
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

                  {/* <FormField
                    control={form.control}
                    name="rol"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel>Rol</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Administrador" />{" "}
                              Administrador
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent></SelectContent>
                        </Select>
                        <FormDescription>
                          El rol siempre sera Administrador, si desea registrar
                          un Cliente debe ser desde el formulario de registro.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>

                <Separator className="my-6" />

                <h3 className="text-sm font-medium flex items-center mb-4 text-gray-700">
                  <Shield className="mr-2 h-4 w-4 text-gray-600" />
                  Información de Acceso
                </h3>

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
                        Email al que se enviarán notificaciones del sistema
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contraseña"
                  render={({ field }) => {
                    const [showPassword, setShowPassword] = useState(false);

                    // Verificar si el valor parece ser un hash de bcrypt
                    const isBcryptHash =
                      field.value && field.value.startsWith("$2b$");

                    // Modificar el valor que se muestra al usuario
                    const displayValue = isBcryptHash ? "" : field.value;

                    return (
                      <FormItem className="mb-6">
                        <FormLabel className="text-gray-700">
                          Contraseña
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center relative">
                            <KeyRound className="absolute left-2 h-4 w-4 text-gray-400" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              {...field}
                              value={displayValue}
                              placeholder={
                                isBcryptHash ? "Introduce nueva contraseña" : ""
                              }
                              onChange={(e) => {
                                // Actualizar el valor en el formulario
                                field.onChange(e.target.value);
                              }}
                              className="pl-8 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                            />
                            <button
                              type="button"
                              className="absolute right-2"
                              onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          {isBcryptHash
                            ? "Deja en blanco para mantener la contraseña actual o introduce una nueva"
                            : "Ingresa tu contraseña"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="rol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 flex items-center">
                        <Shield className="mr-2 h-4 w-4 text-gray-600" />
                        Rol de Usuario
                      </FormLabel>
                      <Card className="bg-gray-50 border border-gray-200">
                        <CardContent className="py-3 px-4">
                          <p className="text-sm text-gray-600">
                            El rol{" "}
                            <span className="font-medium">Administrador</span>{" "}
                            No se puede cambiar
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Si desea registrar un Cliente, debe hacerlo desde el
                            formulario de registro específico
                          </p>
                        </CardContent>
                      </Card>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

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
