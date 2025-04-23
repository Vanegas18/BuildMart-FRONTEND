import { User, Truck, CreditCard } from "lucide-react";
import { PAYMENT_METHODS } from "../constants";

export const ReviewStep = ({
  shippingDetails,
  paymentMethod,
  paymentDetails,
}) => {
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
          <p>{shippingDetails.address}</p>
          <p>
            {shippingDetails.city}, {shippingDetails.state}{" "}
            {shippingDetails.zipCode}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-md space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-medium flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
              Método de Pago
            </span>
          </div>
          {paymentMethod === PAYMENT_METHODS.CARD ? (
            <>
              <p>Tarjeta de Crédito/Débito</p>
              <p>{paymentDetails.cardName}</p>
              <p>**** **** **** {paymentDetails.cardNumber.slice(-4)}</p>
            </>
          ) : (
            <p>Pago en Efectivo al Recibir</p>
          )}
        </div>
      </div>
    </div>
  );
};
