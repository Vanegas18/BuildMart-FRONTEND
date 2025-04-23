import { useAuth, usePedidos } from "@/core/context";
import { useCart } from "@/core/context/Carrito/CarritoContext";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Button } from "@/shared/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Separator } from "@/shared/components/ui/separator";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const ConfirmarPedido = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPedidoConfirmado, setIsPedidoConfirmado] = useState(false);

  // Contextos
  const { cartItems, getSubtotal, getItemCount, clearCart, setIsCartOpen } =
    useCart();
  const { crearPedido } = usePedidos();
  const { user } = useAuth();

  // Cálculos
  const subtotal = getSubtotal();
  const tax = subtotal * 0.08; // 8% de impuesto
  const total = subtotal + tax;
  const itemCount = getItemCount();

  // Transformar productos del carrito al formato de pedido
  const transformarProductosParaPedido = () => {
    return cartItems.map((item) => ({
      productoId: item._id,
      cantidad: item.quantity,
    }));
  };

  // Confirmar y crear el pedido
  const handleConfirmarPedido = async () => {
    if (!user || (!user._id && !user.id)) {
      toast.error(
        "No se pudo identificar al cliente. Por favor, inicia sesión nuevamente"
      );
      return;
    }

    try {
      setIsLoading(true);

      // Crear estructura de pedido
      const nuevoPedido = {
        clienteId: user._id || user.id, // Usar ID del usuario autenticado como cliente
        productos: transformarProductosParaPedido(),
      };

      // Enviar pedido a la API
      await crearPedido(nuevoPedido);

      // Mostrar confirmación y limpiar carrito
      setIsPedidoConfirmado(true);
      clearCart();

      toast.success("¡Pedido creado exitosamente!");

      // Después de 2 segundos, cerrar todo
      setTimeout(() => {
        setIsPedidoConfirmado(false);
        setIsDialogOpen(false);
        setIsCartOpen(false);
      }, 2000);
    } catch (error) {
      toast.error("Error al crear el pedido", {
        description: error.message || "Inténtalo nuevamente",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700"
        onClick={() => setIsDialogOpen(true)}>
        Confirmar Pedido
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {!isPedidoConfirmado ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5 text-blue-600" />
                  Confirmar Pedido
                </DialogTitle>
                <DialogDescription>
                  Estás a punto de confirmar tu pedido con los siguientes
                  productos:
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <div className="max-h-[300px] overflow-y-auto">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center py-2 border-b">
                      <div className="flex items-center">
                        <div className="font-medium">{item.nombre}</div>
                        <div className="text-sm text-gray-500 ml-2">
                          x{item.quantity}
                        </div>
                      </div>
                      <div className="font-medium">
                        ${FormateoPrecio(item.precio * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Subtotal ({itemCount} productos)
                    </span>
                    <span>${FormateoPrecio(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Impuesto (8%)</span>
                    <span>${FormateoPrecio(tax)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">
                      ${FormateoPrecio(total)}
                    </span>
                  </div>
                </div>
              </div>

              <DialogFooter className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isLoading}>
                  Cancelar
                </Button>
                <Button
                  disabled={isLoading || cartItems.length === 0}
                  onClick={handleConfirmarPedido}
                  className="bg-blue-600 hover:bg-blue-700">
                  {isLoading ? "Procesando..." : "Confirmar y Crear Pedido"}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="py-8 flex flex-col items-center justify-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-center">
                ¡Pedido Confirmado!
              </h3>
              <p className="text-gray-600 text-center mt-2">
                Tu pedido ha sido creado exitosamente.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
