import { Package, Percent, Clock } from "lucide-react";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";

export const InfoProducto = ({ producto }) => {
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

  return (
    <div
      className={`rounded-xl p-4 border transition-all duration-200 ${
        ofertaActualmenteActiva
          ? "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200"
          : "bg-gray-50 border-gray-100"
      }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              {producto.nombre}
              {ofertaActualmenteActiva && (
                <span className="text-orange-600 text-sm font-medium">
                  (En oferta)
                </span>
              )}
            </h4>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-600">
                Precio compra:
                <span
                  className={`font-medium ml-1 ${
                    ofertaActualmenteActiva ? " text-gray-500" : ""
                  }`}>
                  ${FormateoPrecio(producto.precioCompra)}
                </span>
              </span>
              <span className="text-gray-600">
                Precio original:
                <span
                  className={`font-medium ml-1 ${
                    ofertaActualmenteActiva ? "line-through text-gray-500" : ""
                  }`}>
                  ${FormateoPrecio(producto.precio)}
                </span>
              </span>

              {ofertaActualmenteActiva && (
                <span className="text-orange-600 font-semibold">
                  Precio oferta: ${FormateoPrecio(producto.oferta.precioOferta)}
                </span>
              )}
            </div>
          </div>
        </div>
        {ofertaActualmenteActiva && (
          <div className="text-right">
            {producto.oferta?.descuento > 0 && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Percent className="w-3 h-3" />-{producto.oferta.descuento}%
              </div>
            )}
            <div className="text-xs text-gray-600 mt-1">
              Ahorro: $
              {FormateoPrecio(producto.precio - producto.oferta.precioOferta)}
            </div>
          </div>
        )}
      </div>

      {/* Información de vigencia de la oferta */}
      {tieneOfertaActiva && (fechaInicio || fechaFin) && (
        <div className="bg-white/60 rounded-lg p-3 border border-white/50">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              Vigencia de la oferta
            </span>
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            {fechaInicio && (
              <div>Inicio: {new Date(fechaInicio).toLocaleString()}</div>
            )}
            {fechaFin && <div>Fin: {new Date(fechaFin).toLocaleString()}</div>}
            {!ofertaVigentePorFecha && (
              <div className="text-amber-600 font-medium">
                ⚠️ Oferta fuera del período de vigencia
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
