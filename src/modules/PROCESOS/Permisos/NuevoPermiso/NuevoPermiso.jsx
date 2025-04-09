import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { useNuevoPermiso } from "./useNuevoPermiso";
import { Button } from "@/shared/components";
import { Plus, X, Lock, FileText, ListPlus } from "lucide-react";
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
import { useState, useEffect } from "react";
import { Textarea } from "@/shared/components/ui/textarea";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";

// Esquema de validación para el formulario de permiso temporal
const permisoTemporalSchema = z.object({
  label: z
    .string()
    .min(3, { message: "La etiqueta debe tener al menos 3 caracteres" }),
  description: z
    .string()
    .min(3, { message: "La descripción debe tener al menos 3 caracteres" }),
});

export const NuevoPermiso = ({ onPermisoCreado }) => {
  const { form, loading, onSubmit, open, setOpen } =
    useNuevoPermiso(onPermisoCreado);
  const [nuevoPermiso, setNuevoPermiso] = useState({
    label: "",
    description: "",
  });
  const [permisosList, setPermisosList] = useState([]);

  // Formulario para validar el permiso individual antes de añadirlo a la lista
  const permisoForm = useForm({
    resolver: zodResolver(permisoTemporalSchema),
    defaultValues: {
      label: "",
      description: "",
    },
  });

  // Limpiar los permisos cuando se cierra y abre el diálogo
  useEffect(() => {
    if (open) {
      // Al abrir el diálogo, resetear la lista de permisos
      setPermisosList([]);
      // Resetear el valor en el formulario principal
      form.setValue("permisos", []);
    }
  }, [open, form]);

  // Sincronizar el estado local con el formulario de validación
  useEffect(() => {
    permisoForm.setValue("label", nuevoPermiso.label);
    permisoForm.setValue("description", nuevoPermiso.description);
  }, [nuevoPermiso, permisoForm]);

  const agregarPermiso = async () => {
    try {
      // Validar el permiso antes de añadirlo
      await permisoForm.trigger();

      if (permisoForm.formState.isValid) {
        const nuevosPermisos = [...permisosList, nuevoPermiso];
        setPermisosList(nuevosPermisos);
        setNuevoPermiso({ label: "", description: "" });
        permisoForm.reset();

        // Actualizar el valor en el formulario principal
        form.setValue("permisos", nuevosPermisos);
      }
    } catch (error) {
      console.error("Error al validar el permiso:", error);
    }
  };

  const eliminarPermiso = (index) => {
    const nuevosPermisos = permisosList.filter((_, i) => i !== index);
    setPermisosList(nuevosPermisos);
    form.setValue("permisos", nuevosPermisos);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Permiso
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center text-gray-800">
            <Lock className="mr-2 h-5 w-5" />
            Crear Nuevo Permiso
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Define un nuevo grupo de permisos con roles y acciones específicas
          </DialogDescription>
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
                          placeholder="Gestión de Clientes, Administración de Datos..."
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

                  {/* Lista de permisos agregados */}
                  {permisosList.length > 0 && (
                    <Card className="border border-gray-200 shadow-sm bg-gray-50">
                      <CardContent className="pt-4 pb-2">
                        <p className="text-sm font-medium text-gray-700 mb-3">
                          Permisos añadidos:
                        </p>
                        <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                          {permisosList.map((permiso, index) => (
                            <div
                              key={index}
                              className="flex items-start justify-between p-3 border rounded-md bg-white shadow-sm">
                              <div className="space-y-1">
                                <p className="font-medium text-gray-800">
                                  {permiso.label}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {permiso.description}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => eliminarPermiso(index)}
                                type="button"
                                className="hover:bg-gray-100 text-gray-500">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Formulario para añadir nuevo permiso */}
                  <Card className="border border-gray-200 shadow-sm">
                    <CardContent className="pt-4">
                      <p className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                        <Plus className="mr-2 h-4 w-4 text-gray-600" />
                        Añadir nuevo permiso
                      </p>

                      <div className="space-y-4">
                        <div>
                          <FormLabel className="text-sm text-gray-700">
                            Título del permiso
                          </FormLabel>
                          <Input
                            placeholder="Ver perfil propio, Editar usuarios..."
                            value={nuevoPermiso.label}
                            onChange={(e) =>
                              setNuevoPermiso({
                                ...nuevoPermiso,
                                label: e.target.value,
                              })
                            }
                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 mt-1"
                          />
                          {permisoForm.formState.errors.label && (
                            <p className="text-xs text-red-500 mt-1">
                              {permisoForm.formState.errors.label.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <FormLabel className="text-sm text-gray-700">
                            Descripción
                          </FormLabel>
                          <Textarea
                            placeholder="Puede ver y acceder a su información personal en el sistema..."
                            value={nuevoPermiso.description}
                            onChange={(e) =>
                              setNuevoPermiso({
                                ...nuevoPermiso,
                                description: e.target.value,
                              })
                            }
                            rows={2}
                            className="resize-none border-gray-300 focus:border-gray-500 focus:ring-gray-500 mt-1"
                          />
                          {permisoForm.formState.errors.description && (
                            <p className="text-xs text-red-500 mt-1">
                              {permisoForm.formState.errors.description.message}
                            </p>
                          )}
                          <FormDescription className="text-xs text-gray-500 mt-1">
                            Descripción detallada de lo que este permiso permite
                            hacer
                          </FormDescription>
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

                        <Button
                          type="button"
                          onClick={agregarPermiso}
                          className="w-full mt-2  transition-all"
                          variant="secondary">
                          <Plus className="mr-1 h-4 w-4" /> Añadir Permiso
                        </Button>
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
                disabled={loading || permisosList.length === 0}
                className="bg-blue-600 hover:bg-blue-700 transition-all">
                {loading ? "Guardando..." : "Guardar Permiso"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
