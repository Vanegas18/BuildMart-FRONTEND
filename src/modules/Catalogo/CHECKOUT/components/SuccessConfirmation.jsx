import { CheckCircle } from "lucide-react";

export const SuccessConfirmation = () => {
  return (
    <div className="py-8 flex flex-col items-center justify-center">
      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
      <h3 className="text-xl font-bold text-center">¡Pedido Confirmado!</h3>
      <p className="text-gray-600 text-center mt-2">
        Tu pedido ha sido creado exitosamente.
      </p>
      <p className="text-gray-600 text-center mt-1">
        Recibirás un correo electrónico con los detalles de tu compra.
      </p>
    </div>
  );
};
