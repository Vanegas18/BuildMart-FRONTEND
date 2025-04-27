import { useCatProveedores } from "@/core/context/CatProveedores/CatProveedoresContext";
import { useState, useEffect } from "react";
import { proveedorSchema } from "./proveedorSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useProveedores } from "@/core/context/Proveedores";

export const useNuevoProveedor = ({ onProveedorCreado }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCategorias, setLoadingCategorias] = useState(false);

  const { crearProveedor } = useProveedores();
  const { cateProveedores, obtenerCatProveedores } = useCatProveedores();

  const form = useForm({
    resolver: zodResolver(proveedorSchema),
    defaultValues: {
      nit: "",
      nombre: "",
      direccion: "",
      telefono: "",
      correo: "",
      categoriaProveedorId: "",
    },
    mode: "onChange", // Validación mientras el usuario escribe
  });

  // Resetear formulario cuando se abre/cierra el modal
  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open, form]);

  // Cargar categorías
  useEffect(() => {
    if (open && cateProveedores.length === 0) {
      setLoadingCategorias(true);
      obtenerCatProveedores()
        .catch((error) => {
          console.error("Error cargando categorías:", error);
          toast.error("Error al cargar categorías");
        })
        .finally(() => setLoadingCategorias(false));
    }
  }, [open, cateProveedores.length, obtenerCatProveedores]);

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);

      if (!data.categoriaProveedorId) {
        throw new Error("Seleccione una categoría");
      }

      await crearProveedor(data);

      // Cerrar modal y resetear
      setOpen(false);
      form.reset();

      // Ejecutar callback si existe
      onProveedorCreado?.();

      toast.success("Proveedor creado", {});
    } catch (error) {
      console.error(error);
      toast.error("Error al crear", {
        description:
          error.response?.data?.error || "Intente nuevamente más tarde",
      });
    } finally {
      setLoading(false);
    }
  });

  return {
    open,
    setOpen,
    loading,
    form,
    onSubmit,
    categorias: cateProveedores,
    loadingCategorias,
  };
};
