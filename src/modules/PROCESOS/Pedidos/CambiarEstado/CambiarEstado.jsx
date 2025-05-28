import { Button } from "@/shared/components";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { Power, PowerCircleIcon } from "lucide-react";
import { useState } from "react";
import styles from "../styles/Orders.module.css";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { usePedidos } from "@/core/context";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export const CambiarEstado = ({ pedido, onEstadoCambiado }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("initial");
  const [selectedEstado, setSelectedEstado] = useState("");
  const { actualizarEstadoPedido } = usePedidos();

  const handleCambiarEstado = () => {
    if (!isChecked || !selectedEstado) return;
    setStep("confirmation");
  };

  const handleDeactivate = async () => {
    setIsLoading(true);
    try {
      await actualizarEstadoPedido(pedido._id, selectedEstado);
      toast.success(`Pedido actualizado a estado: ${selectedEstado}`);
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Espera 1 segundo para que se vea el toast
      onEstadoCambiado?.();
      setOpen(false);
      setStep("initial");
    } catch (error) {
      console.error("No se pudo cambiar el estado", error);
      toast.error(`Error al cambiar estado: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetConfirmation = () => {
    setIsChecked(false);
    setStep("initial");
    setSelectedEstado("");
  };

  let estadosDisponibles = [];
  if (pedido.estado === "pendiente") {
    estadosDisponibles = ["confirmado", "rechazado"];
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) resetConfirmation();
      }}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PowerCircleIcon
            className={
              pedido.estado === "rechazado"
                ? styles.inactivePedido
                : styles.activePedido
            }
          />
        </Button>
      </AlertDialogTrigger>

      {step === "initial" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cambiar estado del pedido</AlertDialogTitle>
            <br />
            <AlertDialogDescription>
              {pedido.estado !== "pendiente" ? (
                <p className="text-red-500">
                  El estado de este pedido no se puede cambiar, ya que se
                  encuentra <strong>{pedido.estado}</strong>.
                </p>
              ) : (
                <>
                  El pedido con #<strong>{pedido.pedidoId}</strong> está
                  actualmente en estado <strong>{pedido.estado}</strong>.
                  Selecciona el nuevo estado y confirma la acción.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {estadosDisponibles.length > 0 && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="estado">Nuevo estado</Label>
                <Select
                  value={selectedEstado}
                  onValueChange={setSelectedEstado}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estadosDisponibles.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        {estado === "confirmado" ? "Confirmado" : "Rechazado"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
                <Label className="text-sm text-gray-600">
                  Confirmo que quiero cambiar el estado de este pedido.
                </Label>
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            {estadosDisponibles.length === 0 ? (
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cerrar
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={handleCambiarEstado}
                disabled={!isChecked || !selectedEstado || isLoading}>
                {isLoading ? "Procesando..." : "Continuar"}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      )}

      {step === "confirmation" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar cambio de estado</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de que desea cambiar el estado del pedido #
              <strong> {pedido.pedidoId} </strong> a{" "}
              <strong>{selectedEstado}</strong>?<br />
              <br />
              <span className="text-destructive font-medium">
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
              {isLoading ? "Procesando..." : `Confirmar cambio de estado`}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
