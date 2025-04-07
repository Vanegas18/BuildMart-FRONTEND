import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { proveedorSchema } from "../NuevoProveedor/proveedorSchema";
import { useCatProveedores } from "@/core/context/CatProveedores/CatProveedoresContext";
import { useProveedores } from "@/core/context/Proveedores";

export const useEditarProveedor = (proveedor, onProveedorEditado) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCategorias, setLoadingCategorias] = useState(false);
  const { actualizarProveedor } = useProveedores();
  
  const { cateProveedores, obtenerCatProveedores } = useCatProveedores();

  const form = useForm({
    resolver: zodResolver(proveedorSchema),
    defaultValues: {
      proveedorId: "",
      nit: "",
      nombre: "",
      direccion: "",
      telefono: "",
      correo: "",
      categoriaProveedorId: "",
      estado: "Activo"
    },
  });

  // Cargar categorías cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      setLoadingCategorias(true);
      obtenerCatProveedores()
        .catch(error => {
          console.error("Error cargando categorías:", error);
          toast.error("Error al cargar categorías");
        })
        .finally(() => setLoadingCategorias(false));
    }
  }, [open, obtenerCatProveedores]);

  // Cargar datos del proveedor cuando se abre o cambia el proveedor
  useEffect(() => {
    if (open && proveedor) {
      const categoriaId = proveedor.categoriaProveedorId?._id || 
                        proveedor.categoriaProveedorId || 
                        "";

      form.reset({
        proveedorId: proveedor.proveedorId,
        nit: proveedor.nit,
        nombre: proveedor.nombre,
        direccion: proveedor.direccion,
        telefono: proveedor.telefono,
        correo: proveedor.correo,
        categoriaProveedorId: categoriaId,
        estado: proveedor.estado || "Activo"
      });
    }
  }, [open, proveedor, form]);

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);
      
      const datosActualizados = {
        ...data,
        _id: proveedor._id,
        proveedorId: proveedor.proveedorId
      };

      await actualizarProveedor(datosActualizados);
      
      setOpen(false);
      form.reset();
      
      // Ejecutar callback para actualizar la lista
      if (typeof onProveedorEditado === 'function') {
        onProveedorEditado();
      }

      toast.success("Proveedor actualizado correctamente", {
        description: `Los cambios se han guardado exitosamente`
      });
      
    } catch (error) {
      console.error("Error al actualizar proveedor:", error);
      toast.error("Error al actualizar proveedor", {
        description: error.message || "Intente nuevamente más tarde"
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
    categorias: cateProveedores || [],
    loadingCategorias
  };
};