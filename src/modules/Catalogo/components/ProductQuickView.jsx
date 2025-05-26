// ProductQuickView.jsx - Versión actualizada con estilos y funcionalidades del ProductGrid
"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Clock,
  Zap,
  X,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { useCart } from "@/core/context/Carrito/CarritoContext";
import { useFavoritos } from "@/core/context/Carrito/FavoritosContext";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";

export default function ProductQuickView({ product, open, onOpenChange }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleFavorito, isFavorito } = useFavoritos();

  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(1);
  }, [product]);

  if (!product) return null;

  // Función para verificar si una oferta está activa
  const isOfertaActiva = (product) => {
    if (!product.oferta?.activa) return false;

    const ahora = new Date();
    const fechaInicio = product.oferta?.fechaInicio
      ? new Date(product.oferta.fechaInicio)
      : null;
    const fechaFin = product.oferta?.fechaFin
      ? new Date(product.oferta.fechaFin)
      : null;

    return (
      !fechaInicio || (ahora >= fechaInicio && (!fechaFin || ahora <= fechaFin))
    );
  };

  // Función para obtener el precio con descuento
  const getPrecioConDescuento = (product) => {
    if (isOfertaActiva(product)) {
      return (
        product.oferta.precioOferta ||
        product.precio * (1 - product.oferta.descuento / 100)
      );
    }
    return product.precio;
  };

  const ofertaActiva = isOfertaActiva(product);
  const precioConDescuento = getPrecioConDescuento(product);
  const tieneDescuento = ofertaActiva && product.oferta?.descuento > 0;

  const handleQuantityChange = (value) => {
    if (value < 1) return;
    if (product.stock && value > product.stock) return;
    setQuantity(value);
  };

  const handleAddToCart = () => {
    // Añadir el producto al carrito con la cantidad seleccionada
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    // Cerrar el diálogo
    onOpenChange(false);

    // Resetear la cantidad
    setQuantity(1);
  };

  const handleToggleFavorito = (event) => {
    event.preventDefault();
    toggleFavorito(product);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 md:p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Product image */}
          <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg">
            <img
              src={product.img || "/placeholder.svg"}
              alt={product.nombre}
              className={`h-full w-full object-cover transition-transform duration-300 hover:scale-105 ${
                product.estado === "Agotado" ? "opacity-50" : ""
              }`}
            />

            {/* Badges */}
            <div className="absolute left-3 top-3 flex flex-col gap-2">
              {ofertaActiva && tieneDescuento && (
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-md">
                  <Zap className="w-3 h-3 mr-1" />-{product.oferta.descuento}%
                </Badge>
              )}
              {product.isNew && (
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md">
                  Nuevo
                </Badge>
              )}
              {product.estado === "Agotado" && (
                <Badge className="bg-gray-600 hover:bg-gray-700">Agotado</Badge>
              )}
            </div>

            {/* Timer para ofertas con fecha límite */}
            {ofertaActiva && product.oferta?.fechaFin && (
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-black/70 text-white backdrop-blur-sm">
                  <Clock className="w-3 h-3 mr-1" />
                  Tiempo limitado
                </Badge>
              </div>
            )}

            {/* Stock indicator overlay */}
            {product.stock <= 10 && product.stock > 0 && (
              <div className="absolute bottom-3 left-3 right-3">
                <Badge
                  variant="outline"
                  className="w-full justify-center bg-amber-50/90 text-amber-700 border-amber-200 text-xs backdrop-blur-sm">
                  Solo quedan {product.stock} unidades
                </Badge>
              </div>
            )}
          </div>

          {/* Product details */}
          <div className="flex flex-col p-6 md:p-0">
            <DialogHeader className="mb-4 text-left">
              <DialogTitle className="text-2xl font-bold text-gray-900 leading-tight">
                {product.nombre}
              </DialogTitle>

              {/* Categorías */}
              {product.categorias && product.categorias.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {Array.isArray(product.categorias)
                      ? product.categorias
                          .map((cat) =>
                            typeof cat === "object" ? cat.nombre : cat
                          )
                          .join(", ")
                      : typeof product.categorias === "object"
                      ? product.categorias.nombre
                      : product.categorias}
                  </p>
                </div>
              )}
            </DialogHeader>

            {/* Price section */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span
                  className={`text-3xl font-bold ${
                    tieneDescuento ? "text-red-600" : "text-gray-900"
                  }`}>
                  ${FormateoPrecio(precioConDescuento)}
                </span>
                {tieneDescuento && (
                  <span className="text-lg text-gray-500 line-through">
                    ${FormateoPrecio(product.precio)}
                  </span>
                )}
              </div>
              {tieneDescuento && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                    Ahorras $
                    {FormateoPrecio(product.precio - precioConDescuento)}
                  </span>
                </div>
              )}
            </div>

            <Separator className="my-4" />

            {/* Description */}
            {product.descripcion && (
              <>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Descripción:
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {product.descripcion}
                  </p>
                </div>
                <Separator className="my-4" />
              </>
            )}

            {/* Stock information */}
            {product.stock !== undefined && (
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Stock disponible:
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      product.stock > 10
                        ? "text-green-600"
                        : product.stock > 0
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}>
                    {product.stock > 0
                      ? `${product.stock} unidades`
                      : "Agotado"}
                  </span>
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div className="mb-6">
              <h4 className="mb-3 text-sm font-semibold text-gray-900">
                Cantidad:
              </h4>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-r-none hover:bg-gray-100"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1 || product.estado === "Agotado"}>
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Disminuir cantidad</span>
                  </Button>
                  <div className="flex h-10 w-16 items-center justify-center border-x bg-white text-center font-medium">
                    {quantity}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-l-none hover:bg-gray-100"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={
                      product.estado === "Agotado" ||
                      (product.stock && quantity >= product.stock)
                    }>
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Aumentar cantidad</span>
                  </Button>
                </div>

                {product.stock && quantity >= product.stock && (
                  <span className="text-xs text-amber-600">
                    Máximo disponible
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                className={`flex-1 gap-2 h-12 font-medium transition-all duration-200 ${
                  isFavorito(product._id)
                    ? "border-red-300 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                    : "hover:bg-gray-50"
                }`}
                onClick={handleToggleFavorito}>
                <Heart
                  className={`h-4 w-4 ${
                    isFavorito(product._id) ? "fill-current" : ""
                  }`}
                />
                {isFavorito(product._id)
                  ? "Eliminar de favoritos"
                  : "Añadir a favoritos"}
              </Button>

              <Button
                className={`flex-1 gap-2 h-12 font-medium transition-all duration-200 ${
                  product.estado === "Agotado"
                    ? "bg-gray-400 cursor-not-allowed"
                    : ofertaActiva
                    ? "bg-blue-600 hover:bg-blue-700 shadow-md"
                    : "bg-blue-600 hover:bg-blue-700 shadow-md"
                }`}
                disabled={product.estado === "Agotado"}
                onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4" />
                {product.estado === "Agotado" ? "Agotado" : "Añadir al carrito"}
              </Button>
            </div>

            {/* Additional info for offers */}
            {ofertaActiva && product.oferta?.fechaFin && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    ¡Oferta por tiempo limitado!
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
