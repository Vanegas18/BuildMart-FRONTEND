import { useCart } from "@/core/context/Carrito/CarritoContext";
import { cn } from "@/core/lib/utils";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Button } from "@/shared/components";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Separator } from "@/shared/components/ui/separator";
import { Minus, Plus, ShoppingBag, ShoppingCart, X } from "lucide-react";
import { ConfirmarPedido } from "../CHECKOUT/ConfirmarPedido";
import { toast } from "sonner";

export const ShoppingCartComponent = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    getSubtotal,
    getItemCount,
  } = useCart();

  // Cálculos
  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const tax = subtotal * 0.08; // 8% de impuesto
  const total = subtotal + tax;

  return (
    <div className={cn("relative")}>
      {/* Cart Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="relative bg-white border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
        onClick={() => setIsCartOpen(!isCartOpen)}
        aria-label={`Carrito de compras con ${itemCount} items`}>
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge
            className="absolute -top-3 -right-2 bg-blue-400 hover:bg-blue-600"
            aria-hidden="true">
            {itemCount}
          </Badge>
        )}
      </Button>

      {/* Cart Panel */}
      {isCartOpen && (
        <Card className="absolute right-0 z-50 mt-2 w-80 md:w-96 shadow-lg">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <span>Tu carrito</span>
                <Badge
                  variant="outline"
                  className="ml-2 bg-blue-600 text-white hover:bg-blue-700">
                  {itemCount}
                </Badge>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-gray-700"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {cartItems.length > 0 ? (
            <>
              <CardContent className="p-0">
                <ScrollArea className="h-[320px] p-4">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item._id} className="flex gap-3">
                        <div className="flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                          <img
                            src={item.img || "/placeholder.svg"}
                            alt={item.nombre}
                            className="h-20 w-20 object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-sm">
                              {item.nombre}
                            </h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-gray-400 hover:text-red-500 -mt-1 -mr-1"
                              onClick={() => removeFromCart(item._id)}
                              aria-label={`Remove ${item.nombre} from cart`}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <span className="text-blue-600 font-medium">
                            ${FormateoPrecio(item.precio)}
                          </span>
                          <div className="flex items-center mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-full border border-gray-200 flex items-center justify-center"
                              onClick={() =>
                                updateQuantity(item._id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity">
                              <Minus className="h-3 w-3" />
                            </Button>

                            <div className="mx-2 w-12">
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                  const newQuantity =
                                    parseInt(e.target.value) || 1;
                                  if (newQuantity > item.stock) {
                                    toast.error(
                                      `Stock insuficiente. Solo quedan ${item.stock} unidades disponibles.`
                                    );
                                    return;
                                  }
                                  updateQuantity(item._id, newQuantity);
                                }}
                                className="w-full text-center border border-gray-200 rounded-md p-1 h-7"
                                min={1}
                                max={item.stock}
                                aria-label={`Cantidad de ${item.nombre}`}
                              />
                            </div>

                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-full border border-gray-200 flex items-center justify-center"
                              onClick={() => {
                                if (item.quantity + 1 > item.stock) {
                                  toast.error(
                                    `Stock insuficiente. Solo quedan ${item.stock} unidades disponibles.`
                                  );
                                  return;
                                }
                                updateQuantity(item._id, item.quantity + 1);
                              }}
                              aria-label="Increase quantity">
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <Separator />
              <CardFooter className="flex-col p-4 gap-4">
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${FormateoPrecio(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span>${FormateoPrecio(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${FormateoPrecio(total)}</span>
                  </div>
                </div>
                <ConfirmarPedido />
              </CardFooter>
            </>
          ) : (
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">
              <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="font-medium text-lg mb-1">
                Tu carrito esta vació
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Parece que aún no has añadido nada a tu carrito.
              </p>
              <Button
                variant="outline"
                className="border-blue-500 text-blue-600 hover:bg-blue-50"
                onClick={() => setIsCartOpen(false)}>
                Continuar comprando
              </Button>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
};
