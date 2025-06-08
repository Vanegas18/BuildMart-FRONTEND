// components/PaymentStep.jsx
import { PAYMENT_METHODS } from "../constants";

export const PaymentStep = ({ paymentMethod, setPaymentMethod }) => {
  // Para debugging - borrar después
  console.log("Método de pago actual:", paymentMethod);

  const handleSetPaymentMethod = (method) => {
    console.log("Cambiando método de pago a:", method);
    setPaymentMethod(method);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="font-medium text-lg sm:text-xl">Método de Pago</h3>

      <div className="space-y-3 sm:space-y-4">
        {/* Opción Pago en Efectivo */}
        <div
          className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-500 hover:shadow-sm ${
            paymentMethod === PAYMENT_METHODS.CASH
              ? "border-blue-500 bg-blue-50 shadow-sm"
              : "border-gray-200"
          }`}
          onClick={() => handleSetPaymentMethod(PAYMENT_METHODS.CASH)}>
          <div className="flex items-center gap-3">
            {/* Radio Button Custom */}
            <div
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                paymentMethod === PAYMENT_METHODS.CASH
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}>
              {paymentMethod === PAYMENT_METHODS.CASH && (
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500" />
              )}
            </div>

            {/* Contenido */}
            <div className="flex-1">
              <div className="font-medium text-gray-800 text-sm sm:text-base">
                Pago en Efectivo al Recibir
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-0.5">
                Paga cuando recibas tu pedido
              </div>
            </div>
          </div>
        </div>

        {/* Opción Transferencia Bancaria */}
        <div
          className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-500 hover:shadow-sm ${
            paymentMethod === PAYMENT_METHODS.TRANSFER
              ? "border-blue-500 bg-blue-50 shadow-sm"
              : "border-gray-200"
          }`}
          onClick={() => handleSetPaymentMethod(PAYMENT_METHODS.TRANSFER)}>
          <div className="flex items-center gap-3">
            {/* Radio Button Custom */}
            <div
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                paymentMethod === PAYMENT_METHODS.TRANSFER
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}>
              {paymentMethod === PAYMENT_METHODS.TRANSFER && (
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500" />
              )}
            </div>

            {/* Contenido */}
            <div className="flex-1">
              <div className="font-medium text-gray-800 text-sm sm:text-base">
                Transferencia Bancaria al Recibir
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-0.5">
                Transfiere cuando recibas tu pedido
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nota informativa - Solo visible en desktop */}
      <div className="hidden sm:block bg-gray-50 border border-gray-200 rounded-lg p-3">
        <p className="text-xs text-gray-600">
          💡 <strong>Nota:</strong> El pago se realiza únicamente al momento de
          recibir tu pedido.
        </p>
      </div>
    </div>
  );
};
