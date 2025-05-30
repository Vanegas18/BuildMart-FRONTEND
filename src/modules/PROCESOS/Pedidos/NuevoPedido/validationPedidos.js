import * as z from "zod";

export const pedidoSchema = z.object({
  clienteId: z
    .string({ required_error: "El cliente es obligatorio." })
    .min(1, "Debes seleccionar un cliente."),

  direccionEntrega: z
    .string({ required_error: "La dirección de entrega es obligatoria." })
    .min(10, "La dirección debe tener al menos 10 caracteres.")
    .max(200, "La dirección no puede exceder 200 caracteres.")
    .trim(),

  productos: z
    .array(
      z.object({
        productoId: z
          .string({ required_error: "El producto es obligatorio." })
          .min(1, "Debes seleccionar un producto."),
        cantidad: z
          .number({ required_error: "La cantidad es obligatoria." })
          .min(1, "La cantidad debe ser mayor a cero."),
      })
    )
    .min(1, "Debes agregar al menos un producto."),
});
