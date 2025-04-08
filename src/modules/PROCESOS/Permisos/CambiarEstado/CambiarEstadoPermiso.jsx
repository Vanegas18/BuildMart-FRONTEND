import { usePermisos } from "@/core/context";
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
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { PowerCircleIcon } from "lucide-react";
import { useState } from "react";
import styles from "../../Productos/styles/Products.module.css";
import { toast } from "sonner";

export const CambiarEstadoPermiso = ({ onEstadoCambiado, permiso }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("initial");
  const { cambiarEstadoPermiso } = usePermisos();

  const handleCambiarEstado = async () => {
    if (!isChecked) return;
    setStep("confirmation");
  };

  const handleDeactivate = async () => {
    setIsLoading(true);

    try {
      const nuevoEstado = permiso.estado === "Activo" ? "Inactivo" : "Activo";

      await cambiarEstadoPermiso(permiso.nombreGrupo, nuevoEstado);

      toast.success("Estado actualizado", {
        description: `El permiso "${permiso.nombreGrupo}" ha sido ${
          nuevoEstado === "Activo" ? "activado" : "desactivado"
        }.`,
      });

      onEstadoCambiado?.();
      setOpen(false);
      setStep("initial");
    } catch (error) {
      toast.error("No se pudo cambiar el estado", {
        description:
          error.response?.data?.error ||
          "No se pudo cambiar el estado. Intente nuevamente.",
      });

      console.error("No se pudo cambiar el estado", error);
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
              permiso.estado === "Activo"
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
              {permiso.estado === "Activo"
                ? "¿Desactivar permiso?"
                : "¿Activar permiso?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Está a punto de{" "}
              {permiso.estado === "Activo" ? "desactivar" : "activar"} el
              permiso <strong>{permiso.nombre}</strong>. Esta acción{" "}
              {permiso.estado === "Activo"
                ? "ocultará el permiso de la tienda"
                : "hará visible el permiso en la tienda"}
              .
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={isChecked}
                onCheckedChange={setIsChecked}
                id="confirm-change-estado"
              />
              <Label
                htmlFor="confirm-change-estado"
                className="text-sm text-gray-600">
                Entiendo que el permiso será{" "}
                {permiso.estado === "Activo" ? "desactivado" : "activado"} y{" "}
                {permiso.estado === "Activo"
                  ? "no estará disponible para la asociación"
                  : "estará disponible para la asociación"}
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
              {permiso.estado === "Activo" ? "desactivar" : "activar"} el
              permiso <strong>{permiso.nombre}</strong>?
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
                    permiso.estado === "Activo" ? "desactivar" : "activar"
                  } permiso`}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
