import { Button } from "@/shared/components/ui";
import { Package } from "lucide-react";
import { memo } from "react";

// Componente individual de compra memorizado para evitar re-renders innecesarios
const CompraItem = memo(({ purchase }) => (
  <div className="flex items-center justify-between border-b pb-4">
    <div className="flex items-center gap-3">
      <div className="h-16 w-16 rounded bg-gray-100 flex items-center justify-center">
        <Package className="h-8 w-8 text-gray-500" />
      </div>
      <div>
        <p className="font-medium">{purchase.name}</p>
        <div className="flex gap-4 text-sm text-gray-500">
          <p>Comprado: {purchase.date}</p>
          <p>Pedido: {purchase.order}</p>
        </div>
        <div className="flex gap-4 text-sm text-gray-500">
          <p>Cantidad: {purchase.quantity}</p>
          <p>Garantía: {purchase.warranty}</p>
        </div>
      </div>
    </div>
    <div className="text-right">
      <p className="font-medium">{purchase.total}</p>
      <div className="flex gap-2 mt-2 justify-end">
        <Button variant="outline" size="sm">
          Ver Detalles
        </Button>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          Comprar de Nuevo
        </Button>
      </div>
    </div>
  </div>
));

// Memorizamos todo el componente ComprasList
export const ComprasList = memo(({ data }) => {
  return data.map((purchase) => (
    // Usamos el ID de la compra o algún identificador único como key en lugar del índice
    <CompraItem key={purchase.order} purchase={purchase} />
  ));
});
