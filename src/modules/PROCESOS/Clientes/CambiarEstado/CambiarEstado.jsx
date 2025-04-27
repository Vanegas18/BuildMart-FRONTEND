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
import styles from "../styles/Clients.module.css"; // Asegúrate de tener este archivo de estilos
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { useClientes } from "@/core/context";
import { toast } from "sonner";

export const CambiarEstado = ({ cliente, onEstadoCambiado }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("initial");
  const { cambiarEstadoCliente } = useClientes();

  // Manejo de la solicitud para cambiar el estado
  const handleCambiarEstado = async () => {
    if (!isChecked) return;
    setStep("confirmation");
  };

  // Función para cambiar el estado del cliente
  const handleDeactivate = async () => {
    setIsLoading(true);

    try {
      const nuevoEstado = cliente.estado === "Activo" ? "Inactivo" : "Activo"; // Cambiar estado

      // Llamar a la API para cambiar el estado
      await cambiarEstadoCliente(cliente._id, nuevoEstado); // Usar _id en lugar de clienteId

      // Notificar al usuario
      toast.success(
        `Cliente ${
          nuevoEstado === "Activo" ? "Activado" : "Desactivado"
        } exitosamente`
      );

      // Actualizar el estado en el componente padre
      onEstadoCambiado?.(); // Callback para actualizar el estado en el componente padre

      setOpen(false);
      setStep("initial");
    } catch (error) {
      console.error("No se pudo cambiar el estado", error);
      toast.error(`Error al cambiar estado: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Resetear la confirmación si el diálogo se cierra sin completar
  const resetConfirmation = () => {
    setIsChecked(false);
    setStep("initial");
  };

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
              cliente.estado === "Activo"
                ? styles.inactiveCategoria // Cambiar el nombre si es necesario
                : styles.activeCategoria // Cambiar el nombre si es necesario
            }
          />
        </Button>
      </AlertDialogTrigger>

      {step === "initial" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {cliente.estado === "Activo"
                ? "¡Cambiar el estado del cliente!"
                : "¡Cambiar el estado del cliente!"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <br />
              Está a punto de colocar en estado{" "}
              {cliente.estado === "Activo" ? "Inactivo" : "Activo"} al cliente{" "}
              <strong>{cliente.nombre}</strong>. <br />
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <div className="flex items-center space-x-2">
              <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
              <Label className="text-sm text-gray-600">
                Entiendo que el cliente pasará a estado{" "}
                {cliente.estado === "Activo" ? "Inactivo" : "Activado"} y{" "}
                {cliente.estado === "Activo"
                  ? "no podrá realizar acciones"
                  : "podrá realizar acciones"}
                .
              </Label>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleCambiarEstado}
              disabled={!isChecked || isLoading}>
              {isLoading ? "Procesando..." : "Continuar"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}

      {step === "confirmation" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¡Confirmar cambio de estado!</AlertDialogTitle>
            <AlertDialogDescription>
              <br />
              ¿Está seguro de que desea cambiar el estado de el cliente{" "}
              <strong>{cliente.nombre}</strong>?
              <br />
              <br />
              <span className="text-destructive font-medium">
                {/* Esta acción requiere confirmación adicional. */}
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
              {isLoading
                ? "Procesando..."
                : `Sí, ${
                    cliente.estado === "Activo" ? "Desactivar" : "Activar"
                  } cliente`}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
