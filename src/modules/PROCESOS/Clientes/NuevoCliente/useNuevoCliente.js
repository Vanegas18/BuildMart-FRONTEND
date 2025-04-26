// useNuevoCliente.js - versión revisada
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema } from "./validacionCliente";
import { useClientes } from "@/core/context/Clientes/ClientesContext";
import { toast } from "sonner";

export const useNuevoCliente = (onClienteCreado) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { crearCliente } = useClientes();

  // Configuración del formulario con el esquema actualizado
  const form = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      cedula: "",
      nombre: "",
      correo: "",
      telefono: "",
      contraseña: "",
      direcciones: [],
      metodosPago: [],
    },
    mode: "onChange", // Validación mientras el usuario escribe
  });

  // Esta es la función que se llama directamente
  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      // Verificar direcciones
      if (!data.direcciones || data.direcciones.length === 0) {
        toast.error("Error de validación", {
          description: "Debe agregar al menos una dirección",
        });
        return;
      }

      // Preparamos los datos
      const clienteData = {
        cedula: data.cedula,
        nombre: data.nombre,
        correo: data.correo,
        contraseña: data.contraseña,
        telefono: data.telefono,
        direcciones: data.direcciones,
        metodosPago: data.metodosPago || [],
      };

      // Llamamos a la API
      await crearCliente(clienteData);

      // Si todo va bien, reseteamos y cerramos
      toast.success("Cliente creado exitosamente", {
        description: `Se ha añadido ${data.nombre} al sistema`,
      });
      form.reset();
      setOpen(false);

      // Llamamos al callback si existe
      if (onClienteCreado) onClienteCreado();
    } catch (error) {
      console.error("Error al crear cliente:", error);
      toast.error("Error al crear el cliente", {
        description:
          error.response?.data?.error ||
          "No se pudo guardar el cliente. Intente nuevamente.",
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
    handleSubmit, // Exportamos la función directa
  };
};
