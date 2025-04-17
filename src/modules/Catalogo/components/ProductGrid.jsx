"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/shared/components";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import ProductQuickView from "./ProductQuickView";
import { useCart } from "@/core/context/Carrito/CarritoContext";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";

export default function ProductGrid({ products }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { addToCart } = useCart();

  // Función para manejar la adición de un producto al carrito
  const handleAddToCart = (product, event) => {
    event.preventDefault(); // Prevenir la navegación si está dentro de un Link
    event.stopPropagation(); // Evitar que se abra la vista rápida si es un botón dentro
    addToCart(product);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
            className="group">
            <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-blue-600">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                {/* Product image - Corregido: eliminado el atributo fill */}
                <img
                  src={product.img || "/placeholder.svg"}
                  alt={product.nombre}
                  className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                    product.estado === "Agotado" ? "opacity-50" : ""
                  }`}
                />

                {/* Badges */}
                <div className="absolute left-2 top-2 flex flex-col gap-1">
                  {product.estado === "En oferta" && (
                    <Badge className="bg-red-600 hover:bg-red-700">
                      {product.discount > 0
                        ? `-${product.discount}%`
                        : "Oferta"}
                    </Badge>
                  )}
                  {product.isNew && (
                    <Badge className="bg-blue-600 hover:bg-blue-700">
                      Nuevo
                    </Badge>
                  )}
                  {product.estado === "Agotado" && (
                    <Badge className="bg-gray-600 hover:bg-gray-700">
                      Agotado
                    </Badge>
                  )}
                </div>

                {/* Action buttons */}
                <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 rounded-full shadow-md">
                          <Heart className="h-4 w-4" />
                          <span className="sr-only">Añadir a favoritos</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>Añadir a favoritos</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 rounded-full shadow-md"
                          onClick={() => setQuickViewProduct(product)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Vista rápida</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>Vista rápida</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <CardContent className="p-4">
                <Link
                  href={`/producto/${product._id}`}
                  className="group-hover:text-blue-600">
                  <h3 className="line-clamp-2 font-medium">{product.nombre}</h3>
                </Link>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold">
                      ${FormateoPrecio(product.precio)}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-sm text-muted-foreground line-through">
                        $
                        {(
                          product.precio *
                          (1 + product.discount / 100)
                        ).toFixed(0)}
                      </span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    className="h-8 w-8 bg-blue-600 p-0 hover:bg-blue-700"
                    disabled={product.estado === "Agotado"}
                    onClick={(e) => handleAddToCart(product, e)}>
                    <ShoppingCart className="h-4 w-4" />
                    <span className="sr-only">Añadir al carrito</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick view modal */}
      <ProductQuickView
        product={quickViewProduct}
        open={!!quickViewProduct}
        onOpenChange={(open) => !open && setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}
