import React from "react";
import { useEditarRol } from "./useEditarRol";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components";
import { FileText, Lock, Pencil, Shield } from "lucide-react";
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className={"ml-6"}>
          <Pencil className="ml-3 h-4 w-4" />
          <span className="font-semibold">Editar Rol</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center text-gray-800">
            <Pencil className="mr-2 h-5 w-5" />
            Editar Rol
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Modifique la información del rol y guarde los cambios.
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
                        <Shield className="mr-2 h-4 w-4 text-gray-600" />
                        Nombre del Rol
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoFocus
                          aria-label="nombre"
                          className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Nombre identificativo para este rol
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-6">
                  <h3 className="text-sm font-medium flex items-center mb-4 text-gray-700">
                    <Lock className="mr-2 h-4 w-4 text-gray-600" />
                    Grupos de Permisos
                  </h3>
                  <div className="space-y-3">
                    {permisosActivos.map((grupoPermiso) => (
                      <Accordion
                        key={grupoPermiso._id}
                        type="single"
                        collapsible
                        className="mb-4 border rounded-md shadow-sm">
                        <AccordionItem
                          value={grupoPermiso.nombreGrupo}
                          className="border-none">
                          <div className="flex items-center w-full">
                            <FormField
                              control={form.control}
                              name="permisos"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mr-4 ml-3">
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
                                      className="border-gray-400 data-[state=checked]:bg-gray-700 data-[state=checked]:border-gray-700"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 font-medium text-gray-700">
                              <span>{grupoPermiso.nombreGrupo}</span>
                            </AccordionTrigger>
                          </div>
                          <AccordionContent className="px-4 py-3 bg-gray-50">
                            {grupoPermiso.permisos.map((permiso) => (
                              <div
                                key={permiso._id}
                                className="flex items-start ml-6 pl-6 border-l border-gray-300 space-y-1 py-3 mb-2 last:mb-0">
                                <div className="space-y-1 leading-none">
                                  <p className="text-sm font-medium text-gray-700">
                                    {permiso.label}
                                  </p>
                                  <p className="text-xs text-gray-500">
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
                    <FormItem className="mt-6">
                      <FormLabel className="flex items-center text-gray-700">
                        <FileText className="mr-2 h-4 w-4 text-gray-600" />
                        Descripción
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describa las características del rol..."
                          className="resize-none border-gray-300 focus:border-gray-500 focus:ring-gray-500 min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Incluya detalles importantes sobre este rol, como sus
                        responsabilidades, nivel de acceso y casos de uso
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Guardar Rol"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
