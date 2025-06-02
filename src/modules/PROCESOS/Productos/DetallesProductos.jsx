import { Button } from "@/shared/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Badge } from "@/shared/components/ui/badge";
import {
  InfoIcon,
  CheckCircle2,
  XCircle,
  Package,
  DollarSign,
  Tag,
  AlertTriangle,
  Ban,
  TagIcon,
  Eye,
  FileText,
  Boxes,
  Image as ImageIcon,
  Layers,
} from "lucide-react";
import React from "react";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { useEditarProducto } from "./EditarProducto/useEditarProducto";

export const DetallesProductos = ({ producto }) => {
  if (!producto) return null;

  // Función para renderizar categorías
  const renderCategorias = (categorias) => {
    if (!categorias || (Array.isArray(categorias) && categorias.length === 0)) {
      return "Sin categoría";
    }

    if (Array.isArray(categorias)) {
      return (
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {categorias.map((cat, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-blue-50 text-blue-800 border-blue-200 text-xs sm:text-sm">
              {typeof cat === "object"
                ? cat.nombre || "Categoría sin nombre"
                : cat}
            </Badge>
          ))}
        </div>
      );
    }

    if (typeof categorias === "object") {
      return categorias.nombre || "Categoría sin nombre";
    }

    return categorias;
  };

  // Función para renderizar el estado con ícono
  const renderEstado = (estado) => {
    let badgeClass = "";
    let Icon = null;

    switch (estado) {
      case "Activo":
        badgeClass = "bg-green-100 text-green-800 border-green-200";
        Icon = CheckCircle2;
        break;
      case "Descontinuado":
        badgeClass = "bg-red-100 text-red-800 border-red-200";
        Icon = Ban;
        break;
      case "Agotado":
        badgeClass = "bg-gray-100 text-gray-800 border-gray-200";
        Icon = XCircle;
        break;
      case "En oferta":
        badgeClass = "bg-amber-100 text-amber-800 border-amber-200";
        Icon = TagIcon;
        break;
      default:
        badgeClass = "bg-blue-100 text-blue-800 border-blue-200";
        Icon = Eye;
    }

    return (
      <Badge variant="outline" className={`${badgeClass} text-xs sm:text-sm`}>
        <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        {estado}
      </Badge>
    );
  };

  // Función para obtener la URL de la imagen
  const getImageUrl = (img, imgType) => {
    if (!img) return null;

    if (imgType === "file") {
      if (img.includes("cloudinary.com")) {
        return img;
      }
      return `https://buildmart-back-billowing-feather-8375.fly.dev${img}`;
    }
    return img;
  };

  // Renderizar stock con alerta
  const renderStock = (stock) => {
    const isLowStock = stock < 10;
    return (
      <div
        className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 ${
          isLowStock ? "text-amber-600" : "text-gray-900"
        }`}>
        <span className="font-medium text-sm sm:text-base">
          {stock} unidades
        </span>
        {isLowStock && (
          <div className="flex items-center gap-1 text-amber-600">
            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Stock bajo</span>
          </div>
        )}
      </div>
    );
  };

  // Manejar categorías para compatibilidad
  const categoriasToRender = producto.categorias || producto.categoriaId;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 hover:shadow-sm">
          <InfoIcon className="w-4 h-4 mr-1 transition-transform duration-200 group-hover:scale-110" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[900px] max-h-[90vh] overflow-y-auto bg-white mx-auto">
        <DialogHeader className="border-b border-gray-100 pb-3 sm:pb-4">
          <DialogTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl text-gray-900">
            <div className="p-1.5 sm:p-2 bg-blue-50 rounded-full">
              <Package className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-base sm:text-xl">Detalles del Producto</span>
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            Información completa del producto seleccionado.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 sm:space-y-8 py-4 sm:py-6">
          {/* Información General */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-1 h-5 sm:h-6 bg-gray-600 rounded-full"></div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Información General
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="group">
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                  Nombre del Producto
                </label>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    <Package className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-900 font-medium text-sm sm:text-base break-words">
                    {producto.nombre || "No especificado"}
                  </span>
                </div>
              </div>

              <div className="group">
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                  Estado
                </label>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  {renderEstado(producto.estado)}
                </div>
              </div>
            </div>

            <div className="group">
              <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                Descripción
              </label>
              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm mt-1 flex-shrink-0">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <span className="text-gray-900 leading-relaxed text-sm sm:text-base break-words">
                  {producto.descripcion || "Sin descripción"}
                </span>
              </div>
            </div>
          </div>

          {/* Información de Precios */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-1 h-5 sm:h-6 bg-gray-600 rounded-full"></div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Información de Precios
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="group">
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                  Precio de Compra
                </label>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  </div>
                  <span className="text-gray-900 font-medium text-sm sm:text-lg break-all">
                    ${FormateoPrecio(producto.precioCompra)}
                  </span>
                </div>
              </div>

              <div className="group">
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                  Precio de Venta
                </label>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-900 font-medium text-sm sm:text-lg break-all">
                    ${FormateoPrecio(producto.precio)}
                  </span>
                </div>
              </div>

              <div className="group sm:col-span-2 lg:col-span-1">
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                  Precio de Oferta
                </label>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                  </div>
                  <span className="text-gray-900 font-medium text-sm sm:text-lg break-all">
                    ${FormateoPrecio(producto.oferta.precioOferta)}
                  </span>
                </div>
              </div>
            </div>

            {/* Margen de ganancia */}
            <div className="group">
              <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                Margen de Ganancia
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100 hover:border-green-200 transition-all duration-200">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    <TagIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  </div>
                  <span className="text-gray-900 font-medium text-sm sm:text-base">
                    $
                    {FormateoPrecio(
                      (producto.oferta?.activa && producto.oferta?.precioOferta
                        ? producto.oferta.precioOferta
                        : producto.precio) - producto.precioCompra
                    )}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="bg-white border-green-200 text-green-700 text-xs sm:text-sm w-fit">
                  {(
                    (((producto.oferta?.activa && producto.oferta?.precioOferta
                      ? producto.oferta.precioOferta
                      : producto.precio) -
                      producto.precioCompra) /
                      producto.precioCompra) *
                      100 || 0
                  ).toFixed(1)}
                  % ganancia
                </Badge>
              </div>
            </div>
          </div>

          {/* Información de Inventario */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-1 h-5 sm:h-6 bg-gray-600 rounded-full"></div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Información de Inventario
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="group">
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                  Stock Disponible
                </label>
                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0 mt-1 sm:mt-0">
                    <Boxes className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">{renderStock(producto.stock)}</div>
                </div>
              </div>

              <div className="group">
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                  Categorías
                </label>
                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0 mt-1 sm:mt-0">
                    <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {renderCategorias(categoriasToRender)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen del Producto */}
          {producto.img && (
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-1 h-5 sm:h-6 bg-gray-600 rounded-full"></div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Imagen del Producto
                </h3>
              </div>

              <div className="group">
                <div className="flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm">
                    <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div className="w-full max-w-xs sm:max-w-md">
                    <img
                      src={getImageUrl(producto.img, producto.imgType)}
                      alt={producto.nombre}
                      className="w-full h-auto max-h-60 sm:max-h-80 object-contain rounded-lg shadow-md border border-gray-200"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="hidden w-full h-32 sm:h-40 bg-gray-200 items-center justify-center text-gray-400 rounded-lg border border-gray-200">
                      <div className="text-center">
                        <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
                        <span className="text-xs sm:text-sm">
                          Error al cargar imagen
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="border-t border-gray-100 pt-3 sm:pt-4">
          <Button
            variant="outline"
            className="hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 px-4 sm:px-6 w-full sm:w-auto text-sm sm:text-base"
            onClick={() =>
              document.querySelector('[data-state="open"]')?.click()
            }>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
