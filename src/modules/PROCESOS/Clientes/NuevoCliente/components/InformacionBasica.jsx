import { User, Mail, Phone } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent } from "@/shared/components/ui/card";

export const InformacionBasica = ({ form }) => {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="cedula"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center text-gray-700">
                  <User className="mr-2 h-4 w-4 text-gray-600" />
                  Cedula del Cliente
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="10135647"
                    {...field}
                    autoFocus
                    aria-label="cedula"
                    maxLength={10}
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                    onChange={(e) => {
                      // Permitir solo números
                      const onlyNums = e.target.value.replace(/\D/g, "");
                      field.onChange(onlyNums);
                    }}
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Cedula completa del cliente
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center text-gray-700">
                  <User className="mr-2 h-4 w-4 text-gray-600" />
                  Nombre del Cliente
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Juan Pérez"
                    {...field}
                    aria-label="nombre"
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Nombre completo del cliente o empresa
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="correo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center text-gray-700">
                  <Mail className="mr-2 h-4 w-4 text-gray-600" />
                  Correo Electrónico
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    maxLength={100}
                    {...field}
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Dirección de correo electrónico principal para contacto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contraseña"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center text-gray-700">
                  <Mail className="mr-2 h-4 w-4 text-gray-600" />
                  Contraseña
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Contraseña246,"
                    {...field}
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Contraseña con la estructura requerida
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center text-gray-700">
                  <Phone className="mr-2 h-4 w-4 text-gray-600" />
                  Teléfono
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="123456789"
                    {...field}
                    maxLength={10}
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                    onChange={(e) => {
                      // Permitir solo números
                      const onlyNums = e.target.value.replace(/\D/g, "");
                      field.onChange(onlyNums);
                    }}
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Número telefónico principal para contacto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
