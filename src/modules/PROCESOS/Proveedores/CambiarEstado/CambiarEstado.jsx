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
import { useProveedores } from "@/core/context/Proveedores/ProveedoresContext";
import { toast } from "sonner";

export const CambiarEstado = ({ proveedor, onEstadoCambiado }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("initial");
  const { editarProveedorEstado } = useProveedores();

  const handleCambiarEstado = async () => {
    if (!isChecked) return;
    setStep("confirmation");
  };

  const handleDeactivate = async () => {
    setIsLoading(true);

    try {
      const nuevoEstado = proveedor.estado === "Activo" ? "Inactivo" : "Activo";

      // Asegurarse de pasar los parámetros correctos
      await editarProveedorEstado(proveedor.proveedorId, nuevoEstado);

      toast.success(
        `Proveedor ${
          nuevoEstado === "Activo" ? "activado" : "desactivado"
        } exitosamente`
      );

      // Llamar a onEstadoCambiado una sola vez
      if (onEstadoCambiado) {
        await onEstadoCambiado();
      }

      setOpen(false);
      setStep("initial");
    } catch (error) {
      console.error("No se pudo cambiar el estado", error);
      toast.error(
        "Error al cambiar estado: " + (error.message || "Error desconocido")
      );
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
              proveedor.estado === "Activo"
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
              {proveedor.estado === "Activo"
                ? "¿Desactivar proveedor?"
                : "¿Activar proveedor?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Está a punto de{" "}
              {proveedor.estado === "Activo" ? "desactivar" : "activar"} el
              proveedor <strong>{proveedor.nombre}</strong>. Esta acción{" "}
              {proveedor.estado === "Activo"
                ? "ocultará el proveedor de la lista"
                : "hará visible el proveedor en la lista"}
              .
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirmacionEstado"
                checked={isChecked}
                onCheckedChange={setIsChecked}
              />
              <Label
                htmlFor="confirmacionEstado"
                className="text-sm text-gray-600">
                Entiendo que el proveedor será{" "}
                {proveedor.estado === "Activo" ? "desactivado" : "activado"} y{" "}
                {proveedor.estado === "Activo"
                  ? "no estará disponible en la lista"
                  : "estará disponible en la lista"}
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
              {proveedor.estado === "Activo" ? "desactivar" : "activar"} el
              proveedor <strong>{proveedor.nombre}</strong>?
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
                    proveedor.estado === "Activo" ? "desactivar" : "activar"
                  } proveedor`}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
