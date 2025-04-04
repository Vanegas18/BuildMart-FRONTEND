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
import { Plus, X } from "lucide-react";
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

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Permiso</DialogTitle>
          <DialogDescription>
            Define un nuevo permiso con un nombre, una descripción y los
            permisos.
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
                    <Input
                      placeholder="Gestión de Clientes..."
                      {...field}
                      autoFocus
                      aria-label="nombreGrupo"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Permisos</FormLabel>

              {/* Lista de permisos agregados */}
              {permisosList.length > 0 && (
                <div className="space-y-2 mb-4 max-h-[200px] overflow-y-auto">
                  <p className="text-sm font-medium">Permisos añadidos:</p>
                  <div className="space-y-2">
                    {permisosList.map((permiso, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between p-3 border rounded-md bg-slate-50">
                        <div className="space-y-1">
                          <p className="font-medium">{permiso.label}</p>
                          <p className="text-sm text-gray-500">
                            {permiso.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => eliminarPermiso(index)}
                          type="button">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Formulario para añadir nuevo permiso */}
              <div className="space-y-3 border rounded-md p-3">
                <p className="text-sm font-medium">Añadir nuevo permiso</p>

                <div className="space-y-2">
                  <FormLabel className="text-sm">Título del permiso</FormLabel>
                  <Input
                    placeholder="Ver perfil propio..."
                    value={nuevoPermiso.label}
                    onChange={(e) =>
                      setNuevoPermiso({
                        ...nuevoPermiso,
                        label: e.target.value,
                      })
                    }
                  />
                  {permisoForm.formState.errors.label && (
                    <p className="text-sm text-red-500">
                      {permisoForm.formState.errors.label.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <FormLabel className="text-sm">Descripción</FormLabel>
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
                  />
                  {permisoForm.formState.errors.description && (
                    <p className="text-sm text-red-500">
                      {permisoForm.formState.errors.description.message}
                    </p>
                  )}
                  <FormDescription className="text-sm">
                    Descripción de lo que el permiso permite hacer.
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
                  className="w-full mt-2"
                  variant="secondary">
                  <Plus className="mr-1 h-4 w-4" /> Añadir Permiso
                </Button>
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
              <Button
                type="submit"
                disabled={loading || permisosList.length === 0}>
                {loading ? "Guardando..." : "Guardar Permiso"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
