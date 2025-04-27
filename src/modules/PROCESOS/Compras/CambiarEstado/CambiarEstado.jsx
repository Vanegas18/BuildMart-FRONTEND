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
import { Power, CheckCircle, XCircle, AlertTriangle, PowerCircleIcon } from "lucide-react";
import { useState } from "react";
import styles from "../styles/Compras.module.css";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { useCompras } from "@/core/context";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export const CambiarEstado = ({ compra, onEstadoCambiado }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("initial");
  const [selectedEstado, setSelectedEstado] = useState(""); // Valor vacío inicialmente
  const { actualizarEstadoCompra } = useCompras();

  // Paso 1: Seleccionar estado
  const handleCambiarEstado = () => {
    if (!isChecked || !selectedEstado) return;
    setStep("confirmation"); // Avanzar al paso de confirmación
  };

  // Paso 2: Confirmar cambio de estado
  const handleDeactivate = async () => {
    setIsLoading(true);
    try {
      await actualizarEstadoCompra(compra._id, selectedEstado); // Llamar al API
      toast.success(`Compra actualizada a estado: ${selectedEstado}`);
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

  // Filtrar los estados disponibles dependiendo del estado actual de la compra
  let estadosDisponibles = [];

  if (compra.estado === "Cancelado" || compra.estado === "Completado") {
    // Si el estado es Cancelado o Completado, no permitimos cambiar el estado
    estadosDisponibles = [];
  } else if (compra.estado === "Pendiente") {
    // Si el estado es Pendiente, solo mostramos Procesando y Cancelado
    estadosDisponibles = ["Procesando", "Cancelado"];
  } else if (compra.estado === "Procesando") {
    // Si el estado es Procesando, solo mostramos Completado y Cancelado
    estadosDisponibles = ["Completado", "Cancelado"];
  }

  // Función para obtener el mensaje y el icono según el estado
  const getEstadoMessageAndIcon = () => {
    switch (compra.estado) {
      case "Completado":
        return {
          message:
            "Esta compra ya ha sido completada y no se puede modificar su estado.",
          icon: <CheckCircle className="h-5 w-5 text-green-600 mr-2" />,
        };
      case "Cancelado":
        return {
          message:
            "Esta compra ha sido cancelada y no se puede modificar su estado.",
          icon: <XCircle className="h-5 w-5 text-red-600 mr-2" />,
        };
      case "Pendiente":
        return {
          message:
            "Puede cambiar el estado de esta compra pendiente a 'Procesando' o 'Cancelado'.",
          icon: <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />,
        };
      case "Procesando":
        return {
          message:
            "Puede cambiar el estado de esta compra en proceso a 'Completado' o 'Cancelado'.",
          icon: <AlertTriangle className="h-5 w-5 text-blue-600 mr-2" />,
        };
      default:
        return {
          message: "",
          icon: null,
        };
    }
  };

  const { message, icon } = getEstadoMessageAndIcon();

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
              compra.estado === "Cancelado"
                ? styles.inactiveCompra
                : styles.activeCompra
            }
          />
        </Button>
      </AlertDialogTrigger>

      {step === "initial" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cambiar estado de la compra</AlertDialogTitle>
            <br />
            <AlertDialogDescription>
              <div className="mb-4">
                La compra con #<strong>{compra.compraId}</strong> está
                actualmente en estado <strong>{compra.estado}</strong>.
              </div>

              <div className="flex items-center p-3 rounded-md bg-gray-50 border border-gray-200 mb-4">
                {icon}
                <span
                  className={`text-sm ${
                    compra.estado === "Completado"
                      ? "text-green-600"
                      : compra.estado === "Cancelado"
                      ? "text-red-600"
                      : compra.estado === "Pendiente"
                      ? "text-yellow-600"
                      : "text-blue-600"
                  }`}>
                  {message}
                </span>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4 py-4">
            {estadosDisponibles.length > 0 && (
              <>
                <div>
                  <Label htmlFor="estado">Seleccione el nuevo estado</Label>
                  <Select
                    value={selectedEstado}
                    onValueChange={setSelectedEstado}>
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
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={setIsChecked}
                  />
                  <Label className="text-sm text-gray-600">
                    Confirmo que quiero cambiar el estado de esta compra.
                  </Label>
                </div>
              </>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cerrar</AlertDialogCancel>
            {estadosDisponibles.length > 0 && (
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
              ¿Está seguro de que desea cambiar el estado de la compra #{" "}
              <strong>{compra.compraId}</strong> a{" "}
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
