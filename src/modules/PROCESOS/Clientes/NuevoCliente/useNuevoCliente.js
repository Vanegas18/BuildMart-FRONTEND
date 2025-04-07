import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clienteSchema } from "./validacionCliente"; // Importa el esquema de validación de clientes
import { useClientes } from "@/core/context/Clientes/ClientesContext"; // Ajusta la importación de contexto
import { toast } from "sonner";

export const useNuevoCliente = (onClienteCreado) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { crearCliente } = useClientes(); // Este es el contexto que se encargará de crear un cliente en la API.

  // Configuración del formulario con Zod y react-hook-form
  const form = useForm({
    resolver: zodResolver(clienteSchema), // Utiliza el esquema de validación para cliente
    defaultValues: {
      nombre: "",
      correo: "",
      telefono: "",
      direccion: "",
      departamento: "",
      ciudad: "",
    },
  });

  // Función de submit con manejo de errores y estado de carga
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);

      await crearCliente(data); // Llamamos a la función que se encarga de crear el cliente en la API

      setOpen(false); // Cierra el modal

      form.reset(); // Resetea el formulario

      onClienteCreado?.(); // Llama a la función que maneja la acción después de crear el cliente

      // Toast de éxito
      toast.success("Cliente creado exitosamente", {
        description: `Se ha añadido ${data.nombre} correctamente`,
      });
    } catch (error) {
      console.error("Error al crear el cliente:", error);

      toast.error("Error al crear el cliente", {
        description:
          error.message || "No se pudo crear el cliente. Intente nuevamente.",
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
