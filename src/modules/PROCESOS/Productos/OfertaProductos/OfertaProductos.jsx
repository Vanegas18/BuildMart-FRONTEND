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
import { TagIcon, AlertCircle, Zap } from "lucide-react";
import React from "react";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { useEditarProducto } from "../EditarProducto/useEditarProducto";
import { InfoProducto } from "./InfoProducto";
import { OfertasEspeciales } from "./OfertasEspeciales";
import { FormularioOferta } from "./FormularioOferta";
import { InfoAhorro } from "./InfoAhorro";

export const OfertaProductos = ({ producto, onProductoEditado }) => {
  const {
    mostrarOferta,
    tipoOferta,
    handleOfertaToggle,
    handleDescuentoChange,
    form,
    loading,
    onSubmit,
    errors,
  } = useEditarProducto(onProductoEditado, producto);

  if (!producto) return null;

  // Verificar si el producto tiene una oferta activa
  const tieneOfertaActiva =
    producto.oferta?.activa &&
    (producto.oferta?.descuento > 0 || producto.oferta?.precioOferta > 0);

  // Calcular si la oferta está vigente por fechas
  const ahora = new Date();
  const fechaInicio = producto.oferta?.fechaInicio
    ? new Date(producto.oferta.fechaInicio)
    : null;
  const fechaFin = producto.oferta?.fechaFin
    ? new Date(producto.oferta.fechaFin)
    : null;

  const ofertaVigentePorFecha =
    !fechaInicio || (ahora >= fechaInicio && (!fechaFin || ahora <= fechaFin));

  const ofertaActualmenteActiva = tieneOfertaActiva && ofertaVigentePorFecha;

  // Componente para mostrar errores de validación
  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return (
      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
        <AlertCircle className="w-4 h-4" />
        <span>{error.message}</span>
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={ofertaActualmenteActiva ? "default" : "ghost"}
          size="sm"
          className={`relative transition-all duration-200 hover:shadow-sm ${
            ofertaActualmenteActiva
              ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md"
              : "hover:bg-orange-50 hover:border-orange-300"
          }`}>
          {ofertaActualmenteActiva && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
          )}
          <TagIcon
            className={`w-4 h-4 mr-1 transition-transform duration-200 group-hover:scale-110 ${
              ofertaActualmenteActiva ? "text-white" : ""
            }`}
          />
          {ofertaActualmenteActiva ? "Oferta Activa" : "Oferta"}
          {ofertaActualmenteActiva && producto.oferta?.descuento > 0 && (
            <Badge
              variant="secondary"
              className="ml-2 bg-white/20 text-white text-xs">
              -{producto.oferta.descuento}%
            </Badge>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="border-b border-gray-100 pb-4">
          <DialogTitle className="flex items-center gap-3 text-xl text-gray-900">
            <div
              className={`p-2 rounded-full ${
                ofertaActualmenteActiva ? "bg-orange-100" : "bg-orange-50"
              }`}>
              <TagIcon
                className={`w-5 h-5 ${
                  ofertaActualmenteActiva
                    ? "text-orange-600"
                    : "text-orange-500"
                }`}
              />
            </div>
            Gestionar Oferta - {producto.nombre}
            {ofertaActualmenteActiva && (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Zap className="w-3 h-3 mr-1" />
                Activa
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            {ofertaActualmenteActiva
              ? "Tu producto tiene una oferta activa. Edítala o desactívala según necesites."
              : "Configura ofertas especiales para este producto y atrae más clientes."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* Información básica del producto con estado de oferta */}
          <InfoProducto producto={producto} />

          {/* Sección de Ofertas Especiales */}
          <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-2xl border border-purple-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <OfertasEspeciales
                  producto={producto}
                  mostrarOferta={mostrarOferta}
                  handleOfertaToggle={handleOfertaToggle}
                />
              </div>

              {/* Información de oferta existente cuando está inactiva */}
              {!mostrarOferta && producto.oferta?.activa && (
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-amber-100 rounded-lg">
                      <TagIcon className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-sm font-medium text-amber-700">
                      Oferta congelada temporalmente
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Descuento:</span>
                      <span className="ml-2 font-medium text-gray-900">
                        {producto.oferta.descuento}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Precio oferta:</span>
                      <span className="ml-2 font-medium text-gray-900">
                        ${FormateoPrecio(producto.oferta.precioOferta)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Formulario de oferta */}
              {mostrarOferta && (
                <div className="space-y-6">
                  <FormularioOferta
                    tipoOferta={tipoOferta}
                    form={form}
                    errors={errors}
                    ErrorMessage={ErrorMessage}
                    handleDescuentoChange={handleDescuentoChange}
                    handleTipoOfertaChange={handleOfertaToggle}
                  />

                  {/* Información del ahorro */}
                  <InfoAhorro form={form} />
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-2">
          <Button
            variant="outline"
            className="hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 px-6"
            onClick={() =>
              document.querySelector('[data-state="open"]')?.click()
            }>
            Cancelar
          </Button>
          <Button
            className=" bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            onClick={onSubmit}
            disabled={loading}>
            {loading ? "Guardando..." : "Guardar Oferta"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
