// src/modules/PROCESOS/Clientes/NuevoCliente/components/DireccionesCliente.jsx
import { useState } from "react";
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
import { Checkbox } from "@/shared/components/ui/checkbox";

export const DireccionesCliente = ({ form }) => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const addressTypes = ["Casa", "Trabajo", "Otro"];
  const watchDirecciones = form.watch("direcciones") || [];

  const handleAddAddress = () => {
    const currentDirecciones = form.getValues("direcciones") || [];
    form.setValue("direcciones", [
      ...currentDirecciones,
      {
        tipo: "Casa",
        calle: "",
        ciudad: "",
        departamento: "",
        codigoPostal: "",
        esPrincipal: currentDirecciones.length === 0, // Primera dirección como principal
      },
    ]);
    setShowAddAddress(true);
  };

  const handleRemoveAddress = (index) => {
    const currentDirecciones = [...form.getValues("direcciones")];
    const isRemovingPrincipal = currentDirecciones[index].esPrincipal;

    currentDirecciones.splice(index, 1);

    // Si eliminamos la dirección principal y hay más direcciones,
    // establecer la primera como principal
    if (isRemovingPrincipal && currentDirecciones.length > 0) {
      currentDirecciones[0].esPrincipal = true;
    }

    form.setValue("direcciones", currentDirecciones);
  };

  const handleSetMainAddress = (index) => {
    const currentDirecciones = [...form.getValues("direcciones")];

    currentDirecciones.forEach((dir, i) => {
      dir.esPrincipal = i === index;
    });

    form.setValue("direcciones", currentDirecciones);
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center text-gray-800">
          <MapPin className="mr-2 h-5 w-5" />
          Direcciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        {watchDirecciones.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No hay direcciones registradas
          </div>
        ) : (
          <div className="space-y-6">
            {watchDirecciones.map((_, index) => (
              <div key={index} className="p-4 border rounded-md relative">
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveAddress(index)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`direcciones.${index}.tipo`}
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
                    name={`direcciones.${index}.calle`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Calle</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Av. Principal #123"
                            aria-label="H"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`direcciones.${index}.ciudad`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Bogotá"
                            aria-label="H"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`direcciones.${index}.departamento`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departamento</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Cundinamarca"
                            aria-label="H"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`direcciones.${index}.codigoPostal`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código Postal</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="110111"
                            aria-label="H"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`direcciones.${index}.esPrincipal`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={() => handleSetMainAddress(index)}
                            disabled={field.value}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Dirección Principal
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
          onClick={handleAddAddress}
          className="mt-4 border-dashed border-gray-300">
          <Plus className="mr-2 h-4 w-4" />
          Añadir Dirección
        </Button>
      </CardContent>
    </Card>
  );
};
