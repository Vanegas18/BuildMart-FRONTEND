import { useState } from "react";
import { useClientes } from "@/core/context";
import { Button } from "@/shared/components/ui";
import { Badge } from "@/shared/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Edit,
  Trash2,
  Plus,
  CreditCard,
  CreditCardIcon,
  Banknote,
  Landmark,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Esquema de validación para métodos de pago
const PagoSchema = z
  .object({
    tipo: z.string({
      required_error: "El tipo de pago es obligatorio",
    }),
    titular: z
      .string()
      .trim()
      .min(10, {
        message: "El nombre del titular debe tener al menos 10 caracteres",
      })
      .optional()
      .or(z.literal("")),
    numeroTarjeta: z
      .string()
      .regex(/^\d{16}$/, {
        message: "El número de tarjeta debe tener 16 dígitos numéricos",
      })
      .optional()
      .or(z.literal("")),
    fechaExpiracion: z
      .string()
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
        message: "Formato inválido. Use MM/YY",
      })
      .optional()
      .or(z.literal("")),
    esPrincipal: z.boolean().default(false),
  })
  .refine(
    (data) => {
      // Si el tipo es tarjeta, los campos específicos son obligatorios
      if (
        data.tipo === "Tarjeta de Crédito" ||
        data.tipo === "Tarjeta de Débito"
      ) {
        return !!data.numeroTarjeta && !!data.fechaExpiracion && !!data.titular;
      }
      return true;
    },
    {
      message:
        "Los campos de tarjeta son obligatorios para este método de pago",
      path: ["tipo"], // Mostrar el error en el campo tipo
    }
  );

export const Pagos = ({ cliente, onClienteEditado }) => {
  const { editarCliente } = useClientes();
  const [editandoPago, setEditandoPago] = useState(null);
  const [agregandoPago, setAgregandoPago] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(PagoSchema),
    defaultValues: {
      tipo: "",
      titular: "",
      numeroTarjeta: "",
      fechaExpiracion: "",
      esPrincipal: false,
    },
    mode: "onBlur", // Validar cuando el campo pierde el foco
  });

  const handleEditarPago = (pago) => {
    form.reset({
      tipo: pago.tipo,
      titular: pago.titular || "",
      numeroTarjeta: pago.numeroTarjeta || "",
      fechaExpiracion: pago.fechaExpiracion || "",
      esPrincipal: pago.esPrincipal || false,
    });
    setEditandoPago(pago._id);
    setAgregandoPago(false);
  };

  const handleAgregarPago = () => {
    form.reset({
      tipo: "",
      titular: "",
      numeroTarjeta: "",
      fechaExpiracion: "",
      esPrincipal: false,
    });
    setEditandoPago(null);
    setAgregandoPago(true);
  };

  const handleCancelar = () => {
    setEditandoPago(null);
    setAgregandoPago(false);
  };

  const handleEliminarPago = async (pagoId) => {
    setLoading(true);
    try {
      const nuevosPagos =
        cliente.metodosPago?.filter((p) => p._id !== pagoId) || [];

      await editarCliente({
        _id: cliente._id,
        metodosPago: nuevosPagos,
      });

      onClienteEditado();
    } catch (error) {
      console.error("Error al eliminar método de pago:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      // Asegurarse de que el array de métodos de pago existe
      let nuevosPagos = [...(cliente.metodosPago || [])];

      // Si el nuevo método se marca como principal, quitar la marca de otros métodos
      if (data.esPrincipal) {
        nuevosPagos = nuevosPagos.map((pago) => ({
          ...pago,
          esPrincipal: false,
        }));
      }

      if (editandoPago) {
        // Actualizar método de pago existente
        nuevosPagos = nuevosPagos.map((pago) =>
          pago._id === editandoPago ? { ...pago, ...data } : pago
        );
      } else if (agregandoPago) {
        // Agregar nuevo método de pago (sin ID temporal)
        nuevosPagos.push({
          ...data,
        });
      }

      await editarCliente({
        _id: cliente._id,
        metodosPago: nuevosPagos,
      });

      onClienteEditado();
      setEditandoPago(null);
      setAgregandoPago(false);
    } catch (error) {
      console.error("Error al guardar método de pago:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para enmascarar el número de tarjeta (mostrar solo los últimos 4 dígitos)
  const formatearNumeroTarjeta = (numero) => {
    if (!numero) return "";
    const ultimosDigitos = numero.slice(-4);
    return `•••• •••• •••• ${ultimosDigitos}`;
  };

  // Obtener el icono adecuado según el tipo de pago
  const obtenerIcono = (tipo) => {
    switch (tipo) {
      case "Tarjeta de Crédito":
        return <CreditCard className="h-5 w-5 text-blue-600" />;
      case "Tarjeta de Débito":
        return <CreditCardIcon className="h-5 w-5 text-green-600" />;
      case "PSE":
        return <Landmark className="h-5 w-5 text-purple-600" />;
      case "Efectivo":
        return <Banknote className="h-5 w-5 text-yellow-600" />;
      default:
        return <CreditCard className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Métodos de Pago</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cliente.metodosPago && cliente.metodosPago.length > 0 ? (
          cliente.metodosPago.map((pago) => (
            <div key={pago._id} className="rounded-lg border p-4">
              {editandoPago === pago._id ? (
                <PagoForm
                  form={form}
                  onSubmit={handleSubmit}
                  onCancel={handleCancelar}
                  loading={loading}
                />
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {obtenerIcono(pago.tipo)}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{pago.tipo}</h3>
                          {pago.esPrincipal && (
                            <Badge variant="outline" className="ml-2">
                              Principal
                            </Badge>
                          )}
                        </div>
                        {(pago.tipo === "Tarjeta de Crédito" ||
                          pago.tipo === "Tarjeta de Débito") && (
                          <p className="text-sm text-gray-500">
                            {pago.numeroTarjeta &&
                              `${formatearNumeroTarjeta(pago.numeroTarjeta)}`}
                            {pago.fechaExpiracion &&
                              ` | Exp: ${pago.fechaExpiracion}`}
                            {pago.titular && ` | Titular: ${pago.titular}`}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditarPago(pago)}>
                        <Edit className="mr-1 h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleEliminarPago(pago._id)}
                        disabled={loading}>
                        <Trash2 className="mr-1 h-4 w-4" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            No hay métodos de pago registrados
          </div>
        )}

        {agregandoPago ? (
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Nuevo Método de Pago</h3>
            <PagoForm
              form={form}
              onSubmit={handleSubmit}
              onCancel={handleCancelar}
              loading={loading}
            />
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={handleAgregarPago}>
            <Plus className="mr-2 h-4 w-4" />
            Añadir Nuevo Método de Pago
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// Componente para el formulario de método de pago (tanto para editar como para agregar)
const PagoForm = ({ form, onSubmit, onCancel, loading }) => {
  const tipoPago = form.watch("tipo");
  const esTarjeta =
    tipoPago === "Tarjeta de Crédito" || tipoPago === "Tarjeta de Débito";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Pago</FormLabel>
              <Select
                onValueChange={(valor) => {
                  field.onChange(valor);
                  // Si cambia de tarjeta a otro método, limpiar campos específicos de tarjeta
                  if (
                    valor !== "Tarjeta de Crédito" &&
                    valor !== "Tarjeta de Débito"
                  ) {
                    form.setValue("titular", "");
                    form.setValue("numeroTarjeta", "");
                    form.setValue("fechaExpiracion", "");
                  }
                }}
                defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de pago" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Tarjeta de Crédito">
                    Tarjeta de Crédito
                  </SelectItem>
                  <SelectItem value="Tarjeta de Débito">
                    Tarjeta de Débito
                  </SelectItem>
                  <SelectItem value="PSE">PSE</SelectItem>
                  <SelectItem value="Efectivo">Efectivo</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campos específicos para tarjetas */}
        {esTarjeta && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="numeroTarjeta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Tarjeta</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234567891234567"
                        {...field}
                        maxLength={16}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fechaExpiracion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Expiración</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} maxLength={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="titular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titular de la Tarjeta</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre completo del titular"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="esPrincipal"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 mt-2">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4 mt-1"
                />
              </FormControl>
              <FormLabel>Establecer como método de pago principal</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
