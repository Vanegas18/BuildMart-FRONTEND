import { useEffect, useState } from "react";
import { getProveedorById } from "@/core/api/Proveedores/proveedores";
import { getProducts } from "@/core/api/Productos/products";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components";
import { FormateoPrecio } from "@/modules/Dashboard/Layout";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { Badge } from "@/shared/components/ui/badge";
import {
  ShoppingBag,
  User,
  CalendarDays,
  Tag,
  Package2,
  Calculator,
  AlertTriangle,
  DollarSign,
  Hash,
} from "lucide-react";

export const DetalleCompraModal = ({ open, onClose, compra }) => {
  const [proveedor, setProveedor] = useState(null);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (open) {
      const fetchDatosRelacionados = async () => {
        try {
          // Obtener datos del proveedor
          if (typeof compra.proveedor === "string") {
            const proveedorResponse = await getProveedorById(compra.proveedor);
            setProveedor(proveedorResponse.data);
          } else {
            setProveedor(compra.proveedor);
          }

          // Obtener todos los productos y filtrar los necesarios
          const allProductsResponse = await getProducts();
          const allProducts = allProductsResponse.data;

          // Mezclar los datos del producto con los de la compra
          const productosCompletos = compra.productos.map((item) => {
            const productoEncontrado = allProducts.find(
              (producto) =>
                producto._id === (item.producto?._id || item.producto)
            );
            return {
              ...productoEncontrado,
              ...item,
              nombre: productoEncontrado?.nombre || "Producto no encontrado",
              precioCompra:
                item.precioCompra ?? productoEncontrado?.precioCompra ?? 0,
              cantidad: item.cantidad ?? 0,
            };
          });

          setProductos(productosCompletos);
        } catch (error) {
          console.error("Error al obtener los datos relacionados:", error);
        }
      };

      fetchDatosRelacionados();
    }
  }, [open, compra.proveedor, compra.productos]);

  useEffect(() => {
    if (open) {
      console.log("Datos de los productos:", compra.productos);
    }
  }, [open, compra.productos]);

  if (!compra) return null;

  const generateCompraId = (compra) => {
    // Verificar si compraId existe y es válido
    if (compra.compraId !== undefined && compra.compraId !== null) {
      return `COM-${compra.compraId.toString().padStart(3, "0")}`;
    }

    // Fallback: usar los últimos 3 caracteres del _id si compraId no existe
    if (compra._id) {
      const idStr = compra._id.toString();
      const lastThree = idStr.slice(-3);
      return `COM-${lastThree}`;
    }

    // Último fallback: usar un valor por defecto
    return "COM-000";
  };

  // Función para renderizar el estado con ícono
  const renderEstado = (estado) => {
    let badgeClass = "";
    let Icon = null;

    switch (estado) {
      case "Completada":
        badgeClass = "bg-green-100 text-green-800 border-green-200";
        Icon = Calculator;
        break;
      case "Pendiente":
        badgeClass = "bg-yellow-100 text-yellow-800 border-yellow-200";
        Icon = AlertTriangle;
        break;
      case "Cancelada":
        badgeClass = "bg-red-100 text-red-800 border-red-200";
        Icon = AlertTriangle;
        break;
      default:
        badgeClass = "bg-blue-100 text-blue-800 border-blue-200";
        Icon = Tag;
    }

    return (
      <Badge variant="outline" className={`${badgeClass} text-xs sm:text-sm`}>
        <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        {estado}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white mx-auto">
        <DialogHeader className="border-b border-gray-100 pb-3 sm:pb-4">
          <DialogTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl text-gray-900">
            <div className="p-1.5 sm:p-2 bg-blue-50 rounded-full">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-base sm:text-xl">Detalles de la Compra</span>
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            Información completa sobre la compra realizada y los productos
            adquiridos.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 sm:space-y-8 py-4 sm:py-6">
          {/* Información General */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-1 h-5 sm:h-6 bg-gray-600 rounded-full"></div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Información General
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="group">
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                  Proveedor
                </label>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-900 font-medium text-sm sm:text-base break-words">
                    {proveedor?.nombre || "Sin proveedor"}
                  </span>
                </div>
              </div>

              <div className="group">
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                  ID de la Compra
                </label>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    <Hash className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-900 font-medium text-sm sm:text-base break-words">
                    {generateCompraId(compra)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="group">
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                  Fecha de Compra
                </label>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-900 font-medium text-sm sm:text-base">
                    {new Date(compra.fecha).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="group">
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                  Estado
                </label>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  {renderEstado(compra.estado)}
                </div>
              </div>
            </div>
          </div>

          {/* Productos */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-1 h-5 sm:h-6 bg-gray-600 rounded-full"></div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Productos Comprados
              </h3>
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
              Lista de productos incluidos en esta compra.
            </div>

            {/* Vista de tabla para pantallas grandes */}
            <div className="hidden lg:block">
              <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto border rounded-xl shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="text-left p-3 sm:p-4 font-medium text-gray-700">
                        Producto
                      </th>
                      <th className="text-left p-3 sm:p-4 font-medium text-gray-700">
                        Precio Compra
                      </th>
                      <th className="text-left p-3 sm:p-4 font-medium text-gray-700">
                        Precio Venta
                      </th>
                      <th className="text-left p-3 sm:p-4 font-medium text-gray-700">
                        Cantidad
                      </th>
                      <th className="text-right p-3 sm:p-4 font-medium text-gray-700">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {!productos.length && (
                      <tr>
                        <td
                          colSpan={5}
                          className="p-4 sm:p-6 text-center text-gray-500 italic">
                          No hay productos en esta compra
                        </td>
                      </tr>
                    )}

                    {productos.map((producto, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="p-3 sm:p-4 text-gray-800 font-medium">
                          {producto.nombre || "Producto desconocido"}
                        </td>
                        <td className="p-3 sm:p-4 text-gray-800">
                          ${FormateoPrecio(producto.precioCompra)}
                        </td>
                        <td className="p-3 sm:p-4 text-gray-800">
                          ${FormateoPrecio(producto.precio)}
                        </td>
                        <td className="p-3 sm:p-4 text-gray-800">
                          {producto.cantidad}
                        </td>
                        <td className="p-3 sm:p-4 text-right text-gray-800 font-medium">
                          $
                          {FormateoPrecio(
                            (producto.precioCompra || 0) * producto.cantidad
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Vista de cards para pantallas pequeñas y medianas */}
            <div className="lg:hidden space-y-3 sm:space-y-4">
              {!productos.length && (
                <div className="p-4 sm:p-6 text-center text-gray-500 italic bg-gray-50 rounded-xl border border-gray-100">
                  No hay productos en esta compra
                </div>
              )}

              {productos.map((producto, index) => (
                <div key={index} className="group">
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 space-y-3">
                    {/* Nombre del producto */}
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0 mt-0.5">
                        <Package2 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm sm:text-base break-words">
                          {producto.nombre || "Producto desconocido"}
                        </h4>
                      </div>
                    </div>

                    {/* Grid de información */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <label className="text-gray-500 font-medium block mb-1">
                          Precio Compra
                        </label>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <DollarSign className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <span className="text-gray-900 font-medium">
                            ${FormateoPrecio(producto.precioCompra)}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="text-gray-500 font-medium block mb-1">
                          Precio Venta
                        </label>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <DollarSign className="w-3 h-3 text-blue-600 flex-shrink-0" />
                          <span className="text-gray-900 font-medium">
                            ${FormateoPrecio(producto.precio)}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="text-gray-500 font-medium block mb-1">
                          Cantidad
                        </label>
                        <span className="text-gray-900 font-medium">
                          {producto.cantidad}
                        </span>
                      </div>

                      <div>
                        <label className="text-gray-500 font-medium block mb-1">
                          Subtotal
                        </label>
                        <span className="text-gray-900 font-semibold">
                          $
                          {FormateoPrecio(
                            (producto.precioCompra || 0) * producto.cantidad
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-end mt-4 sm:mt-6">
              <div className="w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-50 to-green-50 p-3 sm:p-4 rounded-xl border border-blue-100 hover:border-blue-200 transition-all duration-200">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                      <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700 font-medium text-sm sm:text-base">
                      Total de la Compra:
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-white border-blue-200 text-blue-700 text-sm sm:text-lg font-semibold px-3 sm:px-4 py-1.5 sm:py-2 w-fit">
                    ${FormateoPrecio(compra.total)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-gray-100 pt-3 sm:pt-4">
          <Button
            onClick={() => onClose(false)}
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 px-4 sm:px-6 w-full sm:w-auto text-sm sm:text-base">
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
