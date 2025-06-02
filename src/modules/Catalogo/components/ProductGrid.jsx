import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye, Clock, Zap } from "lucide-react";
import { Link } from "react-router-dom";
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
import { useFavoritos } from "@/core/context/Carrito/FavoritosContext";

export default function ProductGrid({ products }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { addToCart } = useCart();
  const { toggleFavorito, isFavorito } = useFavoritos();

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

  // Función para manejar la adición de un producto al carrito
  const handleAddToCart = (product, event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
  };

  // Función para manejar la adición/eliminación de un producto a favoritos
  const handleToggleFavorito = (product, event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorito(product);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const ofertaActiva = isOfertaActiva(product);
          const precioConDescuento = getPrecioConDescuento(product);
          const tieneDescuento = ofertaActiva && product.oferta?.descuento > 0;

          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              className="group h-full">
              <Card className="flex h-full flex-col overflow-hidden border-2 border-transparent transition-all hover:border-blue-600 hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  {/* Product image */}
                  <img
                    src={product.img || "/placeholder.svg"}
                    alt={product.nombre}
                    className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                      product.estado === "Agotado" ? "opacity-50" : ""
                    }`}
                  />

                  {/* Badges */}
                  <div className="absolute left-2 top-2 flex flex-col gap-1">
                    {ofertaActiva && tieneDescuento && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-md">
                        <Zap className="w-3 h-3 mr-1" />-
                        {product.oferta.descuento}%
                      </Badge>
                    )}
                    {product.isNew && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md">
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
                            className={`h-8 w-8 rounded-full shadow-md backdrop-blur-sm ${
                              isFavorito(product._id)
                                ? "bg-red-100 text-red-600 border-red-200"
                                : "bg-white/90 hover:bg-white"
                            }`}
                            onClick={(e) => handleToggleFavorito(product, e)}>
                            <Heart
                              className={`h-4 w-4 ${
                                isFavorito(product._id) ? "fill-current" : ""
                              }`}
                            />
                            <span className="sr-only">
                              {isFavorito(product._id)
                                ? "Eliminar de favoritos"
                                : "Añadir a favoritos"}
                            </span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>
                            {isFavorito(product._id)
                              ? "Eliminar de favoritos"
                              : "Añadir a favoritos"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 rounded-full shadow-md bg-white/90 hover:bg-white backdrop-blur-sm"
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

                  {/* Timer para ofertas con fecha límite */}
                  {ofertaActiva && product.oferta?.fechaFin && (
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-black/70 text-white backdrop-blur-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        Tiempo limitado
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="flex flex-1 flex-col justify-between p-4">
                  <div className="flex-1">
                    <Link
                      href={`/producto/${product._id}`}
                      className="group-hover:text-blue-600 transition-colors">
                      <h3 className="line-clamp-2 font-medium text-gray-900 min-h-[2.5rem] leading-5">
                        {product.nombre}
                      </h3>
                    </Link>

                    {/* Categorías */}
                    {product.categorias && product.categorias.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 truncate">
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
                  </div>

                  <div className="mt-4 space-y-3">
                    {/* Precios */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                          <span
                            className={`font-bold ${
                              tieneDescuento
                                ? "text-lg text-red-600"
                                : "text-lg text-gray-900"
                            }`}>
                            ${FormateoPrecio(precioConDescuento)}
                          </span>
                          {tieneDescuento && (
                            <span className="text-sm text-gray-500 line-through">
                              ${FormateoPrecio(product.precio)}
                            </span>
                          )}
                        </div>
                        {tieneDescuento && (
                          <span className="text-xs text-green-600 font-medium">
                            Ahorras $
                            {FormateoPrecio(
                              product.precio - precioConDescuento
                            )}
                          </span>
                        )}
                      </div>

                      <Button
                        size="sm"
                        className={`h-9 w-9 p-0 transition-all duration-200 ${
                          product.estado === "Agotado"
                            ? "bg-gray-400 cursor-not-allowed"
                            : ofertaActiva
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        disabled={product.estado === "Agotado"}
                        onClick={(e) => handleAddToCart(product, e)}>
                        <ShoppingCart className="h-4 w-4" />
                        <span className="sr-only">Añadir al carrito</span>
                      </Button>
                    </div>

                    {/* Stock indicator */}
                    {product.stock <= 10 && product.stock > 0 && (
                      <div className="flex items-center justify-center">
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                          Solo quedan {product.stock} unidades
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
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
