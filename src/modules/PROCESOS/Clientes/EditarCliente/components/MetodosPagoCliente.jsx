import { useState } from "react";
import { CreditCard, Plus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components";
import { FormularioMetodoPago } from "./FormularioMetodoPago";

export const MetodosPagoCliente = ({ form }) => {
  const [showAddPayment, setShowAddPayment] = useState(false);
  const paymentTypes = [
    "Tarjeta de Crédito",
    "Tarjeta de Débito",
    "PSE",
    "Efectivo",
    "Otro",
  ];
  const watchMetodosPago = form.watch("metodosPago") || [];

  const handleAddPayment = () => {
    const currentMetodos = form.getValues("metodosPago") || [];
    form.setValue("metodosPago", [
      ...currentMetodos,
      {
        tipo: "Tarjeta de Crédito",
        titular: "",
        numeroTarjeta: "",
        fechaExpiracion: "",
        esPrincipal: currentMetodos.length === 0, // Primer método como principal
      },
    ]);
    setShowAddPayment(true);
  };

  const handleRemovePayment = (index) => {
    const currentMetodos = [...form.getValues("metodosPago")];
    const isRemovingPrincipal = currentMetodos[index].esPrincipal;

    currentMetodos.splice(index, 1);

    // Si eliminamos el método principal y hay más métodos,
    // establecer el primero como principal
    if (isRemovingPrincipal && currentMetodos.length > 0) {
      currentMetodos[0].esPrincipal = true;
    }

    form.setValue("metodosPago", currentMetodos);
  };

  const handleSetMainPayment = (index) => {
    const currentMetodos = [...form.getValues("metodosPago")];

    currentMetodos.forEach((metodo, i) => {
      metodo.esPrincipal = i === index;
    });

    form.setValue("metodosPago", currentMetodos);
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center text-gray-800">
          <CreditCard className="mr-2 h-5 w-5" />
          Métodos de Pago
        </CardTitle>
      </CardHeader>
      <CardContent>
        {watchMetodosPago.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No hay métodos de pago registrados
          </div>
        ) : (
          <div className="space-y-6">
            {watchMetodosPago.map((_, index) => (
              <FormularioMetodoPago
                key={index}
                index={index}
                form={form}
                onRemove={handleRemovePayment}
                onSetAsMain={handleSetMainPayment}
                paymentTypes={paymentTypes}
              />
            ))}
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={handleAddPayment}
          className="mt-4 border-dashed border-gray-300">
          <Plus className="mr-2 h-4 w-4" />
          Añadir Método de Pago
        </Button>
      </CardContent>
    </Card>
  );
};
