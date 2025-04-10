import { useState } from "react";
import { categoriaProvSchema } from "./categoriaProvSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCatProveedores } from "@/core/context/CatProveedores";

export const useNuevaCategoriaProv = ({
    onCategoriaCreada,
}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { crearCatProveedor } = useCatProveedores();

    const form = useForm({
        resolver: zodResolver(categoriaProvSchema),
        defaultValues: {
          nombre: "",
          descripcion: "",
        },
      });

      const onSubmit = form.handleSubmit(async (data) => {
        try {
          setLoading(true);
    
          await crearCatProveedor(data);
    
          setOpen(false);
    
          form.reset();
    
          onCategoriaCreada?.();
    
          toast.success("Categoría creada exitosamente", {
            description: `Se ha añadido ${data.nombre} al inventario`,
          });
        } catch (error) {
          console.error("Error al crear la categoría:", error);
    
          toast.error("Error al crear la categoría", {
            description:
              error.response?.data?.error ||
              "No se pudo guardar la categoría. Intente nuevamente.",
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
      };
}
