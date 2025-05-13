import { useState } from "react";
import { Button } from "@/shared/components";
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
import {
  Pencil,
  Check,
  X,
  Lock,
  FileText,
  ListPlus,
  Trash2,
} from "lucide-react";
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
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";

export const EditarPermiso = ({ permisos, onPermisoEditado }) => {
  const { form, loading, onSubmit, open, setOpen } = useEditarPermiso(
    onPermisoEditado,
    permisos
  );

  // Estado para rastrear qué permiso está siendo editado actualmente
  const [editingPermisoId, setEditingPermisoId] = useState(null);

  // Estado para manejar el diálogo de confirmación de eliminación
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [permisoToDelete, setPermisoToDelete] = useState(null);

  // Estado para mantener una vista actualizada de los permisos
  const [permisosVisibles, setPermisosVisibles] = useState(permisos.permisos);

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
      setPermisosVisibles(updatedPermisos); // Actualizar la vista
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
    // Los cambios ya están en el formulario y reflejados en permisosVisibles
  };

  // Manejadores de eliminación
  const handleDeleteDialog = (permisoId) => {
    setPermisoToDelete(permisoId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (permisoToDelete) {
      const updatedPermisos = form
        .getValues()
        .permisos.filter((p) => p._id !== permisoToDelete);

      form.setValue("permisos", updatedPermisos);
      setPermisosVisibles(updatedPermisos); // Actualizar la vista
      setDeleteDialogOpen(false);
      setPermisoToDelete(null);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(newOpen) => {
          if (open && !newOpen) {
            return;
          }
          setOpen(newOpen);
        }}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-2xl font-bold flex items-center text-gray-800">
              <Lock className="mr-2 h-5 w-5" />
              Editar Permiso
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Modifique el grupo de permisos con roles y acciones específicas
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
                  <FormField
                    control={form.control}
                    name="nombreGrupo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <FileText className="mr-2 h-4 w-4 text-gray-600" />
                          Nombre del Grupo de Permisos
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            autoFocus
                            aria-label="nombreGrupo"
                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Nombre descriptivo para esta categoría de permisos
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-6 space-y-4">
                    <h3 className="text-sm font-medium flex items-center mb-2 text-gray-700">
                      <ListPlus className="mr-2 h-4 w-4 text-gray-600" />
                      Permisos Individuales
                    </h3>

                    <Card className="border border-gray-200 shadow-sm bg-gray-50">
                      <CardContent className="pt-4 pb-2">
                        <p className="text-sm font-medium text-gray-700 mb-3">
                          Permisos del grupo:
                        </p>
                        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                          {permisosVisibles.map((permiso) => (
                            <div
                              key={permiso._id}
                              className="flex items-start justify-between p-3 border rounded-md bg-white shadow-sm">
                              <div className="flex-1 space-y-2">
                                {editingPermisoId === permiso._id ? (
                                  // Modo de edición - Muestra inputs
                                  <>
                                    <div>
                                      <FormLabel className="text-xs text-gray-700">
                                        Título del permiso
                                      </FormLabel>
                                      <Input
                                        defaultValue={permiso.label}
                                        className="h-9 mt-1 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
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
                                      <FormLabel className="text-xs text-gray-700">
                                        Descripción
                                      </FormLabel>
                                      <Textarea
                                        defaultValue={permiso.description}
                                        className="min-h-[60px] resize-none mt-1 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                                        onChange={(e) =>
                                          updatePermiso(
                                            permiso._id,
                                            "description",
                                            e.target.value
                                          )
                                        }
                                        aria-label={`description-${permiso._id}`}
                                      />
                                      <FormDescription className="text-xs text-gray-500 mt-1">
                                        Descripción detallada de lo que este
                                        permiso permite hacer
                                      </FormDescription>
                                    </div>
                                  </>
                                ) : (
                                  // Modo de visualización - Muestra texto
                                  <>
                                    <p className="font-medium text-gray-800">
                                      {permiso.label}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {permiso.description}
                                    </p>
                                  </>
                                )}
                              </div>

                              <div className="flex space-x-1 ml-2">
                                {editingPermisoId === permiso._id ? (
                                  // Botones para guardar o cancelar edición
                                  <>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        handleSavePermisoEdit(permiso._id)
                                      }
                                      className="hover:bg-green-50">
                                      <Check className="h-4 w-4 text-green-600" />
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={handleCancelEdit}
                                      className="hover:bg-red-50">
                                      <X className="h-4 w-4 text-red-600" />
                                    </Button>
                                  </>
                                ) : (
                                  // Botones para editar y eliminar
                                  <>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        handleEditPermiso(permiso._id)
                                      }
                                      className="hover:bg-gray-100 text-gray-500">
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        handleDeleteDialog(permiso._id)
                                      }
                                      className="hover:bg-red-50 text-red-500">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
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
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 transition-all">
                  {loading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminación */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este permiso?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El permiso se eliminará
              permanentemente del grupo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
