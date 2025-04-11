// ProductQuickView.jsx - Corrección para el atributo fill y validación de features
"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Link } from "react-router";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";

export default function ProductQuickView({ product, open, onOpenChange }) {
  const [quantity, setQuantity] = useState(1);

  // Increment quantity
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Decrement quantity
  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (!product) return null;

  // Verificar si features existe, si no, asignarle un array vacío
  const features = product.features || [];

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
              <DialogDescription className="text-sm text-muted-foreground">
                {product.brand}
              </DialogDescription>
            </DialogHeader>

            {/* Rating */}
            <div className="mb-2 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < product.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
              <span className="ml-1 text-xs text-muted-foreground">
                ({product.reviews} reseñas)
              </span>
            </div>

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

            {/* Features - solo se muestra si hay features */}
            {features.length > 0 && (
              <div className="mb-4 space-y-1">
                <h4 className="text-sm font-medium">Características:</h4>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <Separator className="my-4" />

            {/* Quantity selector */}
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-medium">Cantidad:</h4>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-r-none"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}>
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
                  onClick={incrementQuantity}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Aumentar cantidad</span>
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" className="flex-1 gap-2">
                <Heart className="h-4 w-4" />
                Añadir a favoritos
              </Button>
              <Button
                className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700"
                disabled={product.estado === "Agotado"}>
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
