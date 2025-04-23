// Lista de pasos del proceso de checkout
export const CHECKOUT_STEPS = ["Dirección", "Método de Pago", "Confirmación"];

// Métodos de pago disponibles
export const PAYMENT_METHODS = {
  CARD: "tarjeta",
  CASH: "efectivo",
};

// Tiempo de espera para cierre automático tras confirmar pedido (en ms)
export const CONFIRMATION_CLOSE_DELAY = 3000;
