import { User, Truck, CreditCard, Wallet } from "lucide-react";
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
      <h3 className="font-medium">Revisión del Pedido</h3>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-md space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-medium flex items-center">
              <Truck className="h-4 w-4 mr-2 text-blue-600" />
              Dirección de Envío
            </span>
          </div>
          {direccionSeleccionada ? (
            <>
              <p className="font-medium">
                {direccionSeleccionada.tipo || "Dirección"}
              </p>
              <p>{direccionSeleccionada.calle}</p>
              <p>
                {direccionSeleccionada.ciudad},{" "}
                {direccionSeleccionada.departamento}
                {direccionSeleccionada.codigoPostal &&
                  ` - ${direccionSeleccionada.codigoPostal}`}
              </p>
            </>
          ) : (
            <>
              <p>{shippingDetails.address}</p>
              <p>
                {shippingDetails.city}, {shippingDetails.state}{" "}
                {shippingDetails.zipCode}
              </p>
              <p>Tel: {shippingDetails.phone}</p>
            </>
          )}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-4 rounded-md shadow-sm border border-gray-100">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
            <span className="font-medium flex items-center">
              <Wallet className="h-4 w-4 mr-2 text-blue-600" />
              Método de Pago
            </span>
          </div>

          <div className="pl-2">
            {metodoPagoSeleccionado ? (
              <div className="space-y-1">
                <p className="font-medium text-gray-900">
                  {metodoPagoSeleccionado.tipo || "Método de Pago"}
                </p>
                <p className="text-gray-600 text-sm">
                  {metodoPagoSeleccionado.descripcion}
                </p>
              </div>
            ) : (
              <div className="flex items-center">
                {paymentMethod === "efectivo" ? (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Wallet className="h-4 w-4 text-blue-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                  </div>
                )}
                <p className="font-medium text-gray-800">
                  {getPaymentMethodName(paymentMethod)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
