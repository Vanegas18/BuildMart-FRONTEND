import { Button } from "@/shared/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { ShoppingCart, ArrowLeft, ArrowRight } from "lucide-react";
import { useCheckout } from "./hooks/useCheckout";
import { CheckoutSteps } from "./components/CheckoutSteps";
import { ShippingStep } from "./components/ShippingStep";
import { PaymentStep } from "./components/PaymentStep";
import { ReviewStep } from "./components/ReviewStep";
import { OrderSummary } from "./components/OrderSummary";
import { SuccessConfirmation } from "./components/SuccessConfirmation";
import { useAuth } from "@/core/context";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export const ConfirmarPedido = () => {
  const {
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
    steps,
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
  } = useCheckout();

  // Efecto para verificar si es admin
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, isAuthenticated, logout, checkAuthStatus, loading } = useAuth();

  useEffect(() => {
    const verifyAdmin = async () => {
      if (isAuthenticated && (!user || !user.rol)) {
        await checkAuthStatus();
      }
      setIsAdmin(user?.rol === "67cb9a4fa5866273d8830fad");
    };

    verifyAdmin();
  }, [user, isAuthenticated, checkAuthStatus]);

  // Renderizar paso actual según currentStep
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ShippingStep
            shippingDetails={shippingDetails}
            setShippingDetails={setShippingDetails}
            validateShippingForm={validateShippingForm}
            direccionesGuardadas={direccionesGuardadas}
            direccionSeleccionada={direccionSeleccionada}
            handleSeleccionarDireccion={handleSeleccionarDireccion}
            creandoNuevaDireccion={creandoNuevaDireccion}
            handleNuevaDireccion={handleNuevaDireccion}
          />
        );
      case 1:
        return (
          <PaymentStep
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            paymentDetails={paymentDetails}
            setPaymentDetails={setPaymentDetails}
            validatePaymentForm={validatePaymentForm}
            metodosGuardados={metodosGuardados}
            metodoPagoSeleccionado={metodoPagoSeleccionado}
            handleSeleccionarMetodoPago={handleSeleccionarMetodoPago}
            creandoNuevoPago={creandoNuevoPago}
            handleNuevoPago={handleNuevoPago}
          />
        );
      case 2:
        return (
          <ReviewStep
            shippingDetails={shippingDetails}
            paymentMethod={paymentMethod}
            paymentDetails={paymentDetails}
            direccionSeleccionada={direccionSeleccionada}
            metodoPagoSeleccionado={metodoPagoSeleccionado}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Button
        className="mb-5 w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
        onClick={() => {
          // Verificar si el usuario está autenticado
          if (!isAuthenticated) {
            // Mostrar toast de iniciar sesión
            toast.error("Inicia sesión para continuar con tu compra.");
            return;
          }
          if (isAdmin) {
            // Mostrar toast de iniciar sesión
            toast.error(
              "Comprar como admin no está permitido realizar pedidos, ingresa como cliente."
            );
            return;
          }
          setIsDialogOpen(true);
        }}>
        Confirmar Pedido
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[95vw] max-w-4xl h-[95vh] max-h-[95vh] p-0 gap-0 flex flex-col">
          {!isPedidoConfirmado ? (
            <>
              <DialogHeader className="px-4 sm:px-6 py-4 border-b bg-white">
                <DialogTitle className="text-lg sm:text-xl font-bold flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5 text-blue-600" />
                  Checkout
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base">
                  Complete los siguientes pasos para finalizar su compra
                </DialogDescription>
              </DialogHeader>

              {/* Indicador de pasos del checkout */}
              <div className="px-4 sm:px-6 py-3 bg-gray-50 border-b">
                <CheckoutSteps steps={steps} currentStep={currentStep} />
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-6">
                  {/* Layout responsive: stack en móvil, side-by-side en desktop */}
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Contenido del paso actual */}
                    <div className="flex-1 lg:w-2/3">
                      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                        {renderStepContent()}
                      </div>
                    </div>

                    {/* Resumen de productos */}
                    <div className="lg:w-1/3">
                      <OrderSummary
                        cartItems={cartItems}
                        subtotal={subtotal}
                        tax={tax}
                        shippingCost={shippingCost}
                        total={total}
                        itemCount={itemCount}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="px-4 sm:px-6 py-4 border-t bg-white mt-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 w-full">
                  {currentStep > 0 ? (
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      className="flex items-center gap-2 w-full sm:w-auto order-2 sm:order-1">
                      <ArrowLeft className="h-4 w-4" /> Atrás
                    </Button>
                  ) : (
                    <div className="hidden sm:block"></div>
                  )}

                  {currentStep < steps.length - 1 ? (
                    <Button
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
                      Continuar <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      disabled={isLoading || cartItems.length === 0}
                      onClick={handleConfirmarPedido}
                      className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto order-1 sm:order-2">
                      {isLoading ? "Procesando..." : "Completar Compra"}
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
              <SuccessConfirmation />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
