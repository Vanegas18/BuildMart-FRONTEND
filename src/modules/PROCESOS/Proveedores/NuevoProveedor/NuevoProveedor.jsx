import { Button } from "@/shared/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Input } from "@/shared/components/ui/input";
import {
  Plus,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText,
  Tag,
} from "lucide-react";
import { useNuevoProveedor } from "./useNuevoProveedor";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";

export const NuevoProveedor = ({ onProveedorCreado }) => {
  const {
    open,
    setOpen,
    loading,
    form,
    onSubmit,
    categorias,
    loadingCategorias,
  } = useNuevoProveedor(onProveedorCreado);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" text-white transition-all">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Proveedor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center">
            <Building2 className="mr-2 h-5 w-5" />
            Crear Nuevo Proveedor
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Complete los campos a continuación para registrar un nuevo proveedor
            en el sistema
          </DialogDescription>
          <Separator className="my-3" />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="nit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <FileText className="mr-2 h-4 w-4" />
                          NIT
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123456-7"
                            {...field}
                            autoFocus
                            aria-label="nit"
                            className="border-gray-300 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Número de identificación tributaria del proveedor
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
                          <Building2 className="mr-2 h-4 w-4 " />
                          Nombre
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Empresa S.A. de C.V."
                            {...field}
                            aria-label="nombre"
                            className="border-gray-300  focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Nombre completo o razón social del proveedor
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="direccion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <MapPin className="mr-2 h-4 w-4 " />
                          Dirección
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Av. Principal #123, Ciudad"
                            {...field}
                            aria-label="direccion"
                            className="border-gray-300  focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Dirección física donde se encuentra ubicado
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
                          <Phone className="mr-2 h-4 w-4 " />
                          Teléfono
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+123 456 7890"
                            {...field}
                            aria-label="telefono"
                            className="border-gray-300  focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Número de contacto principal
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
                          <Mail className="mr-2 h-4 w-4 " />
                          Correo
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="contacto@empresa.com"
                            type="email"
                            {...field}
                            aria-label="correo"
                            className="border-gray-300  focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Dirección de correo electrónico para comunicaciones
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoriaProveedorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <Tag className="mr-2 h-4 w-4 " />
                          Categoría
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={loadingCategorias}>
                          <FormControl>
                            <SelectTrigger className="border-gray-300  focus:ring-blue-500">
                              <SelectValue
                                placeholder={
                                  loadingCategorias
                                    ? "Cargando categorías..."
                                    : "Seleccione categoría"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {loadingCategorias ? (
                              <div className="p-2 text-center text-sm text-gray-500">
                                Cargando categorías...
                              </div>
                            ) : (
                              categorias?.map((categoria) => (
                                <SelectItem
                                  key={categoria._id}
                                  value={categoria._id}>
                                  {categoria.nombre}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs text-gray-500">
                          Tipo de productos o servicios que ofrece
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                disabled={loading || loadingCategorias}
                className="bg-blue-600 hover:bg-blue-700 transition-all">
                {loading ? "Guardando..." : "Guardar Proveedor"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
