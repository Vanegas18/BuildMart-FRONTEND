import { Button } from "@/shared/components";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { useState } from "react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { usePedidos } from "@/core/context";
import { toast } from "sonner";

export const PedidoDesactivar = ({ pedido, open, onOpenChange }) => {
  const [step, setStep] = useState("initial");
  const [selectedEstado, setSelectedEstado] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { actualizarEstadoPedido } = usePedidos();

  const resetConfirmation = () => {
    setIsChecked(false);
    setStep("initial");
    setSelectedEstado("");
  };

  let estadosDisponibles = [];
  if (pedido.estado === "pendiente") {
    estadosDisponibles = ["cancelado"];
  }

  const handleCambiarEstado = () => {
    if (!isChecked) return;
    setSelectedEstado("cancelado"); // Establecer el estado inmediatamente
    setStep("confirmation");
  };

  const handleDeactivate = async () => {
    setIsLoading(true);
    try {
      await actualizarEstadoPedido(pedido._id, "cancelado");
      toast.success("Pedido cancelado exitosamente");
      onOpenChange(false);
    } catch (error) {
      console.error("No se pudo cancelar el pedido", error);
      toast.error("Error al cancelar el pedido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isLoading) {
          onOpenChange(isOpen);
          if (!isOpen) resetConfirmation();
        }
      }}>
      {step === "initial" ? (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar Pedido</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="text-gray-700">
                ¿Estás seguro de que deseas cancelar el pedido #
                <strong>
                  PED-{pedido.pedidoId.toString().padStart(3, "0")}
                </strong>
                ?
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={isChecked}
                onCheckedChange={setIsChecked}
                id="confirm-cancel"
              />
              <Label htmlFor="confirm-cancel" className="text-sm text-gray-600">
                Confirmo que quiero cancelar este pedido.
              </Label>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => onOpenChange(false)}>
              Volver
            </AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleCambiarEstado}
              disabled={!isChecked}>
              Continuar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      ) : (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Cancelación</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700">
              Esta acción cancelará el pedido #PED-
              {pedido.pedidoId.toString().padStart(3, "0")}
              <br />
              <span className="text-destructive font-medium mt-2 block">
                Esta acción no se puede deshacer.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setStep("initial")}>
              Volver
            </AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDeactivate}
              disabled={isLoading}>
              {isLoading ? "Cancelando..." : "Confirmar Cancelación"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
