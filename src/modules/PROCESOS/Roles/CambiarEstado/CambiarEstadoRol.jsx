import { useRoles } from "@/core/context";
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
import { useState } from "react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { toast } from "sonner";
import { PowerCircleIcon } from "lucide-react";

export const CambiarEstadoRol = ({ onEstadoCambiado, rol }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("initial");
  const { cambiarEstadoRol } = useRoles();

  const handleCambiarEstado = async () => {
    if (!isChecked) return;
    setStep("confirmation");
  };

  const handleDeactivate = async () => {
    setIsLoading(true);

    try {
      const nuevoEstado = rol.estado === "Activo" ? "Inactivo" : "Activo";

      await cambiarEstadoRol(rol.nombre, nuevoEstado);

      toast.success("Estado de Rol actualizado", {
        description: `El rol "${rol.nombre}" ha sido ${
          nuevoEstado === "Activo" ? "activado" : "desactivado"
        }.`,
      });

      onEstadoCambiado?.();
      setOpen(false);
      setStep("initial");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "No se puede cambiar el estado del rol";

      toast.error("Error al cambiar el estado", {
        description: errorMessage,
        duration: 5000,
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
        <Button variant="ghost" size="icon" className={"ml-6 text-red-700"}>
          <PowerCircleIcon className=" h-4 w-4" />
          <span className="font-semibold">
            {rol.estado === "Activo" ? "Inactivar" : "Activar"}
          </span>
        </Button>
      </AlertDialogTrigger>

      {step === "initial" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {rol.estado === "Activo" ? "¿Desactivar rol?" : "¿Activar rol?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Está a punto de{" "}
              {rol.estado === "Activo" ? "desactivar" : "activar"} el rol{" "}
              <strong>{rol.nombre}</strong>. Esta acción{" "}
              {rol.estado === "Activo"
                ? "ocultará el rol de la tienda"
                : "hará visible el rol en la tienda"}
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
                Entiendo que el rol será{" "}
                {rol.estado === "Activo" ? "desactivado" : "activado"} y{" "}
                {rol.estado === "Activo"
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
              {rol.estado === "Activo" ? "desactivar" : "activar"} el rol{" "}
              <strong>{rol.nombre}</strong>?
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
                    rol.estado === "Activo" ? "desactivar" : "activar"
                  } rol`}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
