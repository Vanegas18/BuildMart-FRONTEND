import { Button } from "@/shared/components/ui";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle2, Package, XCircle } from "lucide-react";
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
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm">
      <div className="border-b pb-3 mb-3">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center">
              <Package className="h-4 w-4 text-blue-600 mr-1" />
              <p className="font-medium">
                COM-{purchase.ventaId.toString().padStart(3, "0")}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Realizado el{" "}
              {new Date(purchase.fecha).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="text-right">
            <div>
              <Badge
                className={
                  purchase.estado === "Completada"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : purchase.estado === "Cancelada"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    : "bg-red-100 text-red-800 hover:bg-red-100"
                }>
                {purchase.estado === "Completada" ? (
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                ) : (
                  <XCircle className="mr-1 h-3 w-3" />
                )}
                {purchase.estado === "Completada"
                  ? "Pagado"
                  : purchase.estado === "Cancelada"
                  ? "Cancelada"
                  : "Pendiente"}
              </Badge>
            </div>
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
      <div className="border-t pt-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">
            Total: ${purchase.total.toLocaleString()}
          </div>
          <div className="flex gap-2">
            <NavLink to={"/catalogo"}>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Comprar de Nuevo
              </Button>
            </NavLink>
          </div>
        </div>
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
