import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye, Check } from "lucide-react";
import { Button } from "@/shared/components";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Link } from "react-router";
import ProductQuickView from "./ProductQuickView";

function ProductList({ products }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <>
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group">
            <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-blue-600">
              <CardContent className="flex flex-col gap-4 p-0 sm:flex-row">
                <div className="relative h-48 w-full overflow-hidden bg-gray-100 sm:h-auto sm:w-48 md:w-64">
                  {/* Product image */}
                  <img
                    src={product.img || "/placeholder.svg"}
                    alt={product.nombre}
                    className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
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
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <Link
                    href={`/producto/${product._id}`}
                    className="group-hover:text-blue-600">
                    <h3 className="text-lg font-medium">{product.nombre}</h3>
                  </Link>

                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {product.descripcion}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold">
                        ${product.precio.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-9 w-9"
                              onClick={() => setQuickViewProduct(product)}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Vista rápida</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Vista rápida</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-9 w-9">
                              <Heart className="h-4 w-4" />
                              <span className="sr-only">
                                Añadir a favoritos
                              </span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Añadir a favoritos</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={product.estado === "Agotado"}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Añadir al carrito
                      </Button>
                    </div>
                  </div>
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

export default ProductList;
