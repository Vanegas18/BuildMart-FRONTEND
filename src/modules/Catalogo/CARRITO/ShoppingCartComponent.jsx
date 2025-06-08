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
import { useState, useEffect } from "react";

export const ShoppingCartComponent = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getSubtotal,
    getItemCount,
  } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Cálculos
  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const tax = subtotal * 0.08;
  const domicilio = 15000;
  const total = subtotal + tax;
  const totalFinal = subtotal + tax + domicilio;

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Botón flotante del carrito */}
      <div className="fixed top-22 right-10 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="relative bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full h-12 w-12 p-0">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-6 w-6 flex items-center justify-center p-0 rounded-full">
              {itemCount > 99 ? "99+" : itemCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Carrito Modal/Drawer */}
      <div
        className={cn(
          "fixed z-50 bg-white shadow-2xl transition-all duration-300 ease-in-out",
          // En mobile: modal centrado, en desktop: drawer desde la derecha
          isMobile
            ? "inset-4 rounded-2xl"
            : "top-0 right-0 h-full w-96 rounded-l-2xl",
          // Animación de entrada
          isOpen
            ? "opacity-100 translate-x-0 scale-100"
            : isMobile
            ? "opacity-0 scale-95 pointer-events-none"
            : "opacity-0 translate-x-full pointer-events-none"
        )}>
        <Card className="h-full border-0 rounded-2xl overflow-hidden">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <span>Tu carrito</span>
                <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                  {itemCount}
                </Badge>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="rounded-full hover:bg-white/80">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          {/* Contenido */}
          {cartItems.length > 0 ? (
            <>
              {/* Items del carrito */}
              <CardContent className="p-0 flex-1">
                <ScrollArea
                  className={cn(
                    "p-4",
                    isMobile ? "h-[calc(100vh-320px)]" : "h-[calc(100vh-280px)]"
                  )}>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-sm">
                        <div className="flex gap-4">
                          {/* Imagen */}
                          <div className="flex-shrink-0">
                            <img
                              src={item.img || "/placeholder.svg"}
                              alt={item.nombre}
                              className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                            />
                          </div>

                          {/* Info del producto */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-sm text-gray-900 line-clamp-2">
                                {item.nombre}
                              </h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full flex-shrink-0 ml-2"
                                onClick={() => removeFromCart(item._id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Precio */}
                            <div className="text-blue-600 font-semibold text-lg mb-3">
                              $
                              {FormateoPrecio(
                                item.oferta?.activa
                                  ? item.oferta.precioOferta
                                  : item.precio
                              )}
                            </div>

                            {/* Controles de cantidad */}
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                Cantidad:
                              </span>
                              <div className="flex items-center bg-white rounded-lg border border-gray-200">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-l-lg hover:bg-gray-50"
                                  onClick={() =>
                                    updateQuantity(item._id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}>
                                  <Minus className="h-4 w-4" />
                                </Button>

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
                                  className="w-12 text-center border-0 focus:ring-0 font-medium"
                                  min={1}
                                  max={item.stock}
                                />

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-r-lg hover:bg-gray-50"
                                  onClick={() => {
                                    if (item.quantity + 1 > item.stock) {
                                      toast.error(
                                        `Stock insuficiente. Solo quedan ${item.stock} unidades disponibles.`
                                      );
                                      return;
                                    }
                                    updateQuantity(item._id, item.quantity + 1);
                                  }}>
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Footer con totales */}
              <div className="border-t border-gray-200 bg-white">
                <CardFooter className="flex flex-col gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100">
                  {/* Sección del total */}
                  <div className="w-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-700">
                        Total
                      </span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-blue-600 tracking-tight">
                          ${FormateoPrecio(subtotal)}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          Incluye todos los productos
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sección del botón */}
                  <div className="w-full">
                    <ConfirmarPedido />
                  </div>
                </CardFooter>
              </div>
            </>
          ) : (
            /* Carrito vacío */
            <CardContent className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="bg-gray-100 rounded-full p-6 mb-6">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="font-semibold text-xl mb-3 text-gray-700">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-500 mb-6 max-w-xs">
                Explora nuestros productos y encuentra algo que te guste.
              </p>
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white">
                Continuar comprando
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};
