import { useAuth, usePedidos } from "@/core/context";
import { useCart } from "@/core/context/Carrito/CarritoContext";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Button } from "@/shared/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Separator } from "@/shared/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ShoppingCart,
  CreditCard,
  Truck,
  User,
  Check,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Define step interfaces
export const ConfirmarPedido = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPedidoConfirmado, setIsPedidoConfirmado] = useState(false);

  // Step management
  const steps = ["Dirección", "Método de Pago", "Confirmación"];
  const [currentStep, setCurrentStep] = useState(0);

  // Contextos
  const { cartItems, getSubtotal, getItemCount, clearCart, setIsCartOpen } =
    useCart();
  const { crearPedido } = usePedidos();
  const { user } = useAuth();

  // Cálculos
  const subtotal = getSubtotal();
  const tax = subtotal * 0.08; // 8% de impuesto
  const shippingCost = subtotal > 200000 ? 0 : 50; // Envío gratis en compras mayores a $500
  const total = subtotal + tax + shippingCost;
  const itemCount = getItemCount();

  // Form states
  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("tarjeta");
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

  // Transformar productos del carrito al formato de pedido
  const transformarProductosParaPedido = () => {
    return cartItems.map((item) => ({
      productoId: item._id,
      cantidad: item.quantity,
    }));
  };

  // Validar formulario de envío
  const validateShippingForm = () => {
    const requiredFields = ["address", "city", "state", "zipCode", "phone"];
    const isValid = requiredFields.every((field) =>
      shippingDetails[field]?.trim()
    );
    setShippingValid(isValid);
    return isValid;
  };

  // Validar formulario de pago
  const validatePaymentForm = () => {
    if (paymentMethod === "tarjeta") {
      const requiredFields = ["cardName", "cardNumber", "expiryDate", "cvv"];
      const isValid = requiredFields.every((field) =>
        paymentDetails[field]?.trim()
      );
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

    if (currentStep < steps.length - 1) {
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
      const nuevoPedido = {
        clienteId: user._id || user.id,
        productos: transformarProductosParaPedido(),
        // direccion: {
        //   calle: shippingDetails.address,
        //   ciudad: shippingDetails.city,
        //   estado: shippingDetails.state,
        //   codigoPostal: shippingDetails.zipCode,
        //   telefono: shippingDetails.phone,
        // },
        // metodoPago: paymentMethod,
        total: total,
      };

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
      }, 3000);
    } catch (error) {
      toast.error("Error al crear el pedido", {
        description: error.message || "Inténtalo nuevamente",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Renderizar formulario según el paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Información de Envío</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-medium">Dirección</label>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  value={shippingDetails.address}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      address: e.target.value,
                    })
                  }
                  onBlur={validateShippingForm}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Ciudad</label>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  value={shippingDetails.city}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      city: e.target.value,
                    })
                  }
                  onBlur={validateShippingForm}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Estado/Provincia</label>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  value={shippingDetails.state}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      state: e.target.value,
                    })
                  }
                  onBlur={validateShippingForm}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Código Postal</label>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  value={shippingDetails.zipCode}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      zipCode: e.target.value,
                    })
                  }
                  onBlur={validateShippingForm}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Teléfono</label>
                <input
                  type="tel"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  value={shippingDetails.phone}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      phone: e.target.value,
                    })
                  }
                  onBlur={validateShippingForm}
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Método de Pago</h3>

            <div className="space-y-2">
              <div
                className={`p-3 border rounded-md cursor-pointer hover:border-blue-500 ${
                  paymentMethod === "tarjeta"
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
                onClick={() => setPaymentMethod("tarjeta")}>
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      paymentMethod === "tarjeta"
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}>
                    {paymentMethod === "tarjeta" && (
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
                  paymentMethod === "efectivo"
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
                onClick={() => setPaymentMethod("efectivo")}>
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      paymentMethod === "efectivo"
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}>
                    {paymentMethod === "efectivo" && (
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <div className="ml-2">Pago en Efectivo al Recibir</div>
                </div>
              </div>
            </div>

            {paymentMethod === "tarjeta" && (
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
                  <label className="text-sm font-medium">
                    Número de Tarjeta
                  </label>
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
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="font-medium">Revisión del Pedido</h3>

            <div className="space-y-4">
              {/* <div className="bg-gray-50 p-4 rounded-md space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-600" />
                    Información Personal
                  </span>
                </div>
                <p>
                  {shippingDetails.firstName} {shippingDetails.lastName}
                </p>
                <p>{shippingDetails.email}</p>
                <p>{shippingDetails.phone}</p>
              </div> */}

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
                {paymentMethod === "tarjeta" ? (
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
      default:
        return null;
    }
  };

  return (
    <>
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700"
        onClick={() => setIsDialogOpen(true)}>
        Confirmar Pedido
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          {!isPedidoConfirmado ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5 text-blue-600" />
                  Checkout
                </DialogTitle>
                <DialogDescription>
                  Complete los siguientes pasos para finalizar su compra
                </DialogDescription>
              </DialogHeader>

              {/* Checkout steps indicator */}
              <div className="flex justify-between mb-6 px-4">
                {steps.map((step, index) => (
                  <div key={step} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index < currentStep
                          ? "bg-blue-600 text-white"
                          : index === currentStep
                          ? "bg-blue-100 border-2 border-blue-600 text-blue-600"
                          : "bg-gray-100 text-gray-400"
                      }`}>
                      {index < currentStep ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs ${
                        index <= currentStep
                          ? "text-blue-600 font-medium"
                          : "text-gray-400"
                      }`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              <div className="py-4">
                {/* Step content */}
                <div className="mb-6">{renderStepContent()}</div>

                {/* Products summary (always visible) */}
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Resumen de Productos</h3>
                  <div className="max-h-[200px] overflow-y-auto">
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-center py-2 border-b">
                        <div className="flex items-center">
                          <div className="font-medium">{item.nombre}</div>
                          <div className="text-sm text-gray-500 ml-2">
                            x{item.quantity}
                          </div>
                        </div>
                        <div className="font-medium">
                          ${FormateoPrecio(item.precio * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Subtotal ({itemCount} productos)
                      </span>
                      <span>${FormateoPrecio(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Impuesto (8%)</span>
                      <span>${FormateoPrecio(tax)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Envío</span>
                      <span>
                        {shippingCost === 0
                          ? "Gratis"
                          : `$${FormateoPrecio(shippingCost)}`}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">
                        ${FormateoPrecio(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-between">
                {currentStep > 0 ? (
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Atrás
                  </Button>
                ) : (
                  <div></div>
                )}

                {currentStep < steps.length - 1 ? (
                  <Button
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                    Continuar <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    disabled={isLoading || cartItems.length === 0}
                    onClick={handleConfirmarPedido}
                    className="bg-blue-600 hover:bg-blue-700">
                    {isLoading ? "Procesando..." : "Completar Compra"}
                  </Button>
                )}
              </DialogFooter>
            </>
          ) : (
            <div className="py-8 flex flex-col items-center justify-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-center">
                ¡Pedido Confirmado!
              </h3>
              <p className="text-gray-600 text-center mt-2">
                Tu pedido ha sido creado exitosamente.
              </p>
              <p className="text-gray-600 text-center mt-1">
                Recibirás un correo electrónico con los detalles de tu compra.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
