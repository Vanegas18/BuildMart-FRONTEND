import { CreditCard, Wallet } from "lucide-react";
import { PAYMENT_METHODS } from "../constants";
import { useState, useEffect } from "react";

export const PaymentStep = ({
  paymentMethod,
  setPaymentMethod,
  paymentDetails,
  setPaymentDetails,
  metodosGuardados = [],
  metodoPagoSeleccionado,
  handleSeleccionarMetodoPago,
  creandoNuevoPago,
  handleNuevoPago,
}) => {
  const [errors, setErrors] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Definimos la función de validación dentro del componente
  const validatePaymentForm = () => {
    let newErrors = {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    };
    let isValid = true;

    // Solo validamos si estamos usando tarjeta como método de pago
    if (paymentMethod === PAYMENT_METHODS.CARD) {
      // Validar nombre del titular
      if (!paymentDetails.cardName?.trim()) {
        newErrors.cardName = "El nombre del titular es obligatorio";
        isValid = false;
      }

      // Validar número de tarjeta (16 dígitos, puede tener espacios)
      const cardNumberClean =
        paymentDetails.cardNumber?.replace(/\s/g, "") || "";
      if (!cardNumberClean) {
        newErrors.cardNumber = "El número de tarjeta es obligatorio";
        isValid = false;
      } else if (!/^\d{16}$/.test(cardNumberClean)) {
        newErrors.cardNumber = "El número de tarjeta debe tener 16 dígitos";
        isValid = false;
      }

      // Validar fecha de expiración (formato MM/AA)
      if (!paymentDetails.expiryDate) {
        newErrors.expiryDate = "La fecha de expiración es obligatoria";
        isValid = false;
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentDetails.expiryDate)) {
        newErrors.expiryDate = "Formato inválido. Use MM/AA";
        isValid = false;
      } else {
        // Validar que la fecha no esté expirada
        const [month, year] = paymentDetails.expiryDate.split("/");
        const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const currentDate = new Date();
        if (expiryDate < currentDate) {
          newErrors.expiryDate = "La tarjeta ha expirado";
          isValid = false;
        }
      }

      // Validar CVV (3 o 4 dígitos)
      if (!paymentDetails.cvv) {
        newErrors.cvv = "El código CVV es obligatorio";
        isValid = false;
      } else if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
        newErrors.cvv = "El CVV debe tener 3 o 4 dígitos";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Efecto para limpiar errores si cambiamos de método de pago
  useEffect(() => {
    if (paymentMethod !== PAYMENT_METHODS.CARD) {
      setErrors({
        cardName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      });
    }
  }, [paymentMethod]);

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
                  Titular de la tarjeta
                </label>
                <input
                  type="text"
                  className={`w-full mt-1 px-3 py-2 border rounded-md ${
                    errors.cardName ? "border-red-500" : ""
                  }`}
                  value={paymentDetails.cardName || ""}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      cardName: e.target.value,
                    })
                  }
                  onBlur={validatePaymentForm}
                />
                {errors.cardName && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Número de Tarjeta</label>
                <input
                  type="text"
                  className={`w-full mt-1 px-3 py-2 border rounded-md ${
                    errors.cardNumber ? "border-red-500" : ""
                  }`}
                  value={paymentDetails.cardNumber || ""}
                  onChange={(e) => {
                    // Eliminar espacios y caracteres no numéricos
                    const valor = e.target.value.replace(/[^\d]/g, "");

                    // Formatear con espacios cada 4 dígitos
                    const valorFormateado = valor
                      .replace(/(.{4})/g, "$1 ")
                      .trim();

                    // Limitar a 19 caracteres (16 dígitos + 3 espacios)
                    if (valor.length <= 16) {
                      setPaymentDetails({
                        ...paymentDetails,
                        cardNumber: valorFormateado,
                      });
                    }
                  }}
                  onBlur={validatePaymentForm}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cardNumber}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">
                    Fecha de Expiración
                  </label>
                  <input
                    type="text"
                    className={`w-full mt-1 px-3 py-2 border rounded-md ${
                      errors.expiryDate ? "border-red-500" : ""
                    }`}
                    value={paymentDetails.expiryDate || ""}
                    onChange={(e) => {
                      // Eliminar caracteres no numéricos y barras
                      let valor = e.target.value.replace(/[^\d]/g, "");

                      // Formatear automáticamente
                      if (valor.length > 0) {
                        // Limitamos a solo 2 dígitos para el mes
                        if (valor.length >= 1) {
                          // Si es mayor a 1, ajustamos para que sea un mes válido
                          if (valor[0] > "1") {
                            valor = "0" + valor[0] + valor.substring(1);
                          }
                        }

                        // Limitamos a 4 dígitos en total (MM/YY)
                        if (valor.length > 4) {
                          valor = valor.substring(0, 4);
                        }

                        // Añadimos el "/" automáticamente después del mes
                        if (valor.length >= 2) {
                          valor =
                            valor.substring(0, 2) + "/" + valor.substring(2);
                        }
                      }

                      setPaymentDetails({
                        ...paymentDetails,
                        expiryDate: valor,
                      });
                    }}
                    onBlur={validatePaymentForm}
                    placeholder="MM/AA"
                    maxLength={5}
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">CVV</label>
                  <input
                    type="text"
                    className={`w-full mt-1 px-3 py-2 border rounded-md ${
                      errors.cvv ? "border-red-500" : ""
                    }`}
                    value={paymentDetails.cvv || ""}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        cvv: e.target.value,
                      })
                    }
                    onBlur={validatePaymentForm}
                    placeholder="123"
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="saveCard"
                  checked={paymentDetails.saveCard || false}
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
