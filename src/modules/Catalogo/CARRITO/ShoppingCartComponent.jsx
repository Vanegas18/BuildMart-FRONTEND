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
import {
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { ConfirmarPedido } from "../CHECKOUT/ConfirmarPedido";
import { toast } from "sonner";
import { useState } from "react";

export const ShoppingCartComponent = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getSubtotal,
    getItemCount,
  } = useCart();

  const [isCollapsed, setIsCollapsed] = useState(false);

  // Cálculos
  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const tax = subtotal * 0.08; // 8% de impuesto
  const domicilio = 15000;
  const total = subtotal + tax + domicilio;

  return (
    <>
      {/* Sidebar del carrito */}
      <div
        className={cn(
          "fixed right-0 top-0 h-screen z-40 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-80 md:w-96"
        )}>
        <Card className="h-full rounded-none shadow-xl border-l border-gray-200">
          {/* Toggle Button */}
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-8 rounded-l-lg rounded-r-none bg-white border-gray-400 shadow-md hover:bg-gray-200"
              onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Header del carrito */}
          <CardHeader
            className={cn(
              "bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200 transition-all duration-300",
              isCollapsed ? "p-2" : "p-4"
            )}>
            {isCollapsed ? (
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs h-5 w-5 flex items-center justify-center p-0">
                      {itemCount > 99 ? "99+" : itemCount}
                    </Badge>
                  )}
                </div>
                <div className="text-xs font-medium text-blue-600 text-center">
                  ${FormateoPrecio(total)}
                </div>
              </div>
            ) : (
              <CardTitle className="text-lg font-medium flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                  <span>Tu carrito</span>
                  <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                    {itemCount}
                  </Badge>
                </div>
              </CardTitle>
            )}
          </CardHeader>

          {!isCollapsed && (
            <>
              {cartItems.length > 0 ? (
                <>
                  <CardContent className="p-0 flex-1">
                    <ScrollArea className="h-[calc(100vh-280px)] p-4">
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div
                            key={item._id}
                            className="flex gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-gray-200 transition-colors">
                            <div className="flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                              <img
                                src={item.img || "/placeholder.svg"}
                                alt={item.nombre}
                                className="h-16 w-16 object-cover"
                              />
                            </div>
                            <div className="flex-1 flex flex-col min-w-0">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium text-sm truncate pr-2">
                                  {item.nombre}
                                </h3>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-gray-400 hover:text-red-500 flex-shrink-0"
                                  onClick={() => removeFromCart(item._id)}
                                  aria-label={`Remove ${item.nombre} from cart`}>
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-blue-600 font-medium text-sm">
                                  $
                                  {FormateoPrecio(
                                    item.oferta?.activa
                                      ? item.oferta.precioOferta
                                      : item.precio
                                  )}
                                </span>
                                <div className="flex items-center">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6 rounded-full border border-gray-200"
                                    onClick={() =>
                                      updateQuantity(
                                        item._id,
                                        item.quantity - 1
                                      )
                                    }
                                    disabled={item.quantity <= 1}
                                    aria-label="Decrease quantity">
                                    <Minus className="h-3 w-3" />
                                  </Button>

                                  <div className="mx-1 w-8">
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
                                      className="w-full text-center border border-gray-200 rounded text-xs h-6"
                                      min={1}
                                      max={item.stock}
                                      aria-label={`Cantidad de ${item.nombre}`}
                                    />
                                  </div>

                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6 rounded-full border border-gray-200"
                                    onClick={() => {
                                      if (item.quantity + 1 > item.stock) {
                                        toast.error(
                                          `Stock insuficiente. Solo quedan ${item.stock} unidades disponibles.`
                                        );
                                        return;
                                      }
                                      updateQuantity(
                                        item._id,
                                        item.quantity + 1
                                      );
                                    }}
                                    aria-label="Increase quantity">
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <Separator />
                  <CardFooter className="flex-col p-4 gap-4 bg-gray-50">
                    <div className="w-full space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">
                          ${FormateoPrecio(subtotal)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">IVA</span>
                        <span className="font-medium">
                          ${FormateoPrecio(tax)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Domicilio</span>
                        <span className="font-medium">
                          ${FormateoPrecio(domicilio)}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-blue-600">
                          ${FormateoPrecio(total)}
                        </span>
                      </div>
                    </div>
                    <ConfirmarPedido />
                  </CardFooter>
                </>
              ) : (
                <CardContent className="flex flex-col items-center justify-center h-[calc(100vh-120px)] text-center p-6">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="font-medium text-lg mb-2 text-gray-700">
                    Tu carrito está vacío
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-xs">
                    Explora nuestros productos y encuentra algo que te guste.
                  </p>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                </CardContent>
              )}
            </>
          )}
        </Card>
      </div>

      {/* Espaciador para el contenido principal */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "mr-16" : "mr-80 md:mr-96"
        )}>
        {/* El contenido principal va aquí */}
      </div>
    </>
  );
};
