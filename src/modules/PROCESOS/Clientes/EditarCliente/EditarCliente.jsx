import { User, Pencil, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { Button } from "@/shared/components";
import { Separator } from "@/shared/components/ui/separator";

import { useEditarCliente } from "./useEditarCliente";
import { InfoBasicaCliente } from "./components/InfoBasicaCliente";
import { DireccionesCliente } from "./components/DireccionesCliente";
import { MetodosPagoCliente } from "./components/MetodosPagoCliente";

export const EditarCliente = ({ cliente, onClienteEditado }) => {
  const { open, setOpen, loading, form, onSubmit } = useEditarCliente(
    onClienteEditado,
    cliente
  );

  const onError = (errors) => {
    console.log("Errores de validación:", errors);
  };

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
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center text-gray-800">
            <User className="mr-2 h-5 w-5" />
            Editar Cliente
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Actualice la información del cliente en la base de datos.
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
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-6">
            {/* Información básica del cliente */}
            <InfoBasicaCliente form={form} />

            {/* Direcciones */}
            <DireccionesCliente form={form} />

            {/* Métodos de pago */}
            <MetodosPagoCliente form={form} />

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
  );
};
