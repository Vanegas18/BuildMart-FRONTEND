import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useClientes } from "@/core/context";
import { updateClientSchema } from "../NuevoCliente/validacionCliente";
import { zodResolver } from "@hookform/resolvers/zod";

// Hook personalizado para manejar la edición de clientes
export const useEditarCliente = (onClienteEditado, cliente) => {
  // Estados para manejar la apertura del diálogo y la carga
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { editarCliente } = useClientes(); // Accedemos al contexto de clientes

  // Configuración del formulario con react-hook-form
  const form = useForm({
    defaultValues: {
      cedula: cliente?.cedula || "",
      nombre: cliente?.nombre || "",
      correo: cliente?.correo || "",
      telefono: cliente?.telefono || "",
      contraseña: cliente?.contraseña || "",
      direcciones: cliente?.direcciones || [],
      metodosPago: cliente?.metodosPago || [],
    },
    resolver: zodResolver(updateClientSchema),
  });

  // Efecto para resetear el formulario cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      form.reset({
        cedula: cliente?.cedula || "",
        nombre: cliente?.nombre || "",
        correo: cliente?.correo || "",
        telefono: cliente?.telefono || "",
        contraseña: cliente?.contraseña || "",
        direcciones: cliente?.direcciones || [],
        metodosPago: cliente?.metodosPago || [],
      });
    }
  }, [open, cliente, form]);

  // Función de submit con manejo de errores y estado de carga
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Asegurarnos de enviar el ID del cliente
      const clienteConId = { ...data, _id: cliente._id };

      // Llamamos a la función de editarCliente del contexto
      const clienteEditado = await editarCliente(clienteConId);

      setOpen(false);

      // Callback para notificar cuando se edita un cliente
      onClienteEditado?.(clienteEditado);

      // Toast de éxito
      toast.success("Cliente editado exitosamente", {
        description: `Se ha editado ${data.nombre} correctamente`,
      });
    } catch (error) {
      console.error("Error al editar el cliente:", error);

      // Muestra un toast con el mensaje de error
      toast.error("Error al editar el cliente", {
        description:
          error.response?.data?.error ||
          "No se pudo editar el cliente. Intente nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    open,
    setOpen,
    loading,
    form,
    onSubmit,
  };
};
