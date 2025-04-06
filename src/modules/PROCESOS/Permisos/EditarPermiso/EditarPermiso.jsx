import { useState } from "react";
import { Button } from "@/shared/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Pencil, Check, X } from "lucide-react";
import { useEditarPermiso } from "./useEditarPermiso";
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

export const EditarPermiso = ({ permisos, onPermisoEditado }) => {
  const { form, loading, onSubmit, open, setOpen } = useEditarPermiso(
    onPermisoEditado,
    permisos
  );

  // Estado para rastrear qué permiso está siendo editado actualmente
  const [editingPermisoId, setEditingPermisoId] = useState(null);

  // Función para actualizar un permiso específico en el formulario
  const updatePermiso = (permisoId, field, value) => {
    const updatedPermisos = [...form.getValues().permisos];
    const permisoIndex = updatedPermisos.findIndex((p) => p._id === permisoId);

    if (permisoIndex !== -1) {
      updatedPermisos[permisoIndex] = {
        ...updatedPermisos[permisoIndex],
        [field]: value,
      };

      form.setValue("permisos", updatedPermisos);
    }
  };

  // Manejadores de edición
  const handleEditPermiso = (permisoId) => {
    setEditingPermisoId(permisoId);
  };

  const handleCancelEdit = () => {
    setEditingPermisoId(null);
  };

  const handleSavePermisoEdit = (permisoId) => {
    setEditingPermisoId(null);
    // Los cambios ya están en el formulario
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Permiso</DialogTitle>
          <DialogDescription>
            Edite el permiso con un nombre, una descripción y los permisos.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="nombreGrupo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre grupo de Permiso</FormLabel>
                  <FormControl>
                    <Input {...field} autoFocus aria-label="nombreGrupo" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel className="text-sm font-medium">Permisos</FormLabel>
              <div className="grid gap-4">
                {permisos.permisos.map((permiso, index) => (
                  <div
                    key={permiso._id}
                    className="flex items-start justify-between border p-3 rounded-md">
                    <div className="flex-1 space-y-2">
                      {editingPermisoId === permiso._id ? (
                        // Modo de edición - Muestra inputs
                        <>
                          <div>
                            <FormLabel className="text-xs">Etiqueta</FormLabel>
                            <Input
                              defaultValue={permiso.label}
                              className="h-8 mt-1"
                              onChange={(e) =>
                                updatePermiso(
                                  permiso._id,
                                  "label",
                                  e.target.value
                                )
                              }
                              aria-label={`label-${permiso._id}`}
                            />
                          </div>

                          <div className="mt-2">
                            <FormLabel className="text-xs">
                              Descripción
                            </FormLabel>
                            <Textarea
                              defaultValue={permiso.description}
                              className="min-h-[60px] resize-none mt-1"
                              onChange={(e) =>
                                updatePermiso(
                                  permiso._id,
                                  "description",
                                  e.target.value
                                )
                              }
                              aria-label={`description-${permiso._id}`}
                            />
                          </div>
                        </>
                      ) : (
                        // Modo de visualización - Muestra texto
                        <>
                          <FormLabel className="font-medium">
                            {permiso.label}
                          </FormLabel>
                          <FormDescription className="text-sm text-gray-500">
                            {permiso.description}
                          </FormDescription>
                        </>
                      )}
                    </div>

                    {editingPermisoId === permiso._id ? (
                      // Botones para guardar o cancelar edición
                      <div className="flex flex-col gap-2 ml-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleSavePermisoEdit(permiso._id)}>
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={handleCancelEdit}>
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    ) : (
                      // Botón para iniciar edición
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEditPermiso(permiso._id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="pt-4 sticky bottom-0 bg-white pb-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Guardar Permiso"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
