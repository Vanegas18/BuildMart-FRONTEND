import { useCategoriaProductos } from "@/core/context/CategoriasProductos/CategoriasContext";
import { useState } from "react";
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
import { Button } from "@/shared/components";
import { Power, PowerCircleIcon } from "lucide-react";
import styles from "../../Productos/styles/Products.module.css";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { toast } from "sonner";

export const CambiarEstadoCategoria = ({ onEstadoCambiado, categoria }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("initial");
  const { cambiarEstadoCategoria } = useCategoriaProductos();

  const handleCambiarEstado = async () => {
    if (!isChecked) return;
    setStep("confirmation");
  };

  const handleDeactivate = async () => {
    setIsLoading(true);

    try {
      const nuevoEstado = categoria.estado === "Activa" ? "Inactiva" : "Activa";

      await cambiarEstadoCategoria(categoria.categoriaId, nuevoEstado);

      // Éxito en el cambio de estado
      toast.success("Estado de categoría actualizado", {
        description: `La categoría "${categoria.nombre}" ha sido ${
          nuevoEstado === "Activa" ? "activada" : "desactivada"
        }.`,
      });

      onEstadoCambiado?.();
      setOpen(false);
      setStep("initial");
    } catch (error) {
      // Manejo específico del error de productos asociados
      const errorMessage =
        error.response?.data?.error || "No se puede desactivar la categoría";

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
        <Button variant="ghost" size="icon" className={"ml-8 text-red-700"}>
          <PowerCircleIcon className=" h-4 w-4" />
          <span className="font-semibold">
            {categoria.estado === "Activo" ? "Inactivar" : "Activar"}
          </span>
        </Button>
      </AlertDialogTrigger>

      {step === "initial" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {categoria.estado === "Activa"
                ? "¿Desactivar categoría?"
                : "¿Activar categoría?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Está a punto de{" "}
              {categoria.estado === "Activa" ? "desactivar" : "activar"} la
              categoría <strong>{categoria.nombre}</strong>. Esta acción{" "}
              {categoria.estado === "Activa"
                ? "ocultará la categoría de la tienda"
                : "hará visible la categoría en la tienda"}
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
                Entiendo que la categoría será{" "}
                {categoria.estado === "Activa" ? "Inactiva" : "Activa"} y{" "}
                {categoria.estado === "Activa"
                  ? "no estará disponible para la venta"
                  : "estará disponible para la venta"}
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
              {categoria.estado === "Activa" ? "desactivar" : "activar"} la
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
                    categoria.estado === "Activa" ? "desactivar" : "activar"
                  } categoría`}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
