import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useClientes } from "@/core/context";
import { clienteSchema } from "../NuevoCliente/validacionCliente"; // Si estás usando un schema de validación

// Hook personalizado para manejar la edición de clientes
export const useEditarCliente = (onClienteEditado, cliente) => {
  // Estados para manejar la apertura del diálogo y la carga
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { editarCliente } = useClientes(); // Accedemos al contexto de clientes

  // Configuración del formulario con react-hook-form
  const form = useForm({
    defaultValues: {
      clienteId: cliente.clienteId,
      nombre: cliente.nombre,
      correo: cliente.correo,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      departamento: cliente.departamento,
      ciudad: cliente.ciudad,
    },
    // Si usas un esquema de validación con `yup` o `zod`
    // resolver: clienteSchema,  // Asegúrate de incluir la validación
  });

  // Efecto para resetear el formulario cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      // Solo resetear si el cliente ha cambiado
      form.reset({
        clienteId: cliente.clienteId,
        nombre: cliente.nombre,
        correo: cliente.correo,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
        departamento: cliente.departamento,
        ciudad: cliente.ciudad,
      });
    }
  }, [open, cliente, form]);  // Asegúrate de no hacer reset innecesario

  // Función de submit con manejo de errores y estado de carga
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);

      // Llamamos a la función de editarCliente del contexto
      await editarCliente(data);

      setOpen(false);

      form.reset();

      // Callback para notificar cuando se edita un cliente
      onClienteEditado?.(data);

      // Toast de éxito
      toast.success("Cliente editado exitosamente", {
        description: `Se ha editado ${data.nombre} correctamente`,
      });
    } catch (error) {
      console.error("Error al editar el cliente:", error);

      // Muestra un toast con el mensaje de error
      toast.error("Error al editar el cliente", {
        description:
          error.message || "No se pudo editar el cliente. Intente nuevamente.",
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
};
