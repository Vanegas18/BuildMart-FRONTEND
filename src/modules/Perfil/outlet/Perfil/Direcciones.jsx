import { useState } from "react";
import { useClientes } from "@/core/context";
import { Button } from "@/shared/components/ui";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Edit, Trash2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Esquema de validación para direcciones
const DireccionSchema = z.object({
  tipo: z.string({
    required_error: "El tipo de dirección es obligatorio.",
  }),
  calle: z
    .string()
    .trim()
    .min(15, { message: "La dirección debe tener al menos 15 caracteres." }),
  ciudad: z
    .string()
    .trim()
    .min(3, {
      message: "La ciudad es obligatoria y debe tener al menos 3 caracteres.",
    }),
  departamento: z
    .string()
    .trim()
    .min(3, {
      message:
        "El departamento es obligatorio y debe tener al menos 3 caracteres.",
    }),
  codigoPostal: z.string().optional(),
  esPrincipal: z.boolean().default(false),
});

export const Direcciones = ({ cliente, onClienteEditado }) => {
  const { editarCliente } = useClientes();
  const [editandoDireccion, setEditandoDireccion] = useState(null);
  const [agregandoDireccion, setAgregandoDireccion] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(DireccionSchema),
    defaultValues: {
      tipo: "",
      calle: "",
      ciudad: "",
      departamento: "",
      codigoPostal: "",
      esPrincipal: false,
    },
  });

  const handleEditarDireccion = (direccion) => {
    form.reset({
      tipo: direccion.tipo,
      calle: direccion.calle,
      ciudad: direccion.ciudad,
      departamento: direccion.departamento,
      codigoPostal: direccion.codigoPostal || "",
      esPrincipal: direccion.esPrincipal,
    });
    setEditandoDireccion(direccion._id);
    setAgregandoDireccion(false);
  };

  const handleAgregarDireccion = () => {
    form.reset({
      tipo: "",
      calle: "",
      ciudad: "",
      departamento: "",
      codigoPostal: "",
      esPrincipal: false,
    });
    setEditandoDireccion(null);
    setAgregandoDireccion(true);
  };

  const handleCancelar = () => {
    setEditandoDireccion(null);
    setAgregandoDireccion(false);
  };

  const handleEliminarDireccion = async (direccionId) => {
    setLoading(true);
    try {
      const nuevasDirecciones = cliente.direcciones.filter(
        (d) => d._id !== direccionId
      );
      await editarCliente({
        _id: cliente._id,
        direcciones: nuevasDirecciones,
      });
      onClienteEditado();
    } catch (error) {
      console.error("Error al eliminar dirección:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      let nuevasDirecciones = [...cliente.direcciones];

      // Si la nueva dirección se marca como principal, quitar la marca de otras direcciones
      if (data.esPrincipal) {
        nuevasDirecciones = nuevasDirecciones.map((dir) => ({
          ...dir,
          esPrincipal: false,
        }));
      }

      if (editandoDireccion) {
        // Actualizar dirección existente
        nuevasDirecciones = nuevasDirecciones.map((dir) =>
          dir._id === editandoDireccion ? { ...dir, ...data } : dir
        );
      } else if (agregandoDireccion) {
        // Agregar nueva dirección
        nuevasDirecciones.push({
          ...data,
        });
      }

      await editarCliente({
        _id: cliente._id,
        direcciones: nuevasDirecciones,
      });
      onClienteEditado();
      setEditandoDireccion(null);
      setAgregandoDireccion(false);
    } catch (error) {
      console.error("Error al guardar dirección:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Direcciones</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cliente.direcciones && cliente.direcciones.length > 0 ? (
          cliente.direcciones.map((direccion) => (
            <div key={direccion._id} className="rounded-lg border p-4">
              {editandoDireccion === direccion._id ? (
                <DireccionForm
                  form={form}
                  onSubmit={handleSubmit}
                  onCancel={handleCancelar}
                  loading={loading}
                />
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {direccion.esPrincipal && <Badge>Principal</Badge>}
                      <h3 className="font-medium">{direccion.tipo}</h3>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditarDireccion(direccion)}>
                        <Edit className="mr-1 h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleEliminarDireccion(direccion._id)}
                        disabled={loading}>
                        <Trash2 className="mr-1 h-4 w-4" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>{direccion.calle}</p>
                    <p>
                      {direccion.ciudad}, {direccion.departamento}
                      {direccion.codigoPostal && ` - ${direccion.codigoPostal}`}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            No hay direcciones registradas.
          </div>
        )}

        {agregandoDireccion ? (
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Nueva Dirección</h3>
            <DireccionForm
              form={form}
              onSubmit={handleSubmit}
              onCancel={handleCancelar}
              loading={loading}
            />
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={handleAgregarDireccion}>
            <Plus className="mr-2 h-4 w-4" />
            Añadir Nueva Dirección
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// Componente para el formulario de dirección (tanto para editar como para agregar)
const DireccionForm = ({ form, onSubmit, onCancel, loading }) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Casa">Casa</SelectItem>
                    <SelectItem value="Trabajo">Trabajo</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="calle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Carrera 97 # 70D-10, Piso 3, Apto 302"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="ciudad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ciudad</FormLabel>
                <FormControl>
                  <Input placeholder="Medellín" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="departamento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departamento</FormLabel>
                <FormControl>
                  <Input placeholder="Antioquia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="codigoPostal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código Postal</FormLabel>
                <FormControl>
                  <Input placeholder="Opcional" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="esPrincipal"
            render={({ field }) => (
              <FormItem className="flex flex-row items-end space-x-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="h-4 w-4"
                  />
                </FormControl>
                <FormLabel>Establecer como dirección principal</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
