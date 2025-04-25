// ProductQuickView.jsx - Corrección para el atributo fill y validación de features
"use client";

import { useEffect, useState } from "react";
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
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

export default function ProductQuickView({ product, open, onOpenChange }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleFavorito, isFavorito } = useFavoritos();

  if (!product) return null;

  const handleQuantityChange = (value) => {
    if (value < 1) return;
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
      <DialogContent className="max-w-3xl p-0 md:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Product image */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.img || "/placeholder.svg"}
              alt={product.nombre}
              className="h-full w-full object-cover"
            />

            {/* Badges */}
            <div className="absolute left-2 top-2 flex flex-col gap-1">
              {product.estado === "En oferta" && (
                <Badge className="bg-red-600 hover:bg-red-700">
                  {product.discount > 0 ? `-${product.discount}%` : "Oferta"}
                </Badge>
              )}
              {product.estado === "Activo" && (
                <Badge className="bg-blue-600 hover:bg-blue-700">
                  Disponible
                </Badge>
              )}
              {product.estado === "Agotado" && (
                <Badge className="bg-gray-600 hover:bg-gray-700">Agotado</Badge>
              )}
            </div>
          </div>

          {/* Product details */}
          <div className="flex flex-col p-4 md:p-0">
            <DialogHeader className="mb-2 text-left">
              <DialogTitle className="text-xl font-bold">
                {product.nombre}
              </DialogTitle>
            </DialogHeader>

            {/* Price */}
            <div className="mb-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                ${product.precio.toLocaleString()}
              </span>
              {product.discount > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  ${(product.precio * (1 + product.discount / 100)).toFixed(0)}
                </span>
              )}
            </div>

            <Separator className="my-4" />

            {/* Description */}
            <p className="mb-4 text-sm text-muted-foreground">
              {product.descripcion}
            </p>

            <Separator className="my-4" />

            {/* Quantity selector */}
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-medium">Cantidad:</h4>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-r-none"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || product.estado === "Agotado"}>
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Disminuir cantidad</span>
                </Button>
                <div className="flex h-9 w-12 items-center justify-center border-y bg-white text-center">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-l-none"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={product.estado === "Agotado"}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Aumentar cantidad</span>
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                className={`flex-1 gap-2 ${
                  isFavorito(product._id)
                    ? "border-red-300 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700"
                    : ""
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
                className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700"
                disabled={product.estado === "Agotado"}
                onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4" />
                Añadir al carrito
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
