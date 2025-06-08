import { Check } from "lucide-react";

export const CheckoutSteps = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center px-2 sm:px-4">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center relative flex-1">
          {/* Línea conectora - solo mostrar si no es el último paso */}
          {index < steps.length - 1 && (
            <div
              className={`absolute top-4 left-1/2 transform translate-x-1/2 w-full h-0.5 hidden sm:block ${
                index < currentStep ? "bg-blue-600" : "bg-gray-200"
              }`}
              style={{
                width: "calc(100% - 2rem)",
                left: "calc(50% + 1rem)",
              }}
            />
          )}

          {/* Círculo del paso */}
          <div
            className={`relative w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium z-10 ${
              index < currentStep
                ? "bg-blue-600 text-white"
                : index === currentStep
                ? "bg-blue-100 border-2 border-blue-600 text-blue-600"
                : "bg-gray-100 text-gray-400"
            }`}>
            {index < currentStep ? (
              <Check className="h-3 w-3 sm:h-4 sm:w-4" />
            ) : (
              index + 1
            )}
          </div>

          {/* Texto del paso */}
          <span
            className={`mt-2 text-xs sm:text-sm text-center px-1 ${
              index <= currentStep
                ? "text-blue-600 font-medium"
                : "text-gray-400"
            }`}>
            {/* En móvil mostrar versión corta, en desktop versión completa */}
            <span className="sm:hidden">
              {step === "Dirección"
                ? "Dir."
                : step === "Método de Pago"
                ? "Pago"
                : step === "Confirmación"
                ? "Conf."
                : step}
            </span>
            <span className="hidden sm:inline">{step}</span>
          </span>
        </div>
      ))}
    </div>
  );
};
