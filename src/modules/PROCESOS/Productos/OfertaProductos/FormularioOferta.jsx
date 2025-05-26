
import { Badge } from "@/shared/components/ui/badge";
import {
  TagIcon,
  DollarSign,
  Tag,
  CheckCircle2,
  Calendar,
  FileText,
  Package,
  AlertCircle,
  Zap,
  Percent,
  Clock,
} from "lucide-react";
import React from "react";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { useEditarProducto } from "../EditarProducto/useEditarProducto";

export const FormularioOferta = ({
  tipoOferta,
  form,
  errors,
  ErrorMessage,
  handleDescuentoChange,
  handleTipoOfertaChange,
}) => {
  return (
    <>
      {/* TIPO DE OFERTA */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-white/30">
        <label className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <div className="p-1 bg-blue-100 rounded">
            <Tag className="w-3 h-3 text-blue-600" />
          </div>
          Tipo de oferta
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center group cursor-pointer">
            <div className="relative">
              <input
                type="radio"
                value="descuento"
                checked={tipoOferta === "descuento"}
                onChange={(e) => handleTipoOfertaChange(e.target.value)}
                className="sr-only peer"
              />
              <div className="w-4 h-4 border-2 border-gray-300 rounded-full peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all duration-200 group-hover:border-blue-400"></div>
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-blue-600 scale-0 peer-checked:scale-50 transition-transform duration-200"></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
              Por descuento (%)
            </span>
          </label>
          <label className="flex items-center group cursor-pointer">
            <div className="relative">
              <input
                type="radio"
                value="precio"
                checked={tipoOferta === "precio"}
                onChange={(e) => handleTipoOfertaChange(e.target.value)}
                className="sr-only peer"
              />
              <div className="w-4 h-4 border-2 border-gray-300 rounded-full peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all duration-200 group-hover:border-blue-400"></div>
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-blue-600 scale-0 peer-checked:scale-50 transition-transform duration-200"></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
              Precio fijo
            </span>
          </label>
        </div>
      </div>

      {/* Campos de oferta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campo de descuento */}
        {tipoOferta === "descuento" && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-white/30">
            <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <div className="p-1 bg-orange-100 rounded">
                <Tag className="w-3 h-3 text-orange-600" />
              </div>
              Descuento (%)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="99"
                step="0.01"
                {...form.register("oferta.descuento", {
                  onChange: (e) => {
                    let value = parseFloat(e.target.value) || 0;
                    if (value < 0) value = 0;
                    if (value >= 100) value = 99;
                    if (value !== parseFloat(e.target.value)) {
                      e.target.value = value;
                    }
                    handleDescuentoChange(value);
                  },
                })}
                className={`w-full px-4 py-3 bg-white/80 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-medium ${
                  errors?.oferta?.descuento
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-200"
                }`}
                placeholder="15"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <span className="text-gray-400 font-medium mr-6">%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Máximo 99% de descuento
            </p>
            <ErrorMessage error={errors?.oferta?.descuento} />
          </div>
        )}

        {/* Campo de precio de oferta */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-white/30">
          <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <div className="p-1 bg-green-100 rounded">
              <DollarSign className="w-3 h-3 text-green-600" />
            </div>
            Precio de oferta
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.01"
              {...form.register("oferta.precioOferta")}
              disabled={tipoOferta === "descuento"}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-medium ${
                tipoOferta === "descuento"
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : errors?.oferta?.precioOferta
                  ? "bg-white/80 border-red-300 focus:ring-red-500"
                  : "bg-white/80 border-gray-200"
              }`}
              placeholder="Precio con descuento"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <span className="text-gray-400 font-medium -ml-2">$</span>
            </div>
          </div>
          <ErrorMessage error={errors?.oferta?.precioOferta} />
        </div>
      </div>

      {/* Fechas de oferta */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-white/30">
        <label className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <div className="p-1 bg-purple-100 rounded">
            <Calendar className="w-3 h-3 text-purple-600" />
          </div>
          Período de la oferta (opcional)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-2 block">
              Fecha inicio
            </label>
            <input
              type="datetime-local"
              {...form.register("oferta.fechaInicio")}
              className={`w-full px-3 py-2.5 bg-white/80 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors?.oferta?.fechaInicio
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-200"
              }`}
            />
            <ErrorMessage error={errors?.oferta?.fechaInicio} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-2 block">
              Fecha fin
            </label>
            <input
              type="datetime-local"
              {...form.register("oferta.fechaFin")}
              className={`w-full px-3 py-2.5 bg-white/80 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors?.oferta?.fechaFin
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-200"
              }`}
            />
            <ErrorMessage error={errors?.oferta?.fechaFin} />
          </div>
        </div>
      </div>

      {/* Descripción de la oferta */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-white/30">
        <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <div className="p-1 bg-indigo-100 rounded">
            <FileText className="w-3 h-3 text-indigo-600" />
          </div>
          Descripción de la oferta (opcional)
        </label>
        <textarea
          {...form.register("oferta.descripcionOferta")}
          rows={3}
          className={`w-full px-4 py-3 bg-white/80 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
            errors?.oferta?.descripcionOferta
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-200"
          }`}
          placeholder="Ej: Oferta especial por liquidación de inventario"
          maxLength={200}
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            Describe el motivo o características de la oferta
          </p>
          <span className="text-xs text-gray-400">
            {form.watch("oferta.descripcionOferta")?.length || 0}
            /200
          </span>
        </div>
        <ErrorMessage error={errors?.oferta?.descripcionOferta} />
      </div>

      {/* Mensaje de error general del schema */}
      {errors?.oferta?.root && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Error de validación</span>
          </div>
          <p className="text-red-600 text-sm mt-1">
            {errors.oferta.root.message}
          </p>
        </div>
      )}
    </>
  );
};
