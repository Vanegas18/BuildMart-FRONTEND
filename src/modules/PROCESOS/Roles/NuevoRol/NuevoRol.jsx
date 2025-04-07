import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { useNuevoRol } from "./useNuevoRol";
import { Button } from "@/shared/components";
import { Plus } from "lucide-react";
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

export const NuevoRol = ({ onRolCreado }) => {
  const { form, loading, onSubmit, open, permisos, setOpen } =
    useNuevoRol(onRolCreado);

  const permisosActivos = permisos.filter(
    (permiso) => permiso.estado === "Activo"
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Rol
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Rol</DialogTitle>
          <DialogDescription>
            Define un nuevo rol con permisos específicos agrupados por categoría
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Rol</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cliente..."
                      {...field}
                      autoFocus
                      aria-label="nombre"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-4 mt-2">
              <h3 className="text-sm font-medium mb-3">Grupos de Permisos</h3>

              {permisosActivos.map((grupoPermiso) => (
                <Accordion
                  key={grupoPermiso._id}
                  type="single"
                  collapsible
                  className="mb-4 border rounded-md">
                  <AccordionItem value={grupoPermiso.nombreGrupo}>
                    <div className="flex items-center w-full">
                      <FormField
                        control={form.control}
                        name="permisos"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mr-4">
                            <FormControl onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                checked={field.value.includes(grupoPermiso._id)}
                                onCheckedChange={(checked) => {
                                  const updatedPermisos = checked
                                    ? [...field.value, grupoPermiso._id]
                                    : field.value.filter(
                                        (id) => id !== grupoPermiso._id
                                      );
                                  field.onChange(updatedPermisos);
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <AccordionTrigger className="px-4 py-2 hover:bg-gray-50">
                        <span>{grupoPermiso.nombreGrupo}</span>
                      </AccordionTrigger>
                    </div>
                    <AccordionContent className="px-4 py-2 space-y-3">
                      {grupoPermiso.permisos.map((permiso) => (
                        <div
                          key={permiso._id}
                          className="flex items-start ml-6 pl-6 border-l border-gray-200 space-y-1 py-2">
                          <div className="space-y-1 leading-none">
                            <p className="text-sm font-medium">
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
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describa las características del rol..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Incluya detalles importantes como privilegios, permisos,
                    etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
