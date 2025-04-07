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
import styles from "../styles/CatProveedores.module.css";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { useCatProveedores } from "@/core/context/CatProveedores/CatProveedoresContext";
import { toast } from "sonner";

export const CambiarEstado = ({ categoria, onEstadoCambiado }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("initial");
  const { cambiarEstadoCategoria } = useCatProveedores();

  const handleCambiarEstado = async () => {
    if (!isChecked) return;
    setStep("confirmation");
  };

  const handleDeactivate = async () => {
    setIsLoading(true);

    try {
      const nuevoEstado =
        categoria.estado === "Activo" ? "Inactivo" : "Activo";

      // Cambiar estado pasando el objeto completo
      await cambiarEstadoCategoria(categoria.categoriaProveedorId, nuevoEstado);

      // Notificar al usuario o actualizar UI
      toast.success(
        `Categoría ${
          nuevoEstado === "Activo" ? "activada" : "desactivada"
        } exitosamente`
      );

      onEstadoCambiado?.();

      setOpen(false);
      setStep("initial");
    } catch (error) {
      console.error("No se pudo cambiar el estado", error.response?.data?.error);
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
          <Power className={styles.deleteButton} />
        </Button>
      </AlertDialogTrigger>

      {step === "initial" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {categoria.estado === "Activo"
                ? "¿Desactivar categoría?"
                : "¿Activar categoría?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Está a punto de{" "}
              {categoria.estado === "Activo" ? "desactivar" : "activar"} la
              categoría <strong>{categoria.nombre}</strong>. Esta acción{" "}
              {categoria.estado === "Activo"
                ? "ocultará la categoría de la lista"
                : "hará visible la categoría en la lista"}
              .
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <div className="flex items-center space-x-2">
              <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
              <Label className="text-sm text-gray-600">
                Entiendo que la categoría será{" "}
                {categoria.estado === "Activo" ? "desactivada" : "activada"} y{" "}
                {categoria.estado === "Activo"
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
              {categoria.estado === "Activo" ? "desactivar" : "activar"} la
              categoría <strong>{categoria.nombre}</strong>?
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
                    categoria.estado === "Activo" ? "desactivar" : "activar"
                  } categoría`}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
