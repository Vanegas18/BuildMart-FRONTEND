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
import { AlertTriangle, Power, PowerCircleIcon } from "lucide-react";
import { useState } from "react";
import styles from "../styles/Products.module.css";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { useProductos } from "@/core/context";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export const CambiarEstado = ({ producto, onEstadoCambiado }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("initial");
  const [nuevoEstado, setNuevoEstado] = useState(null);
  const { cambiarEstadoProducto } = useProductos();

  const handleCambiarEstado = async () => {
    if (!isChecked) return;
    setStep("confirmation");
  };

  // Función para mostrar mensaje de confirmación basado en el estado
  const getMensajeConfirmacion = () => {
    if (!nuevoEstado) return "";

    switch (nuevoEstado) {
      case "Activo":
        return "Este producto estará disponible para compra en la tienda.";
      case "Descontinuado":
        return "Este producto será retirado permanentemente de la tienda y no se repondrá stock.";
      case "Agotado":
        return "Este producto no estará disponible para compra hasta que se reponga stock.";
      case "En oferta":
        return "Este producto se mostrará con un distintivo de oferta en la tienda.";
      default:
        return "";
    }
  };

  // Verifica si podemos ejecutar la acción de descontinuar
  const puedeDescontinuar = () => {
    return !(nuevoEstado === "Descontinuado" && producto.stock > 0);
  };

  const handleDeactivate = async () => {
    if (!nuevoEstado) {
      toast.error("Debe seleccionar un estado");
      return;
    }

    setIsLoading(true);

    try {
      await cambiarEstadoProducto(producto.productoId, { nuevoEstado });

      // Notificar al usuario
      toast.success("Estado actualizado", {
        description: `El producto "${producto.nombre}" ahora está ${nuevoEstado}.`,
      });

      onEstadoCambiado?.();

      setOpen(false);
      setStep("initial");
    } catch (error) {
      console.error("No se pudo cambiar el estado", error);
      toast.error("No se pudo cambiar el estado", {
        description:
          error.response?.data?.error ||
          "No se pudo cambiar el estado. Intente nuevamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetConfirmation = () => {
    setIsChecked(false);
    setStep("initial");
    setNuevoEstado(null);
  };

  // Determinar si el estado actual es compatible con los nuevos estados
  const estadoActual =
    producto.estado === "Disponible"
      ? "Activo"
      : producto.estado === "No disponible"
      ? "Descontinuado"
      : producto.estado;

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
              estadoActual === "Activo" || estadoActual === "En oferta"
                ? styles.activeCategoria
                : styles.inactiveCategoria
            }
          />
        </Button>
      </AlertDialogTrigger>

      {step === "initial" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cambiar estado del producto</AlertDialogTitle>
            <AlertDialogDescription>
              El producto <strong>{producto.nombre}</strong> actualmente está en
              estado <strong>{estadoActual}</strong>. Seleccione el nuevo estado
              para este producto.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="estado">Nuevo estado</Label>
              <Select onValueChange={setNuevoEstado}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Descontinuado">Descontinuado</SelectItem>
                  <SelectItem value="Agotado">Agotado</SelectItem>
                  <SelectItem value="En oferta">En oferta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {nuevoEstado === "Descontinuado" && producto.stock > 0 && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-md flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Advertencia</p>
                  <p className="text-sm">
                    No es posible descontinuar un producto con stock disponible
                    ({producto.stock} unidades). Primero debe agotar el
                    inventario o cambiar a estado "Agotado".
                  </p>
                </div>
              </div>
            )}

            {nuevoEstado && (
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="confirmar-cambio"
                  checked={isChecked}
                  onCheckedChange={setIsChecked}
                  disabled={!puedeDescontinuar()}
                />
                <Label
                  htmlFor="confirmar-cambio"
                  className="text-sm text-gray-600">
                  Entiendo que el producto cambiará a estado "{nuevoEstado}" y{" "}
                  {getMensajeConfirmacion()}
                </Label>
              </div>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleCambiarEstado}
              disabled={
                !isChecked || isLoading || !nuevoEstado || !puedeDescontinuar()
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
              ¿Está seguro de que desea cambiar el producto{" "}
              <strong>{producto.nombre}</strong> a estado{" "}
              <strong>{nuevoEstado}</strong>?
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
              {isLoading ? "Procesando..." : `Sí, cambiar a ${nuevoEstado}`}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
