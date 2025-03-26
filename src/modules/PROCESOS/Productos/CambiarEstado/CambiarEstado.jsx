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
import styles from "../styles/Products.module.css";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { useProductos } from "@/core/context";
import { toast } from "sonner";

export const CambiarEstado = ({ producto, onEstadoCambiado }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("initial");
  const { cambiarEstadoProducto } = useProductos();

  const handleCambiarEstado = async () => {
    if (!isChecked) return;
    setStep("confirmation");
  };

  const handleDeactivate = async () => {
    setIsLoading(true);

    try {
      const nuevoEstado =
        producto.estado === "Disponible" ? "No disponible" : "Disponible";

      await cambiarEstadoProducto(producto.productoId, nuevoEstado);

      // Notificar al usuario o actualizar UI
      toast.success(
        `Producto ${
          nuevoEstado === "Disponible" ? "activado" : "desactivado"
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
          <Power className={styles.deleteButton} />
        </Button>
      </AlertDialogTrigger>

      {step === "initial" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {producto.estado === "Disponible"
                ? "¿Desactivar producto?"
                : "¿Activar producto?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Está a punto de{" "}
              {producto.estado === "Disponible" ? "desactivar" : "activar"} el
              producto <strong>{producto.nombre}</strong>. Esta acción{" "}
              {producto.estado === "Disponible"
                ? "ocultará el producto de la tienda"
                : "hará visible el producto en la tienda"}
              .
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <div className="flex items-center space-x-2">
              <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
              <Label className="text-sm text-gray-600">
                Entiendo que el producto será{" "}
                {producto.estado === "Disponible" ? "desactivado" : "activado"}{" "}
                y{" "}
                {producto.estado === "Disponible"
                  ? "no estará disponible para la venta"
                  : "estará disponible para la venta"}
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
              {producto.estado === "Disponible" ? "desactivar" : "activar"} el
              producto <strong>{producto.nombre}</strong>?
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
                    producto.estado === "Disponible" ? "desactivar" : "activar"
                  } producto`}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
