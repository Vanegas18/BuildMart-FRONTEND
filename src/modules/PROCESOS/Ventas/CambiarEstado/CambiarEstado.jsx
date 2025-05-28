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
  const [selectedEstado, setSelectedEstado] = useState(""); // Valor vacío inicialmente
  const { actualizarEstadoVenta } = useVentas();

  // Función para capitalizar la primera letra
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Paso 1: Seleccionar estado
  const handleCambiarEstado = () => {
    if (!isChecked || !selectedEstado) return;
    setStep("confirmation"); // Avanzar al paso de confirmación
  };

  // Paso 2: Confirmar cambio de estado
  const handleDeactivate = async () => {
    setIsLoading(true);
    try {
      await actualizarEstadoVenta(venta._id, selectedEstado); // Llamar al API
      toast.success(
        `Venta actualizada a estado: ${capitalizeFirst(selectedEstado)}`
      );
      onEstadoCambiado?.(); // Notificar al componente padre
      setOpen(false); // Cerrar el modal
      setStep("initial"); // Reiniciar el flujo
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
    setSelectedEstado(""); // Reiniciar al abrir el modal
  };

  // Filtrar los estados disponibles dependiendo del estado actual de la venta
  let estadosDisponibles = [];

  if (venta.estado === "reembolsado") {
    // Si el estado es reembolsado, no permitimos cambiar el estado (estado final)
    estadosDisponibles = [];
  } else if (venta.estado === "procesando") {
    // Desde procesando puede ir a enviado
    estadosDisponibles = ["enviado"];
  } else if (venta.estado === "enviado") {
    // Desde enviado puede ir a entregado
    estadosDisponibles = ["entregado"];
  } else if (venta.estado === "entregado") {
    // Desde entregado puede ir a completado
    estadosDisponibles = ["completado"];
  } else if (venta.estado === "completado") {
    // Desde completado puede ir a reembolsado
    estadosDisponibles = ["reembolsado"];
  }

  // Función para obtener el mensaje descriptivo del estado
  const getEstadoMessage = (estado) => {
    const mensajes = {
      procesando: "La orden está siendo procesada",
      enviado: "La orden ha sido enviada",
      entregado: "La orden ha sido entregada",
      completado: "La orden ha sido completada",
      reembolsado: "La orden ha sido reembolsada",
    };
    return mensajes[estado] || estado;
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) resetConfirmation(); // Reiniciar al cerrar el modal
      }}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PowerCircleIcon
            className={
              venta.estado === "reembolsado"
                ? styles.inactiveVenta
                : styles.activeVenta
            }
          />
        </Button>
      </AlertDialogTrigger>

      {step === "initial" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cambiar estado de la venta</AlertDialogTitle>
            <br />
            <AlertDialogDescription>
              {venta.estado === "reembolsado" ? (
                <p className="text-red-500">
                  El estado de esta venta no se puede cambiar, ya que se
                  encuentra reembolsada.
                </p>
              ) : venta.estado === "completado" ? (
                <>
                  La venta con #<strong>{venta.ventaId}</strong> está
                  actualmente <strong>completada</strong>. Solo puede ser
                  cambiada a reembolsado si es necesario.
                </>
              ) : (
                <>
                  La venta con #<strong>{venta.ventaId}</strong> está
                  actualmente en estado <strong>{venta.estado}</strong> (
                  {getEstadoMessage(venta.estado)}). Seleccione el siguiente
                  estado en el flujo.
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
                    onValueChange={setSelectedEstado}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar siguiente estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {estadosDisponibles.map((estado) => (
                        <SelectItem key={estado} value={estado}>
                          {capitalizeFirst(estado)} - {getEstadoMessage(estado)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={setIsChecked}
                  />
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
              disabled={
                !isChecked ||
                !selectedEstado ||
                isLoading ||
                estadosDisponibles.length === 0
              }>
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
              <strong>{venta.ventaId}</strong> de{" "}
              <strong>{capitalizeFirst(venta.estado)}</strong> a{" "}
              <strong>{capitalizeFirst(selectedEstado)}</strong>?<br />
              <br />
              <span className="text-sm text-gray-600">
                {getEstadoMessage(selectedEstado)}
              </span>
              <br />
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
