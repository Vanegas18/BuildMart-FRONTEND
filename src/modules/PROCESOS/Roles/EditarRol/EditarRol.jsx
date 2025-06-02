import React from "react";
import { useEditarRol } from "./useEditarRol";
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
import { FileText, Lock, Pencil, Shield, X } from "lucide-react";
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
import { Separator } from "@/shared/components/ui/separator";
import { Card, CardContent } from "@/shared/components/ui/card";

export const EditarRol = ({ rol, onRolEditado }) => {
  const { form, loading, onSubmit, open, permisos, setOpen } = useEditarRol({
    rol,
    onRolEditado,
  });

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
        <Button
          variant="ghost"
          size="icon"
          className="ml-3 sm:ml-6 w-auto px-2 sm:px-3">
          <Pencil className="h-4 w-4 mr-1 sm:mr-0 sm:ml-3" />
          <span className="font-semibold text-xs sm:text-sm">Editar Rol</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-[700px] max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6 flex-shrink-0">
          <DialogTitle className="text-lg sm:text-2xl font-bold flex items-center text-gray-800 pr-8">
            <Pencil className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="truncate">Editar Rol</span>
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Modifique la información del rol y guarde los cambios.
          </DialogDescription>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 p-2 rounded-full hover:bg-gray-100 transition-all">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
          <Separator className="my-2 sm:my-3" />
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700 text-sm">
                          <Shield className="mr-2 h-4 w-4 text-gray-600 flex-shrink-0" />
                          Nombre del Rol
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            autoFocus
                            aria-label="nombre"
                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 text-sm"
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
                    <h3 className="text-sm font-medium flex items-center mb-3 sm:mb-4 text-gray-700">
                      <Lock className="mr-2 h-4 w-4 text-gray-600 flex-shrink-0" />
                      Grupos de Permisos
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {permisosActivos.map((grupoPermiso) => (
                        <Accordion
                          key={grupoPermiso._id}
                          type="single"
                          collapsible
                          className="border rounded-md shadow-sm">
                          <AccordionItem
                            value={grupoPermiso.nombreGrupo}
                            className="border-none">
                            <div className="flex items-center w-full min-h-[48px]">
                              <FormField
                                control={form.control}
                                name="permisos"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center space-x-2 sm:space-x-3 space-y-0 ml-2 sm:ml-3 mr-2">
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
                                        className="border-gray-400 data-[state=checked]:bg-gray-700 data-[state=checked]:border-gray-700 flex-shrink-0"
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />

                              <AccordionTrigger className="flex-1 px-2 sm:px-4 py-3 hover:bg-gray-50 font-medium text-gray-700 text-sm text-left [&>svg]:ml-auto [&>svg]:flex-shrink-0">
                                <span className="truncate pr-2">
                                  {grupoPermiso.nombreGrupo}
                                </span>
                              </AccordionTrigger>
                            </div>
                            <AccordionContent className="px-3 sm:px-4 py-3 bg-gray-50">
                              {grupoPermiso.permisos.map((permiso) => (
                                <div
                                  key={permiso._id}
                                  className="ml-3 sm:ml-6 pl-3 sm:pl-6 border-l border-gray-300 py-2 mb-2 last:mb-0">
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
                        <FormLabel className="flex items-center text-gray-700 text-sm">
                          <FileText className="mr-2 h-4 w-4 text-gray-600 flex-shrink-0" />
                          Descripción
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describa las características del rol..."
                            className="resize-none border-gray-300 focus:border-gray-500 focus:ring-gray-500 min-h-20 sm:min-h-24 text-sm"
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
            </form>
          </Form>
        </div>

        <DialogFooter className="flex-shrink-0 px-4 sm:px-6 py-4 space-y-2 sm:space-y-0 sm:space-x-3 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
            className="w-full sm:w-auto order-2 sm:order-1 border-gray-300 hover:bg-gray-100 transition-all">
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading}
            onClick={form.handleSubmit(onSubmit)}
            className="w-full sm:w-auto order-1 sm:order-2 bg-blue-600 hover:bg-blue-700 transition-all">
            {loading ? "Guardando..." : "Guardar Rol"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
