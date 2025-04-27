import { Trash2 } from "lucide-react";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export const FormularioMetodoPago = ({
  index,
  form,
  onRemove,
  onSetAsMain,
  paymentTypes,
}) => {
  return (
    <div className="p-4 border rounded-md relative">
      <div className="absolute top-2 right-2 flex space-x-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onRemove(index)}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        {(form.watch(`metodosPago.${index}.tipo`) === "Tarjeta de Crédito" ||
          form.watch(`metodosPago.${index}.tipo`) === "Tarjeta de Débito") && (
          <>
            <FormField
              control={form.control}
              name={`metodosPago.${index}.titular`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titular</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Juan Pérez" aria-label="H" />
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
                      aria-label="H"
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
                    <Input {...field} placeholder="MM/YY" aria-label="H" />
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
                  onCheckedChange={() => onSetAsMain(index)}
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
  );
};
