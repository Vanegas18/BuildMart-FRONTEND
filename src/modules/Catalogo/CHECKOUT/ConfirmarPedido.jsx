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

  const { isAuthenticated } = useAuth();

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
        className="w-full bg-blue-600 hover:bg-blue-700"
        onClick={() => {
          if (!isAuthenticated) {
            // Mostrar toast de iniciar sesión
            toast.error("Por favor, inicie sesión para confirmar su pedido.");
            return;
          }
          setIsDialogOpen(true);
        }}>
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

              {/* Indicador de pasos del checkout */}
              <CheckoutSteps steps={steps} currentStep={currentStep} />

              <div className="py-4">
                {/* Contenido del paso actual */}
                <div className="mb-6">{renderStepContent()}</div>

                {/* Resumen de productos (siempre visible) */}
                <OrderSummary
                  cartItems={cartItems}
                  subtotal={subtotal}
                  tax={tax}
                  shippingCost={shippingCost}
                  total={total}
                  itemCount={itemCount}
                />
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
            <SuccessConfirmation />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
