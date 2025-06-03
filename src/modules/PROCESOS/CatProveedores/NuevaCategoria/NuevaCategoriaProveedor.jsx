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
import { Input } from "@/shared/components/ui/input";
import { Plus, Users, FileText } from "lucide-react";
import { useNuevaCategoriaProv } from "./useNuevaCategoriaProv";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";

export const NuevaCategoriaProveedor = ({ onCategoriaCreada }) => {
  const { open, setOpen, loading, form, onSubmit } =
    useNuevaCategoriaProv(onCategoriaCreada);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Categoría
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center text-gray-800">
            <Users className="mr-2 h-5 w-5" />
            Crear Nueva Categoría de Proveedor
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Complete el formulario para clasificar y organizar sus proveedores
            de manera eficiente.
          </DialogDescription>
          <Separator className="my-3" />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700">
                        <Users className="mr-2 h-4 w-4 text-gray-600" />
                        Nombre de la Categoría
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Mayoristas, Fabricantes, Importadores..."
                          {...field}
                          autoFocus
                          aria-label="nombre"
                          className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Nombre identificativo para esta categoría de
                        proveedores.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel className="flex items-center text-gray-700">
                        <FileText className="mr-2 h-4 w-4 text-gray-600" />
                        Descripción
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describa las características de esta categoría de proveedores..."
                          className="resize-none border-gray-300 focus:border-gray-500 focus:ring-gray-500 min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Incluya detalles importantes sobre esta categoría, como
                        el tipo de proveedores que incluirá, condiciones
                        comerciales típicas o cualquier otra característica
                        relevante.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-2">
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
                {loading ? "Guardando..." : "Guardar Categoría"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
