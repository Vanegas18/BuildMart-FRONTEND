import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { compraSchema } from "./validationCompra";
import { useProveedores } from "@/core/context/Proveedores/ProveedoresContext";
import { useProductos } from "@/core/context/Productos/ProductosContext";
import { useCompras } from "@/core/context/Compras/ComprasContext";

export const useNuevaCompra = (onCompraCreada) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { crearCompra } = useCompras();
  const { proveedores, obtenerProveedores } = useProveedores();
  const { productos, obtenerProductos } = useProductos();

  // Obtener proveedores y productos al montar
  useEffect(() => {
    obtenerProveedores();
    obtenerProductos();
  }, [obtenerProveedores, obtenerProductos]);

  // Formulario con validaciones usando Zod
  const form = useForm({
    resolver: zodResolver(compraSchema),
    defaultValues: {
      proveedorId: "",
      fecha: "",
      productos: [
        {
          productoId: "",
          cantidad: 1,
          precioCompra: 0,
          precioVenta: 0,
        },
      ],
    },
    mode: "onChange",
  });

  // Formatear los datos antes de enviarlos a la API
  const formatDataForAPI = (data) => {
    console.log(
      "Datos del formulario antes de formatear:",
      JSON.stringify(data, null, 2)
    );

    // Usamos el valor de los productos directamente del formulario
    const productos = form.getValues("productos");
    console.log(
      "Productos desde getValues:",
      JSON.stringify(productos, null, 2)
    );

    const formattedData = {
      proveedor: data.proveedorId,
      fecha: new Date(data.fecha),
      productos: productos.map((producto) => {
        // Asegurarnos de que los precios son números
        const precioCompra = Number(producto.precioCompra || 0);
        const precioVenta = Number(producto.precioVenta || 0);

        return {
          producto: producto.productoId,
          cantidad: producto.cantidad,
          precioCompra: precioCompra,
          precio: precioVenta, // "precio" es el nombre en el backend
        };
      }),
      estado: "Pendiente",
    };

    console.log(
      "Datos formateados para enviar a la API:",
      JSON.stringify(formattedData, null, 2)
    );
    return formattedData;
  };

  // Función de submit
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);
      const formattedData = formatDataForAPI(data);
      await crearCompra(formattedData);
      toast.success("Compra creada exitosamente");
      setOpen(false);
      form.reset();
      onCompraCreada?.();
    } catch (error) {
      toast.error("Error al crear la compra", {
        description: error.response?.data?.message || "Inténtalo nuevamente",
      });
    } finally {
      setLoading(false);
    }
  });

  // Filtrar solo proveedores activos
  const proveedoresActivos = proveedores.filter(
    (proveedor) => proveedor.estado === "Activo"
  );

  return {
    open,
    setOpen,
    loading,
    form,
    onSubmit,
    proveedores: proveedoresActivos,
    productos,
  };
};
