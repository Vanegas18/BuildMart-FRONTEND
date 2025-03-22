import { Button } from "@/shared/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { CreditCard } from "lucide-react";

export const Pagos = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Métodos de Pago</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-medium">Visa terminada en 4589</h3>
                <p className="text-sm text-gray-500">Expira: 05/25</p>
              </div>
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
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-purple-600" />
              <div>
                <h3 className="font-medium">Mastercard terminada en 1234</h3>
                <p className="text-sm text-gray-500">Expira: 08/24</p>
              </div>
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
        </div>
        <Button variant="outline" className="w-full">
          <CreditCard className="mr-2 h-4 w-4" />
          Añadir Nuevo Método de Pago
        </Button>
      </CardContent>
    </Card>
  );
};
