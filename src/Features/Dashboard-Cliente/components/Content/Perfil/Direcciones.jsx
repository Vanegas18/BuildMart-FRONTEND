import { Button } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const Direcciones = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Direcciones</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border p-4"> 
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge>Principal</Badge>
              <h3 className="font-medium">Casa</h3>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                Editar
              </Button>
              <Button variant="ghost" size="sm" className="text-red-500">
                Eliminar
              </Button>
            </div>
          </div>
          <div className="mt-2 text-sm">
            <p>Calle Principal 123</p>
            <p>28001 Madrid, España</p>
            <p>+34 612 345 678</p>
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Oficina</h3>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                Editar
              </Button>
              <Button variant="ghost" size="sm" className="text-red-500">
                Eliminar
              </Button>
            </div>
          </div>
          <div className="mt-2 text-sm">
            <p>Avenida Comercial 45, Piso 3</p>
            <p>28002 Madrid, España</p>
            <p>+34 912 345 678</p>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          <MapPin className="mr-2 h-4 w-4" />
          Añadir Nueva Dirección
        </Button>
      </CardContent>
    </Card>
  );
};
