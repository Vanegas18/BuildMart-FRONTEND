import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { ShoppingCart, X, AlertCircle, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { useFavoritos } from "@/core/context/Carrito/FavoritosContext";
import { useCart } from "@/core/context/Carrito/CarritoContext";
import { useState, useEffect } from "react";

export const Favoritos = () => {
  const { favoritos, removeFromFavoritos, clearFavoritos, loading } =
    useFavoritos();
  const { addToCart } = useCart();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Loader2 className="animate-spin mr-2" size={40} />
      </div>
    );
  }

  if (favoritos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <AlertCircle className="mb-4 h-16 w-16 text-muted-foreground" />
        <h2 className="mb-2 text-2xl font-semibold">No tienes favoritos</h2>
        <p className="mb-6 text-muted-foreground">
          Navega por nuestro catálogo y agrega productos a tus favoritos
        </p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/catalogo">Ver catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Mis Favoritos ({favoritos.length})
        </h1>
        <Button
          variant="outline"
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={clearFavoritos}>
          Limpiar todos
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {favoritos.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}>
            <Card className="overflow-hidden">
              <CardContent className="flex flex-col p-0 sm:flex-row">
                <div className="relative h-40 w-full sm:h-auto sm:w-40">
                  <img
                    src={product.img || "/placeholder.svg"}
                    alt={product.nombre}
                    className="h-full w-full object-cover"
                  />
                  {product.estado === "En oferta" && (
                    <Badge className="absolute left-2 top-2 bg-red-600 hover:bg-red-700">
                      {product.discount > 0
                        ? `-${product.discount}%`
                        : "Oferta"}
                    </Badge>
                  )}
                  {product.estado === "Agotado" && (
                    <Badge className="absolute left-2 top-2 bg-gray-600 hover:bg-gray-700">
                      Agotado
                    </Badge>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between">
                    <Link
                      href={`/producto/${product._id}`}
                      className="hover:text-blue-600">
                      <h3 className="font-medium">{product.nombre}</h3>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-red-600"
                      onClick={() => removeFromFavoritos(product._id)}>
                      <X className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {product.descripcion}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4">
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
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={product.estado === "Agotado"}
                      onClick={() => addToCart(product)}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Añadir al carrito
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
