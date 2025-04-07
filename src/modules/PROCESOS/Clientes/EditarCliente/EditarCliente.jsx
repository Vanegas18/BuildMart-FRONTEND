import { useForm, Controller } from "react-hook-form";
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
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useClientes } from "@/core/context";
import { Input } from "@/shared/components/ui/input";
import { toast } from "sonner";

export const EditarCliente = ({ cliente, onClienteEditado }) => {
  const { editarCliente } = useClientes();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Usamos useForm para el control del formulario
  const { control, handleSubmit, formState: { errors } } = useForm();

  // Manejo del submit
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("Datos enviados para editar:", data); // Verifica los datos enviados

      // Aseguramos de enviar el _id (o el identificador necesario)
      const clienteConId = { ...data, _id: cliente._id };

      const clienteEditado = await editarCliente(clienteConId); // Llama al contexto para editar el cliente
      toast.success("Cliente editado exitosamente");
      onClienteEditado?.(clienteEditado); // Callback para notificar cuando se edita un cliente
      setOpen(false);
    } catch (error) {
      console.error("Error al editar cliente", error);
      toast.error("Error al editar el cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
          <DialogDescription>
            Modifique la información del cliente y guarde los cambios.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre */}
          <div>
            <label>Nombre</label>
            <Controller
              name="nombre"
              control={control}
              defaultValue={cliente.nombre}
              render={({ field }) => <Input {...field} aria-label="nombre" />}
            />
            {errors.nombre && <span>{errors.nombre.message}</span>}
          </div>

          {/* Correo electrónico */}
          <div>
            <label>Correo electrónico</label>
            <Controller
              name="correo"
              control={control}
              defaultValue={cliente.correo}
              render={({ field }) => <Input {...field} aria-label="correo" />}
            />
            {errors.correo && <span>{errors.correo.message}</span>}
          </div>

          {/* Teléfono */}
          <div>
            <label>Teléfono</label>
            <Controller
              name="telefono"
              control={control}
              defaultValue={cliente.telefono}
              render={({ field }) => <Input {...field} aria-label="telefono" />}
            />
            {errors.telefono && <span>{errors.telefono.message}</span>}
          </div>

          {/* Dirección */}
          <div>
            <label>Dirección</label>
            <Controller
              name="direccion"
              control={control}
              defaultValue={cliente.direccion}
              render={({ field }) => <Input {...field} aria-label="direccion" />}
            />
            {errors.direccion && <span>{errors.direccion.message}</span>}
          </div>

          {/* Departamento */}
          <div>
            <label>Departamento</label>
            <Controller
              name="departamento"
              control={control}
              defaultValue={cliente.departamento}
              render={({ field }) => <Input {...field} aria-label="departamento" />}
            />
            {errors.departamento && <span>{errors.departamento.message}</span>}
          </div>

          {/* Ciudad */}
          <div>
            <label>Ciudad</label>
            <Controller
              name="ciudad"
              control={control}
              defaultValue={cliente.ciudad}
              render={({ field }) => <Input {...field} aria-label="ciudad" />}
            />
            {errors.ciudad && <span>{errors.ciudad.message}</span>}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
