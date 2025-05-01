import { CreditCard, Wallet } from "lucide-react";
import { PAYMENT_METHODS } from "../constants";

export const PaymentStep = ({
  paymentMethod,
  setPaymentMethod,
  paymentDetails,
  setPaymentDetails,
  validatePaymentForm,
  metodosGuardados = [],
  metodoPagoSeleccionado,
  handleSeleccionarMetodoPago,
  creandoNuevoPago,
  handleNuevoPago,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Método de Pago</h3>

      {/* Mostrar métodos de pago guardados */}
      {metodosGuardados.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">
            Métodos de Pago Guardados
          </h4>
          <div className="space-y-2">
            {metodosGuardados.map((metodo) => (
              <div
                key={metodo._id}
                className={`p-3 border rounded-md cursor-pointer hover:border-blue-500 ${
                  metodoPagoSeleccionado?._id === metodo._id
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
                onClick={() => handleSeleccionarMetodoPago(metodo)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        metodoPagoSeleccionado?._id === metodo._id
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}>
                      {metodoPagoSeleccionado?._id === metodo._id && (
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {metodo.tipo === "Efectivo" ? (
                          <Wallet className="h-4 w-4 mr-1 text-gray-600" />
                        ) : (
                          <CreditCard className="h-4 w-4 mr-1 text-gray-600" />
                        )}
                        {metodo.tipo}
                        {metodo.esPrincipal && (
                          <span className="text-xs text-white bg-blue-500 px-2 py-0.5 rounded-full">
                            Principal
                          </span>
                        )}
                      </div>
                      {metodo.tipo !== "Efectivo" && (
                        <div className="text-sm text-gray-600">
                          {metodo.titular} - ****{" "}
                          {metodo.numeroTarjeta?.slice(-4)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Opción para agregar nuevo método de pago */}
            <div
              className={`p-3 border rounded-md cursor-pointer hover:border-blue-500 ${
                creandoNuevoPago ? "border-blue-500 bg-blue-50" : ""
              }`}
              onClick={handleNuevoPago}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    creandoNuevoPago ? "border-blue-500" : "border-gray-300"
                  }`}>
                  {creandoNuevoPago && (
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </div>
                <div className="font-medium text-blue-600">
                  Agregar nuevo método de pago
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulario para nuevo método de pago */}
      {(creandoNuevoPago || metodosGuardados.length === 0) && (
        <div className={`${metodosGuardados.length > 0 ? "mt-4" : ""}`}>
          {metodosGuardados.length > 0 && (
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Nuevo Método de Pago
            </h4>
          )}

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
                <div className="ml-2 flex items-center">
                  <Wallet className="h-5 w-5 mr-2 text-gray-600" />
                  <span>Pago en Efectivo al Recibir</span>
                </div>
              </div>
            </div>
          </div>

          {paymentMethod === PAYMENT_METHODS.CARD && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Nombre en la Tarjeta
                </label>
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
                  <label className="text-sm font-medium">
                    Fecha de Expiración
                  </label>
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
      )}
    </div>
  );
};
