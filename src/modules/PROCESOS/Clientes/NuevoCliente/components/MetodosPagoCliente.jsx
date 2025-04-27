// src/modules/PROCESOS/Clientes/NuevoCliente/components/MetodosPagoCliente.jsx
import { useState } from "react";
import { CreditCard, Trash2, Plus } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Checkbox } from "@/shared/components/ui/checkbox";

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
              <div key={index} className="p-4 border rounded-md relative">
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemovePayment(index)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`metodosPago.${index}.tipo`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Pago</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {paymentTypes.map((tipo) => (
                              <SelectItem key={tipo} value={tipo}>
                                {tipo}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {(form.watch(`metodosPago.${index}.tipo`) ===
                    "Tarjeta de Crédito" ||
                    form.watch(`metodosPago.${index}.tipo`) ===
                      "Tarjeta de Débito") && (
                    <>
                      <FormField
                        control={form.control}
                        name={`metodosPago.${index}.titular`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Titular</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Juan Pérez"
                                aria-label="H"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`metodosPago.${index}.numeroTarjeta`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número de Tarjeta</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="1234567890123456"
                                value={field.value || ""}
                                onChange={(e) => {
                                  // Permitir solo dígitos y limitar a 16
                                  const onlyDigits = e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 16);
                                  field.onChange(onlyDigits);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`metodosPago.${index}.fechaExpiracion`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fecha de Expiración</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="MM/YY"
                                aria-label="H"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <FormField
                    control={form.control}
                    name={`metodosPago.${index}.esPrincipal`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={() => handleSetMainPayment(index)}
                            disabled={field.value}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Método Principal
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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
