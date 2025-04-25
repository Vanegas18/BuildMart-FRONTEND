import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Package } from "lucide-react";
import { memo } from "react";

// Memorizamos el componente para evitar re-renders innecesarios
export const OrderItem = memo(({ item }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
          <Package className="h-6 w-6 text-gray-500" />
        </div>
        <div>
          <p className="font-medium">{item.productoId.nombre}</p>
          <p className="text-sm text-gray-500">Cantidad: {item.cantidad}</p>
        </div>
      </div>
      <p className="font-medium">${FormateoPrecio(item.productoId.precio)}</p>
    </div>
  );
});
