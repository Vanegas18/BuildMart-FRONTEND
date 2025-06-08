import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Separator } from "@/shared/components/ui/separator";

export const OrderSummary = ({ cartItems, subtotal }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm sticky top-4">
      {/* Header del resumen */}
      <div className="p-3 sm:p-4 border-b border-gray-100 bg-gray-50 rounded-t-lg">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          <span className="hidden sm:inline">Resumen de Productos</span>
          <span className="sm:hidden">Resumen</span>
          <span className="text-xs sm:text-sm font-normal text-gray-500 ml-auto">
            ({cartItems.length}{" "}
            {cartItems.length === 1 ? "producto" : "productos"})
          </span>
        </h3>
      </div>

      {/* Lista de productos */}
      <div className="p-3 sm:p-4">
        <div className="max-h-48 sm:max-h-60 lg:max-h-80 overflow-y-auto custom-scrollbar">
          <div className="space-y-2 sm:space-y-3">
            {cartItems.map((item, index) => (
              <div
                key={item._id}
                className={`flex justify-between items-start p-2 sm:p-3 rounded-lg transition-colors hover:bg-gray-50 ${
                  index !== cartItems.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}>
                {/* Información del producto */}
                <div className="flex-1 min-w-0 pr-2">
                  <div className="font-medium text-sm sm:text-base text-gray-800 truncate">
                    {item.nombre}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs sm:text-sm text-gray-500">
                      Cant: {item.quantity}
                    </span>
                    {item.oferta?.activa && (
                      <span className="text-xs bg-red-100 text-red-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">
                        ¡Oferta!
                      </span>
                    )}
                  </div>
                </div>

                {/* Precio */}
                <div className="text-right">
                  <div className="font-semibold text-sm sm:text-base text-gray-800">
                    $
                    {FormateoPrecio(
                      (item.oferta?.activa
                        ? item.oferta.precioOferta
                        : item.precio) * item.quantity
                    )}
                  </div>
                  {item.oferta?.activa && (
                    <div className="text-xs text-gray-400 line-through">
                      ${FormateoPrecio(item.precio * item.quantity)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Separador */}
        <Separator className="my-3 sm:my-4" />

        {/* Total */}
        <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100">
          <div className="flex justify-between items-center">
            <span className="text-base sm:text-lg font-semibold text-gray-800">
              Total a Pagar
            </span>
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-bold text-blue-600">
                ${FormateoPrecio(subtotal)}
              </span>
              <div className="text-xs text-gray-500 mt-1">
                Incluye productos
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
