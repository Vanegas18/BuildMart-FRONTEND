// ProductGrid.jsx - Corrección para el atributo fill y posibles errores
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

export default function ProductGrid({ products }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

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
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute left-2 top-2 flex flex-col gap-1">
                  {product.isNew && (
                    <Badge className="bg-blue-600 hover:bg-blue-700">
                      Nuevo
                    </Badge>
                  )}
                  {product.discount > 0 && (
                    <Badge className="bg-red-600 hover:bg-red-700">
                      -{product.discount}%
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
                <div className="mb-1 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < product.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>

                <Link
                  href={`/producto/${product._id}`}
                  className="group-hover:text-blue-600">
                  <h3 className="line-clamp-2 font-medium">{product.nombre}</h3>
                </Link>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold">
                      ${product.precio.toLocaleString()}
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
                    className="h-8 w-8 bg-blue-600 p-0 hover:bg-blue-700">
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
      />
    </>
  );
}
