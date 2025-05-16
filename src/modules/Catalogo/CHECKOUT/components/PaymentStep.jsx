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
    <div className="space-y-4">
      <h3 className="font-medium">Método de Pago</h3>

      <div className="space-y-2">
        <div
          className={`p-3 border rounded-md cursor-pointer hover:border-blue-500 ${
            paymentMethod === PAYMENT_METHODS.CASH
              ? "border-blue-500 bg-blue-50"
              : ""
          }`}
          onClick={() => handleSetPaymentMethod(PAYMENT_METHODS.CASH)}>
          <div className="flex items-center">
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                paymentMethod === PAYMENT_METHODS.CASH
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}>
              {paymentMethod === PAYMENT_METHODS.CASH && (
                <div className="w-3 h-3 rounded-full bg-blue-500" />
              )}
            </div>
            <div className="ml-2">Pago en Efectivo al Recibir</div>
          </div>
        </div>

        <div
          className={`p-3 border rounded-md cursor-pointer hover:border-blue-500 ${
            paymentMethod === PAYMENT_METHODS.TRANSFER
              ? "border-blue-500 bg-blue-50"
              : ""
          }`}
          onClick={() => handleSetPaymentMethod(PAYMENT_METHODS.TRANSFER)}>
          <div className="flex items-center">
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                paymentMethod === PAYMENT_METHODS.TRANSFER
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}>
              {paymentMethod === PAYMENT_METHODS.TRANSFER && (
                <div className="w-3 h-3 rounded-full bg-blue-500" />
              )}
            </div>
            <div className="ml-2">Transferencia Bancaria al Recibir</div>
          </div>
        </div>
      </div>
    </div>
  );
};
