import { TagIcon } from "lucide-react";

export const OfertasEspeciales = ({ producto, mostrarOferta, handleOfertaToggle }) => {
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
    <>
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
          <TagIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900">
            Ofertas Especiales
          </h4>
          <p className="text-sm text-gray-600">
            {ofertaActualmenteActiva
              ? "Edita tu oferta actual o desactívala"
              : tieneOfertaActiva && !ofertaVigentePorFecha
              ? "Tienes una oferta configurada pero no está vigente"
              : "Crea una oferta atractiva para tus clientes"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="activarOferta"
            checked={mostrarOferta}
            onChange={(e) => handleOfertaToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-blue-600"></div>
        </label>
        <span
          className={`text-sm font-medium transition-colors duration-200 ${
            mostrarOferta ? "text-blue-600" : "text-gray-500"
          }`}>
          {mostrarOferta ? "Activa" : "Inactiva"}
        </span>
      </div>
    </>
  );
};
