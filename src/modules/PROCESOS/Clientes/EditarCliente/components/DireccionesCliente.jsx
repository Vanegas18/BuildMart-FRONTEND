import { useState } from "react";
import { MapPin, Plus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components";
import { FormularioDireccion } from "./FormularioDireccion";

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
              <FormularioDireccion
                key={index}
                index={index}
                form={form}
                onRemove={handleRemoveAddress}
                onSetAsMain={handleSetMainAddress}
                addressTypes={addressTypes}
              />
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
