import { Check } from "lucide-react";

export const CheckoutSteps = ({ steps, currentStep }) => {
  return (
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
            {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
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
  );
};
