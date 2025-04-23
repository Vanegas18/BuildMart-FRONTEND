import { CreditCard } from "lucide-react";
import { PAYMENT_METHODS } from "../constants";

export const PaymentStep = ({
  paymentMethod,
  setPaymentMethod,
  paymentDetails,
  setPaymentDetails,
  validatePaymentForm,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Método de Pago</h3>

      <div className="space-y-2">
        <div
          className={`p-3 border rounded-md cursor-pointer hover:border-blue-500 ${
            paymentMethod === PAYMENT_METHODS.CARD
              ? "border-blue-500 bg-blue-50"
              : ""
          }`}
          onClick={() => setPaymentMethod(PAYMENT_METHODS.CARD)}>
          <div className="flex items-center">
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                paymentMethod === PAYMENT_METHODS.CARD
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}>
              {paymentMethod === PAYMENT_METHODS.CARD && (
                <div className="w-3 h-3 rounded-full bg-blue-500" />
              )}
            </div>
            <div className="ml-2 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-gray-600" />
              <span>Tarjeta de Crédito/Débito</span>
            </div>
          </div>
        </div>

        <div
          className={`p-3 border rounded-md cursor-pointer hover:border-blue-500 ${
            paymentMethod === PAYMENT_METHODS.CASH
              ? "border-blue-500 bg-blue-50"
              : ""
          }`}
          onClick={() => setPaymentMethod(PAYMENT_METHODS.CASH)}>
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
      </div>

      {paymentMethod === PAYMENT_METHODS.CARD && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Nombre en la Tarjeta</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-md"
              value={paymentDetails.cardName}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  cardName: e.target.value,
                })
              }
              onBlur={validatePaymentForm}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Número de Tarjeta</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-md"
              value={paymentDetails.cardNumber}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  cardNumber: e.target.value,
                })
              }
              onBlur={validatePaymentForm}
              placeholder="0000 0000 0000 0000"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Fecha de Expiración</label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-2 border rounded-md"
                value={paymentDetails.expiryDate}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    expiryDate: e.target.value,
                  })
                }
                onBlur={validatePaymentForm}
                placeholder="MM/AA"
              />
            </div>
            <div>
              <label className="text-sm font-medium">CVV</label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-2 border rounded-md"
                value={paymentDetails.cvv}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    cvv: e.target.value,
                  })
                }
                onBlur={validatePaymentForm}
                placeholder="123"
              />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="saveCard"
              checked={paymentDetails.saveCard}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  saveCard: e.target.checked,
                })
              }
              className="mr-2"
            />
            <label htmlFor="saveCard" className="text-sm text-gray-700">
              Guardar esta tarjeta para futuras compras
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
