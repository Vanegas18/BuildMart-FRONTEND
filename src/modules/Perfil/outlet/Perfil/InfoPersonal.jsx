import { useState } from "react";
import { useClientes } from "@/core/context";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui";
import { Mail, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Esquema de validación para el cliente
const ClienteSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(10, { message: "El nombre debe tener al menos 10 caracteres" }),
  correo: z.string().trim().email({ message: "El correo es inválido" }),
  telefono: z.string().regex(/^\d{7,15}$/, {
    message: "El teléfono debe contener entre 7 y 15 dígitos numéricos",
  }),
});

export const InfoPersonal = ({ cliente, onClienteEditado }) => {
  const { editarCliente } = useClientes();
  const [loading, setLoading] = useState(false);

  // Obtener iniciales para el AvatarFallback
  const getInitials = () => {
    if (!cliente || !cliente.nombre) return "*"; // Fallback por defecto

    // Si tienes solo el nombre completo
    const nameParts = cliente.nombre.split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`;
    }

    return cliente.nombre.substring(0, 2);
  };

  // Inicializar el formulario con los valores actuales del cliente y resolver de Zod
  const form = useForm({
    resolver: zodResolver(ClienteSchema),
    defaultValues: {
      nombre: cliente.nombre || "",
      correo: cliente.correo || "",
      telefono: cliente.telefono || "",
    },
  });

  // Manejar la actualización del cliente
  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await editarCliente({
        _id: cliente._id,
        ...data,
      });
      onClienteEditado(); // Callback para notificar al padre que se editó el cliente
    } catch (error) {
      console.error("Error al editar cliente:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src="/placeholder.svg?height=96&width=96"
              alt="Avatar"
            />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4">
            <FormField
              className="space-y-2"
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-gray-700">
                    <User className="mr-2 h-4 w-4 text-gray-600" />
                    Nombre del Cliente
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Juan Pérez González"
                      {...field}
                      autoFocus
                      aria-label="nombre"
                      className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="correo"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="flex items-center text-gray-700">
                    <Mail className="mr-2 h-4 w-4 text-gray-600" />
                    Correo Electrónico
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      {...field}
                      className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="flex items-center text-gray-700">
                    <Phone className="mr-2 h-4 w-4 text-gray-600" />
                    Teléfono
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234567890"
                      {...field}
                      className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
