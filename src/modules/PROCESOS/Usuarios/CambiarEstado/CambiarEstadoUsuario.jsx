import { useUsuarios } from "@/core/context";
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
import styles from "../../Productos/styles/Products.module.css";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";

export const CambiarEstadoUsuario = ({ usuario, onEstadoCambiado }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("initial");
  const { cambiarEstadoUsuarios } = useUsuarios();

  const handleCambiarEstado = async () => {
    if (!isChecked) return;
    setStep("confirmation");
  };

  const handleDeactivate = async () => {
    setIsLoading(true);

    try {
      const nuevoEstado = usuario.estado === "Activo" ? "Inactivo" : "Activo";

      await cambiarEstadoUsuarios(usuario.usuarioId, nuevoEstado);

      // Notificar al usuario
      toast.success(
        `Usuario ${
          nuevoEstado === "Activo" ? "activado" : "desactivado"
        } exitosamente`
      );

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
              usuario.estado === "Activo"
                ? styles.inactiveCategoria
                : styles.activeCategoria
            }
          />
        </Button>
      </AlertDialogTrigger>

      {step === "initial" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {usuario.estado === "Activo"
                ? "¿Desactivar usuario?"
                : "¿Activar usuario?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Está a punto de{" "}
              {usuario.estado === "Activo" ? "desactivar" : "activar"} el
              usuario <strong>{usuario.nombre}</strong>. Esta acción{" "}
              {usuario.estado === "Activo"
                ? "ocultará el usuario de la tienda"
                : "hará visible el usuario en la tienda"}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <div className="flex items-center space-x-2">
              <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
              <Label className="text-sm text-gray-600">
                Entiendo que el usuario será{" "}
                {usuario.estado === "Activo" ? "desactivado" : "activado"} y{" "}
                {usuario.estado === "Activo"
                  ? "no estará disponible para las transacciones y el inicio de sesión"
                  : "estará disponible para las transacciones y el inicio de sesión "}
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
            <AlertDialogTitle>Confirmar cambio de estado</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de que desea{" "}
              {usuario.estado === "Activo" ? "desactivar" : "activar"} el
              usuario <strong>{usuario.nombre}</strong>?
              <br />
              <br />
              <span className="text-destructive font-medium">
                Esta acción requiere confirmación adicional.
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
                    usuario.estado === "Activo" ? "desactivar" : "activar"
                  } usuario`}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
