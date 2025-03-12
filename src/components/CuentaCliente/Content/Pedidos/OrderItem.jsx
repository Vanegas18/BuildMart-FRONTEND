import { Package } from "lucide-react";

export const OrderItem = ({ item }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
          <Package className="h-6 w-6 text-gray-500" />
        </div>
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
        </div>
      </div>
      <p className="font-medium">{item.price}</p>
    </div>
  );
};
