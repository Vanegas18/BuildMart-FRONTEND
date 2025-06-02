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
import { useNuevoRol } from "./useNuevoRol";
import { Button } from "@/shared/components";
import { Plus, UserPlus, FileText, Lock, Shield, X } from "lucide-react";
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
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";

export const NuevoRol = ({ onRolCreado }) => {
  const { form, loading, onSubmit, open, permisos, setOpen } =
    useNuevoRol(onRolCreado);

  const permisosActivos = permisos.filter(
    (permiso) => permiso.estado === "Activo"
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
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Nuevo Rol
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-[700px] max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="pb-2 sm:pb-4 relative">
          <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center text-gray-800 pr-8">
            <UserPlus className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="leading-tight">Crear Nuevo Rol</span>
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-sm sm:text-base">
            Define un nuevo rol con permisos específicos agrupados por
            categoría.
          </DialogDescription>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="absolute top-0 right-0 p-2 h-8 w-8 rounded-full hover:bg-gray-100 transition-all">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
          <Separator className="my-2 sm:my-3" />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700 text-sm sm:text-base">
                        <Shield className="mr-2 h-4 w-4 text-gray-600 flex-shrink-0" />
                        Nombre del Rol
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Administrador, Supervisor, Cliente..."
                          {...field}
                          autoFocus
                          aria-label="nombre"
                          className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 text-base"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Nombre identificativo para este rol.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-4 sm:mt-6">
                  <h3 className="text-sm sm:text-base font-medium flex items-center mb-3 sm:mb-4 text-gray-700">
                    <Lock className="mr-2 h-4 w-4 text-gray-600 flex-shrink-0" />
                    Grupos de Permisos
                  </h3>

                  <div className="space-y-2 sm:space-y-3">
                    {permisosActivos.map((grupoPermiso) => (
                      <Accordion
                        key={grupoPermiso._id}
                        type="single"
                        collapsible
                        className="mb-2 sm:mb-4 border rounded-md shadow-sm">
                        <AccordionItem
                          value={grupoPermiso.nombreGrupo}
                          className="border-none">
                          <div className="flex items-center w-full">
                            <FormField
                              control={form.control}
                              name="permisos"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-2 sm:space-x-3 space-y-0 mr-2 sm:mr-4 ml-2 sm:ml-3">
                                  <FormControl
                                    onClick={(e) => e.stopPropagation()}>
                                    <Checkbox
                                      checked={field.value.includes(
                                        grupoPermiso._id
                                      )}
                                      onCheckedChange={(checked) => {
                                        const updatedPermisos = checked
                                          ? [...field.value, grupoPermiso._id]
                                          : field.value.filter(
                                              (id) => id !== grupoPermiso._id
                                            );
                                        field.onChange(updatedPermisos);
                                      }}
                                      className="border-gray-400 data-[state=checked]:bg-gray-700 data-[state=checked]:border-gray-700 mt-1"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <AccordionTrigger className="px-2 sm:px-4 py-3 hover:bg-gray-50 font-medium text-gray-700 text-sm sm:text-base flex-1 text-left">
                              <span className="leading-tight">
                                {grupoPermiso.nombreGrupo}
                              </span>
                            </AccordionTrigger>
                          </div>
                          <AccordionContent className="px-2 sm:px-4 py-3 bg-gray-50">
                            {grupoPermiso.permisos.map((permiso) => (
                              <div
                                key={permiso._id}
                                className="flex items-start ml-4 sm:ml-6 pl-3 sm:pl-6 border-l border-gray-300 space-y-1 py-2 sm:py-3 mb-2 last:mb-0">
                                <div className="space-y-1 leading-none">
                                  <p className="text-sm font-medium text-gray-700">
                                    {permiso.label}
                                  </p>
                                  <p className="text-xs text-gray-500 leading-relaxed">
                                    {permiso.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>

                  <FormField
                    control={form.control}
                    name="permisos"
                    render={({ field }) => (
                      <FormItem>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem className="mt-4 sm:mt-6">
                      <FormLabel className="flex items-center text-gray-700 text-sm sm:text-base">
                        <FileText className="mr-2 h-4 w-4 text-gray-600 flex-shrink-0" />
                        Descripción
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describa las características del rol..."
                          className="resize-none border-gray-300 focus:border-gray-500 focus:ring-gray-500 min-h-20 sm:min-h-24 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500 leading-relaxed">
                        Incluya detalles importantes sobre este rol, como sus
                        responsabilidades, nivel de acceso y casos de uso.
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
                className="w-full sm:w-auto border-gray-300 hover:bg-gray-100 transition-all">
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-all">
                {loading ? "Guardando..." : "Guardar Rol"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
