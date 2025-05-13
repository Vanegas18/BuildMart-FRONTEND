// src/modules/PROCESOS/Clientes/NuevoCliente/components/DireccionesCliente.jsx
import { MapPin, Trash2, Plus } from "lucide-react";
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

export const DireccionesCliente = ({ form }) => {
  const addressTypes = ["Casa", "Trabajo", "Otro"];
  const watchDirecciones = form.watch("direcciones") || [];

  const handleAddAddress = () => {
    form.setValue("direcciones", [
      {
        tipo: "Casa",
        calle: "",
        ciudad: "",
        departamento: "",
        codigoPostal: "",
        esPrincipal: true,
      },
    ]);
  };

  const handleRemoveAddress = () => {
    form.setValue("direcciones", []);
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center text-gray-800">
          <MapPin className="mr-2 h-5 w-5" />
          Dirección
        </CardTitle>
      </CardHeader>
      <CardContent>
        {watchDirecciones.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No hay dirección registrada
          </div>
        ) : (
          <div className="p-4 border rounded-md relative">
            <div className="absolute top-2 right-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveAddress}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`direcciones.0.tipo`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Dirección</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {addressTypes.map((tipo) => (
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

              <FormField
                control={form.control}
                name={`direcciones.0.calle`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calle</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Av. Principal #123" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`direcciones.0.ciudad`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Bogotá" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`direcciones.0.departamento`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Cundinamarca" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {watchDirecciones.length === 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleAddAddress}
            className="mt-4 border-dashed border-gray-300">
            <Plus className="mr-2 h-4 w-4" />
            Añadir Dirección
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
