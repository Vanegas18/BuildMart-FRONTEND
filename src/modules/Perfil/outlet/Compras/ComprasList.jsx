import { Button } from "@/shared/components/ui";
import { Package } from "lucide-react";
import { memo } from "react";
import { NavLink } from "react-router";

// Componente para cada producto individual dentro de una compra
const ProductoItem = memo(({ producto }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
          <Package className="h-6 w-6 text-gray-500" />
        </div>
        <div>
          <p className="font-medium">{producto.productoId.nombre}</p>
          <p className="text-sm text-gray-500">
            Cantidad: {producto.cantidad} {" · "}
            Precio: ${producto.productoId.precio.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">
          ${(producto.cantidad * producto.productoId.precio).toLocaleString()}
        </p>
      </div>
    </div>
  );
});

// Componente individual de compra memorizado para evitar re-renders innecesarios
const CompraItem = memo(({ purchase }) => {
  // Formateamos la fecha para mostrarla
  const fechaFormateada = new Date(purchase.fecha).toLocaleDateString();

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm">
      <div className="border-b pb-3 mb-3">
        <div className="flex justify-between">
          <div>
            <p className="text-lg font-medium">Compra {purchase.ventaId}</p>
            <p className="text-sm text-gray-500">Fecha: {fechaFormateada}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">
              Total: ${purchase.total.toLocaleString()}
            </p>
            <p className="text-sm font-medium text-gray-700">
              Estado:{" "}
              <span
                className={`${
                  purchase.estado === "Completada"
                    ? "text-green-500"
                    : purchase.estado === "Cancelada"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}>
                {purchase.estado}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="space-y-3">
        {purchase.productos.map((producto) => (
          <ProductoItem key={producto._id} producto={producto} />
        ))}
      </div>

      {/* Acciones */}
      <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
        <NavLink to={"/catalogo"}>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Comprar de Nuevo
          </Button>
        </NavLink>
      </div>
    </div>
  );
});

// Memorizamos todo el componente ComprasList
export const ComprasList = memo(({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((purchase) => (
        <CompraItem key={purchase._id} purchase={purchase} />
      ))}
    </div>
  );
});
