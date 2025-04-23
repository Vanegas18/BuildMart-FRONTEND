import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Separator } from "@/shared/components/ui/separator";

export const OrderSummary = ({
  cartItems,
  subtotal,
  tax,
  shippingCost,
  total,
  itemCount,
}) => {
  return (
    <div className="mt-6">
      <h3 className="font-medium mb-3">Resumen de Productos</h3>
      <div className="max-h-[200px] overflow-y-auto">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center py-2 border-b">
            <div className="flex items-center">
              <div className="font-medium">{item.nombre}</div>
              <div className="text-sm text-gray-500 ml-2">x{item.quantity}</div>
            </div>
            <div className="font-medium">
              ${FormateoPrecio(item.precio * item.quantity)}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Subtotal ({itemCount} productos)
          </span>
          <span>${FormateoPrecio(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Impuesto (8%)</span>
          <span>${FormateoPrecio(tax)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Envío</span>
          <span>
            {shippingCost === 0 ? "Gratis" : `$${FormateoPrecio(shippingCost)}`}
          </span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span className="text-blue-600">${FormateoPrecio(total)}</span>
        </div>
      </div>
    </div>
  );
};
