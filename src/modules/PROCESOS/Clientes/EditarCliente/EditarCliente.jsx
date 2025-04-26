import {
  Plus,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  WholeWord,
  CreditCard,
  Pencil,
  Trash2,
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { useState } from "react";

import { useEditarCliente } from "./useEditarCliente";

export const EditarCliente = ({ cliente, onClienteEditado }) => {
  const { open, setOpen, loading, form, onSubmit } = useEditarCliente(
    onClienteEditado,
    cliente
  );
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);

  const addressTypes = ["Casa", "Trabajo", "Otro"];
  const paymentTypes = [
    "Tarjeta de Crédito",
    "Tarjeta de Débito",
    "PSE",
    "Efectivo",
    "Otro",
  ];

  const watchDirecciones = form.watch("direcciones") || [];
  const watchMetodosPago = form.watch("metodosPago") || [];

  const handleAddAddress = () => {
    const currentDirecciones = form.getValues("direcciones") || [];
    form.setValue("direcciones", [
      ...currentDirecciones,
      {
        tipo: "Casa",
        calle: "",
        ciudad: "",
        departamento: "",
        codigoPostal: "",
        esPrincipal: currentDirecciones.length === 0, // Primera dirección como principal
      },
    ]);
    setShowAddAddress(true);
  };

  const handleAddPayment = () => {
    const currentMetodos = form.getValues("metodosPago") || [];
    form.setValue("metodosPago", [
      ...currentMetodos,
      {
        tipo: "Tarjeta de Crédito",
        titular: "",
        numeroTarjeta: "",
        fechaExpiracion: "",
        esPrincipal: currentMetodos.length === 0, // Primer método como principal
      },
    ]);
    setShowAddPayment(true);
  };

  const handleRemoveAddress = (index) => {
    const currentDirecciones = [...form.getValues("direcciones")];
    const isRemovingPrincipal = currentDirecciones[index].esPrincipal;

    currentDirecciones.splice(index, 1);

    // Si eliminamos la dirección principal y hay más direcciones,
    // establecer la primera como principal
    if (isRemovingPrincipal && currentDirecciones.length > 0) {
      currentDirecciones[0].esPrincipal = true;
    }

    form.setValue("direcciones", currentDirecciones);
  };

  const handleRemovePayment = (index) => {
    const currentMetodos = [...form.getValues("metodosPago")];
    const isRemovingPrincipal = currentMetodos[index].esPrincipal;

    currentMetodos.splice(index, 1);

    // Si eliminamos el método principal y hay más métodos,
    // establecer el primero como principal
    if (isRemovingPrincipal && currentMetodos.length > 0) {
      currentMetodos[0].esPrincipal = true;
    }

    form.setValue("metodosPago", currentMetodos);
  };

  const handleSetMainAddress = (index) => {
    const currentDirecciones = [...form.getValues("direcciones")];

    currentDirecciones.forEach((dir, i) => {
      dir.esPrincipal = i === index;
    });

    form.setValue("direcciones", currentDirecciones);
  };

  const handleSetMainPayment = (index) => {
    const currentMetodos = [...form.getValues("metodosPago")];

    currentMetodos.forEach((metodo, i) => {
      metodo.esPrincipal = i === index;
    });

    form.setValue("metodosPago", currentMetodos);
  };

  const onError = (errors) => {
    console.log("Errores de validación:", errors);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
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
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                {/* Información básica del cliente */}
                <div className="space-y-6">
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

                  <FormField
                    control={form.control}
                    name="correo"
                    render={({ field }) => (
                      <FormItem>
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
                          Dirección de correo electrónico principal para
                          contacto
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contraseña"
                    render={({ field }) => (
                      <FormItem>
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

                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <Phone className="mr-2 h-4 w-4 text-gray-600" />
                          Teléfono
                        </FormLabel>
                        <FormControl>
                          <Input
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
                </div>
              </CardContent>
            </Card>

            {/* Direcciones */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center text-gray-800">
                  <MapPin className="mr-2 h-5 w-5" />
                  Direcciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                {watchDirecciones.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    No hay direcciones registradas
                  </div>
                ) : (
                  <div className="space-y-6">
                    {watchDirecciones.map((_, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-md relative">
                        <div className="absolute top-2 right-2 flex space-x-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveAddress(index)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`direcciones.${index}.tipo`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tipo de Dirección</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccione tipo" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {addressTypes.map((tipo) => (
                                      <SelectItem key={tipo} value={tipo}>
                                        {tipo}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`direcciones.${index}.calle`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Calle</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Av. Principal #123"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`direcciones.${index}.ciudad`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ciudad</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Bogotá" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`direcciones.${index}.departamento`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Departamento</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Cundinamarca"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`direcciones.${index}.codigoPostal`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Código Postal</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="110111" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`direcciones.${index}.esPrincipal`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-end space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={() =>
                                      handleSetMainAddress(index)
                                    }
                                    disabled={field.value}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Dirección Principal
                                </FormLabel>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddAddress}
                  className="mt-4 border-dashed border-gray-300">
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir Dirección
                </Button>
              </CardContent>
            </Card>

            {/* Métodos de pago */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center text-gray-800">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Métodos de Pago
                </CardTitle>
              </CardHeader>
              <CardContent>
                {watchMetodosPago.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    No hay métodos de pago registrados
                  </div>
                ) : (
                  <div className="space-y-6">
                    {watchMetodosPago.map((_, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-md relative">
                        <div className="absolute top-2 right-2 flex space-x-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemovePayment(index)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`metodosPago.${index}.tipo`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tipo de Pago</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccione tipo" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {paymentTypes.map((tipo) => (
                                      <SelectItem key={tipo} value={tipo}>
                                        {tipo}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {(form.watch(`metodosPago.${index}.tipo`) ===
                            "Tarjeta de Crédito" ||
                            form.watch(`metodosPago.${index}.tipo`) ===
                              "Tarjeta de Débito") && (
                            <>
                              <FormField
                                control={form.control}
                                name={`metodosPago.${index}.titular`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Titular</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Juan Pérez"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`metodosPago.${index}.numeroTarjeta`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Número de Tarjeta</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="1234567890123456"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`metodosPago.${index}.fechaExpiracion`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Fecha de Expiración</FormLabel>
                                    <FormControl>
                                      <Input {...field} placeholder="MM/YY" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </>
                          )}

                          <FormField
                            control={form.control}
                            name={`metodosPago.${index}.esPrincipal`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-end space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={() =>
                                      handleSetMainPayment(index)
                                    }
                                    disabled={field.value}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Método Principal
                                </FormLabel>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddPayment}
                  className="mt-4 border-dashed border-gray-300">
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir Método de Pago
                </Button>
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
