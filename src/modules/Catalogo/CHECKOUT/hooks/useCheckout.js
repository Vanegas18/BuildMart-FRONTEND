import { useState } from "react";
import { toast } from "sonner";
import { useAuth, usePedidos } from "@/core/context";
import { useCart } from "@/core/context/Carrito/CarritoContext";
import { validateRequiredFields } from "../utils/validators";
import { createOrderStructure } from "../utils/orderTransformers";
import {
  CHECKOUT_STEPS,
  PAYMENT_METHODS,
  CONFIRMATION_CLOSE_DELAY,
} from "../constants";

export const useCheckout = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPedidoConfirmado, setIsPedidoConfirmado] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Contextos
  const { cartItems, getSubtotal, getItemCount, clearCart, setIsCartOpen } =
    useCart();
  const { crearPedido } = usePedidos();
  const { user } = useAuth();

  // Form states
  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.CARD);
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
  });

  // Form validation states
  const [shippingValid, setShippingValid] = useState(false);
  const [paymentValid, setPaymentValid] = useState(false);

  // Cálculos
  const subtotal = getSubtotal();
  const tax = subtotal * 0.08; // 8% de impuesto
  const shippingCost = subtotal > 200000 ? 0 : 50; // Envío gratis en compras mayores a $500
  const total = subtotal + tax + shippingCost;
  const itemCount = getItemCount();

  // Validar formulario de envío
  const validateShippingForm = () => {
    const requiredFields = ["address", "city", "state", "zipCode", "phone"];
    const isValid = validateRequiredFields(shippingDetails, requiredFields);
    setShippingValid(isValid);
    return isValid;
  };

  // Validar formulario de pago
  const validatePaymentForm = () => {
    if (paymentMethod === PAYMENT_METHODS.CARD) {
      const requiredFields = ["cardName", "cardNumber", "expiryDate", "cvv"];
      const isValid = validateRequiredFields(paymentDetails, requiredFields);
      setPaymentValid(isValid);
      return isValid;
    }
    // Para otros métodos de pago
    setPaymentValid(true);
    return true;
  };

  // Navegación entre pasos
  const nextStep = () => {
    if (currentStep === 0 && !validateShippingForm()) {
      toast.error("Por favor completa todos los campos de envío");
      return;
    }

    if (currentStep === 1 && !validatePaymentForm()) {
      toast.error("Por favor completa todos los datos de pago");
      return;
    }

    if (currentStep < CHECKOUT_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  // Confirmar y crear el pedido
  const handleConfirmarPedido = async () => {
    if (!user || (!user._id && !user.id)) {
      toast.error(
        "No se pudo identificar al cliente. Por favor, inicia sesión nuevamente"
      );
      return;
    }

    try {
      setIsLoading(true);

      // Crear estructura de pedido
      const nuevoPedido = createOrderStructure({
        user,
        cartItems,
        total,
        shippingDetails,
        paymentMethod,
      });

      // Enviar pedido a la API
      await crearPedido(nuevoPedido);

      // Mostrar confirmación y limpiar carrito
      setIsPedidoConfirmado(true);
      clearCart();

      toast.success("¡Pedido creado exitosamente!");

      // Después de 3 segundos, cerrar todo
      setTimeout(() => {
        setIsPedidoConfirmado(false);
        setIsDialogOpen(false);
        setIsCartOpen(false);
      }, CONFIRMATION_CLOSE_DELAY);
    } catch (error) {
      toast.error("Error al crear el pedido", {
        description: error.message || "Inténtalo nuevamente",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // States
    isDialogOpen,
    setIsDialogOpen,
    isLoading,
    isPedidoConfirmado,
    currentStep,
    shippingDetails,
    setShippingDetails,
    paymentMethod,
    setPaymentMethod,
    paymentDetails,
    setPaymentDetails,
    shippingValid,
    paymentValid,

    // Calculated values
    steps: CHECKOUT_STEPS,
    subtotal,
    tax,
    shippingCost,
    total,
    cartItems,
    itemCount,

    // Methods
    nextStep,
    prevStep,
    validateShippingForm,
    validatePaymentForm,
    handleConfirmarPedido,
  };
};
