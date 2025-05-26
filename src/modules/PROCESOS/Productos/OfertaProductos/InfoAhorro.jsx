import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { CheckCircle2 } from "lucide-react";
import React from "react";

export const InfoAhorro = ({ form }) => {
  return (
    <>
      {form.watch("precio") && form.watch("oferta.precioOferta") > 0 && (
        <div className="bg-gradient-to-r from-green-400/20 to-emerald-400/20 backdrop-blur-sm rounded-xl p-5 border border-green-200/50">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <h5 className="font-semibold text-green-800">
              Resumen de la oferta
            </h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/60 rounded-lg p-3">
              <p className="text-gray-600 text-xs uppercase tracking-wide mb-1">
                Precio original
              </p>
              <p className="text-lg font-bold text-gray-900">
                ${FormateoPrecio(form.watch("precio"))}
              </p>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <p className="text-green-600 text-xs uppercase tracking-wide mb-1">
                Precio con oferta
              </p>
              <p className="text-lg font-bold text-green-700">
                ${FormateoPrecio(form.watch("oferta.precioOferta"))}
              </p>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <p className="text-blue-600 text-xs uppercase tracking-wide mb-1">
                Ahorro total
              </p>
              <p className="text-lg font-bold text-blue-700">
                $
                {FormateoPrecio(
                  form.watch("precio") - form.watch("oferta.precioOferta")
                )}
                {form.watch("oferta.descuento") > 0 && (
                  <span className="text-sm ml-1">
                    ({form.watch("oferta.descuento")}% off)
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
