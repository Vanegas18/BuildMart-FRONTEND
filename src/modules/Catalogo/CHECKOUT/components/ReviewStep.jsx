import { User, Truck, CreditCard, Wallet, MapPin, Phone } from "lucide-react";
import { PAYMENT_METHODS } from "../constants";

export const ReviewStep = ({
  shippingDetails,
  paymentMethod,
  paymentDetails,
  direccionSeleccionada,
  metodoPagoSeleccionado,
}) => {
  // Función para mostrar el nombre del método de pago de forma legible
  const getPaymentMethodName = (method) => {
    switch (method) {
      case PAYMENT_METHODS.CASH:
      case "efectivo":
        return "Pago en Efectivo al Recibir";
      case PAYMENT_METHODS.TRANSFER:
      case "transferencia":
        return "Transferencia Bancaria al Recibir";
      default:
        return "Método de pago desconocido";
    }
  };

  console.log("Método de pago en ReviewStep:", paymentMethod);
  console.log("Método de pago seleccionado:", metodoPagoSeleccionado);

  return (
    <div className="space-y-6">
      {/* Header mejorado */}
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          Revisión del Pedido
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          Verifica que toda la información esté correcta antes de confirmar
        </p>
      </div>

      <div className="space-y-6">
        {/* Sección de Dirección de Envío */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* Header de la sección */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  Dirección de Envío
                </h4>
                <p className="text-xs text-gray-600">
                  Lugar donde entregaremos tu pedido
                </p>
              </div>
            </div>
          </div>

          {/* Contenido de la dirección */}
          <div className="p-4">
            {direccionSeleccionada ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-medium text-gray-800">
                      {direccionSeleccionada.tipo || "Dirección Principal"}
                    </p>
                    <p className="text-gray-600">
                      {direccionSeleccionada.calle}
                    </p>
                    <p className="text-gray-600">
                      {direccionSeleccionada.ciudad},{" "}
                      {direccionSeleccionada.departamento}
                      {direccionSeleccionada.codigoPostal &&
                        ` - ${direccionSeleccionada.codigoPostal}`}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-gray-600">{shippingDetails.address}</p>
                    <p className="text-gray-600">
                      {shippingDetails.city}, {shippingDetails.state}{" "}
                      {shippingDetails.zipCode}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <p className="text-gray-600">{shippingDetails.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sección de Método de Pago */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* Header de la sección */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Wallet className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Método de Pago</h4>
                <p className="text-xs text-gray-600">
                  Forma de pago seleccionada
                </p>
              </div>
            </div>
          </div>

          {/* Contenido del método de pago */}
          <div className="p-4">
            {metodoPagoSeleccionado ? (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-800">
                    {metodoPagoSeleccionado.tipo || "Método de Pago"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {metodoPagoSeleccionado.descripcion}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {paymentMethod === "efectivo" ? (
                    <Wallet className="h-5 w-5 text-blue-600" />
                  ) : (
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-800">
                    {getPaymentMethodName(paymentMethod)}
                  </p>
                  <p className="text-sm text-gray-600">
                    El pago se realizará al momento de la entrega
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nota informativa */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 text-xs font-bold">i</span>
            </div>
            <div className="text-sm">
              <p className="font-medium text-blue-800 mb-1">
                Información importante
              </p>
              <p className="text-blue-700">
                Una vez confirmado el pedido, nos pondremos en contacto contigo
                para coordinar la entrega y confirmar los detalles del pago.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
