import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth, useClientes, usePedidos } from "@/core/context";
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

  // Estados para direcciones y métodos de pago guardados
  const [direccionesGuardadas, setDireccionesGuardadas] = useState([]);
  const [metodosGuardados, setMetodosGuardados] = useState([]);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(null);
  const [creandoNuevaDireccion, setCreandoNuevaDireccion] = useState(false);
  const [creandoNuevoPago, setCreandoNuevoPago] = useState(false);

  // Contextos
  const { cartItems, getSubtotal, getItemCount, clearCart, setIsCartOpen } =
    useCart();
  const { crearPedido } = usePedidos();
  const { user } = useAuth();
  const { obtenerClientePorId } = useClientes();

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

  // Cargar direcciones y métodos de pago del usuario al abrir el diálogo
  useEffect(() => {
    if (isDialogOpen && user && (user._id || user.id)) {
      cargarDatosUsuario();
    }
  }, [isDialogOpen, user]);

  // Función para cargar los datos del usuario
  const cargarDatosUsuario = async () => {
    try {
      setIsLoading(true);
      const clienteId = user._id || user.id;
      console.log("ID de cliente:", clienteId);

      const { data: datosCliente } = await obtenerClientePorId(clienteId);
      console.log("Datos del cliente obtenidos:", datosCliente);

      if (datosCliente) {
        // Cargar direcciones
        if (datosCliente.direcciones && datosCliente.direcciones.length > 0) {
          setDireccionesGuardadas(datosCliente.direcciones);

          // Seleccionar la dirección principal por defecto, o la primera si no hay principal
          const direccionPrincipal =
            datosCliente.direcciones.find((d) => d.esPrincipal) ||
            datosCliente.direcciones[0];
          setDireccionSeleccionada(direccionPrincipal);

          // Mapear los datos de dirección al formato de shippingDetails
          setShippingDetails({
            address: direccionPrincipal.calle || "",
            city: direccionPrincipal.ciudad || "",
            state: direccionPrincipal.departamento || "",
            zipCode: direccionPrincipal.codigoPostal || "",
            phone: user.telefono || "",
          });
          setShippingValid(true);
        }

        // Cargar métodos de pago
        if (datosCliente.metodosPago && datosCliente.metodosPago.length > 0) {
          setMetodosGuardados(datosCliente.metodosPago);

          // Seleccionar el método principal por defecto, o el primero si no hay principal
          const metodoPrincipal =
            datosCliente.metodosPago.find((m) => m.esPrincipal) ||
            datosCliente.metodosPago[0];
          setMetodoPagoSeleccionado(metodoPrincipal);

          // Configurar el método de pago según el tipo
          if (
            metodoPrincipal.tipo === "Tarjeta de Crédito" ||
            metodoPrincipal.tipo === "Tarjeta de Débito"
          ) {
            setPaymentMethod(PAYMENT_METHODS.CARD);
            setPaymentDetails({
              cardName: metodoPrincipal.titular || "",
              cardNumber: metodoPrincipal.numeroTarjeta || "",
              expiryDate: metodoPrincipal.fechaExpiracion || "",
              cvv: "",
              saveCard: false,
            });
          } else if (metodoPrincipal.tipo === "Efectivo") {
            setPaymentMethod(PAYMENT_METHODS.CASH);
          }
          setPaymentValid(true);
        }
      }
    } catch (error) {
      console.error("Error al cargar datos del usuario:", error);
      toast.error("No se pudieron cargar tus datos guardados");
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar selección de dirección guardada
  const handleSeleccionarDireccion = (direccion) => {
    setDireccionSeleccionada(direccion);
    setShippingDetails({
      address: direccion.calle || "",
      city: direccion.ciudad || "",
      state: direccion.departamento || "",
      zipCode: direccion.codigoPostal || "",
      phone: user.telefono || "",
    });
    setCreandoNuevaDireccion(false);
    setShippingValid(true);
  };

  // Manejar selección de método de pago guardado
  const handleSeleccionarMetodoPago = (metodoPago) => {
    setMetodoPagoSeleccionado(metodoPago);

    if (
      metodoPago.tipo === "Tarjeta de Crédito" ||
      metodoPago.tipo === "Tarjeta de Débito"
    ) {
      setPaymentMethod(PAYMENT_METHODS.CARD);
      setPaymentDetails({
        cardName: metodoPago.titular || "",
        cardNumber: metodoPago.numeroTarjeta || "",
        expiryDate: metodoPago.fechaExpiracion || "",
        cvv: "",
        saveCard: false,
      });
    } else if (metodoPago.tipo === "Efectivo") {
      setPaymentMethod(PAYMENT_METHODS.CASH);
    }

    setCreandoNuevoPago(false);
    setPaymentValid(true);
  };

  // Cálculos
  const subtotal = getSubtotal();
  const tax = subtotal * 0.08; // 8% de impuesto
  const shippingCost = subtotal > 200000 ? 0 : 15000; // Envío gratis en compras mayores a $200,000
  const total = subtotal + tax + shippingCost;
  const itemCount = getItemCount();

  // Validar formulario de envío
  const validateShippingForm = () => {
    if (direccionSeleccionada && !creandoNuevaDireccion) {
      setShippingValid(true);
      return true;
    }

    const requiredFields = ["address", "city", "state", "zipCode", "phone"];
    const isValid = validateRequiredFields(shippingDetails, requiredFields);
    setShippingValid(isValid);
    return isValid;
  };

  // Validar formulario de pago
  const validatePaymentForm = () => {
    if (metodoPagoSeleccionado && !creandoNuevoPago) {
      setPaymentValid(true);
      return true;
    }

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

  // Manejar creación de nueva dirección
  const handleNuevaDireccion = () => {
    setDireccionSeleccionada(null);
    setCreandoNuevaDireccion(true);
    setShippingDetails({
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: user?.telefono || "",
    });
    setShippingValid(false);
  };

  // Manejar creación de nuevo método de pago
  const handleNuevoPago = () => {
    setMetodoPagoSeleccionado(null);
    setCreandoNuevoPago(true);
    setPaymentDetails({
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      saveCard: true, // Por defecto guardar nueva tarjeta
    });
    setPaymentValid(false);
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

      // Crear estructura de pedido incluyendo la dirección seleccionada
      const direccionPedido = direccionSeleccionada || {
        calle: shippingDetails.address,
        ciudad: shippingDetails.city,
        departamento: shippingDetails.state,
        codigoPostal: shippingDetails.zipCode,
      };

      // Crear estructura de pedido
      const nuevoPedido = createOrderStructure({
        user,
        cartItems,
        total,
        direccion: direccionPedido,
        metodoPago: metodoPagoSeleccionado || paymentMethod,
      });

      // Enviar pedido a la API
      await crearPedido(nuevoPedido);

      // Mostrar confirmación y limpiar carrito
      setIsPedidoConfirmado(true);
      clearCart();

      toast.success("¡Pedido creado exitosamente!");

      setTimeout(() => {
        window.location.reload();
      }, 1500); // Espera 1.5 segundos para que se vea bien el toast

      // Después de 3 segundos, cerrar todo
      setTimeout(() => {
        setIsPedidoConfirmado(false);
        setIsDialogOpen(false);
        setIsCartOpen(false);

        // Reiniciar el estado para futuros pedidos
        setCurrentStep(0);
        setDireccionSeleccionada(null);
        setMetodoPagoSeleccionado(null);
        setCreandoNuevaDireccion(false);
        setCreandoNuevoPago(false);
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

    // Direcciones y métodos guardados
    direccionesGuardadas,
    metodosGuardados,
    direccionSeleccionada,
    metodoPagoSeleccionado,
    creandoNuevaDireccion,
    creandoNuevoPago,
    handleSeleccionarDireccion,
    handleSeleccionarMetodoPago,
    handleNuevaDireccion,
    handleNuevoPago,

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
