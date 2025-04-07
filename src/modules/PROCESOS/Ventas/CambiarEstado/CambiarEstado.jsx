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
import { Power } from "lucide-react";
import { useState } from "react";
import styles from "../styles/Sales.module.css";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { useVentas } from "@/core/context";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export const CambiarEstado = ({ venta, onEstadoCambiado }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("initial");
  const [selectedEstado, setSelectedEstado] = useState("");  // Valor vacío inicialmente
  const { actualizarEstadoVenta } = useVentas();

  // Paso 1: Seleccionar estado
  const handleCambiarEstado = () => {
    if (!isChecked || !selectedEstado) return;
    setStep("confirmation");  // Avanzar al paso de confirmación
  };

  // Paso 2: Confirmar cambio de estado
  const handleDeactivate = async () => {
    setIsLoading(true);
    try {
      await actualizarEstadoVenta(venta._id, selectedEstado);  // Llamar al API
      toast.success(`Venta actualizada a estado: ${selectedEstado}`);
      onEstadoCambiado?.();  // Notificar al componente padre
      setOpen(false);  // Cerrar el modal
      setStep("initial");  // Reiniciar el flujo
    } catch (error) {
      console.error("No se pudo cambiar el estado", error);
      toast.error(`Error al cambiar estado: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Resetear modal
  const resetConfirmation = () => {
    setIsChecked(false);
    setStep("initial");
    setSelectedEstado("");  // Reiniciar al abrir el modal
  };

  // Filtrar los estados disponibles dependiendo del estado actual de la venta
  let estadosDisponibles = [];

  if (venta.estado === "Cancelada" || venta.estado === "Reembolsada") {
    // Si el estado es Cancelada o Reembolsada, no permitimos cambiar el estado
    estadosDisponibles = [];
  } else if (venta.estado === "Pendiente") {
    // Si el estado es Pendiente, solo mostramos Cancelada y Completada
    estadosDisponibles = ["Completada", "Cancelada"];
  } else if (venta.estado === "Completada") {
    // Si el estado es Completada, solo mostramos Reembolsada
    estadosDisponibles = ["Reembolsada"];
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) resetConfirmation();  // Reiniciar al cerrar el modal
      }}
    >
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Power
            className={venta.estado === "Cancelada" ? styles.inactiveVenta : styles.activeVenta}
          />
        </Button>
      </AlertDialogTrigger>

      {step === "initial" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cambiar estado de la venta</AlertDialogTitle>
            <br />
            <AlertDialogDescription>
              {venta.estado === "Cancelada" ? (
                <p className="text-red-500">El estado de esta venta no se puede cambiar, ya que se encuentra cancelada.</p>
              ) : venta.estado === "Reembolsada" ? (
                <p className="text-red-500">El estado de esta venta no se puede cambiar, ya que se encuentra reembolsada.</p>
              ) : (
                <>
                  La venta con #<strong>{venta.ventaId}</strong> está
                  actualmente en estado <strong>{venta.estado}</strong>. Seleccione
                  el nuevo estado y confirme la acción.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4 py-4">
            {estadosDisponibles.length > 0 && (
              <>
                <div>
                  <Label htmlFor="estado">Nuevo estado</Label>
                  <Select
                    value={selectedEstado}
                    onValueChange={setSelectedEstado}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {estadosDisponibles.map((estado) => (
                        <SelectItem key={estado} value={estado}>
                          {estado}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
                  <Label className="text-sm text-gray-600">
                    Confirmo que quiero cambiar el estado de esta venta.
                  </Label>
                </div>
              </>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleCambiarEstado}
              disabled={!isChecked || !selectedEstado || isLoading || estadosDisponibles.length === 0}
            >
              {isLoading ? "Procesando..." : "Continuar"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}

      {step === "confirmation" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar cambio de estado</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de que desea cambiar el estado de la venta #{" "}
              <strong>{venta.ventaId}</strong> a{" "}
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
              disabled={isLoading}
            >
              {isLoading ? "Procesando..." : `Confirmar cambio de estado`}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
