import { z } from "zod";

export const ventaSchema = z.object({
  clienteId: z.string().nonempty("El cliente es obligatorio"), // Validación para el cliente
  direccionEntrega: z
    .string({ required_error: "La dirección de entrega es obligatoria" })
    .min(10, "La dirección debe tener al menos 10 caracteres")
    .max(200, "La dirección no puede exceder 200 caracteres")
    .trim(),
  productos: z
    .array(
      z.object({
        productoId: z.string().nonempty("El producto es obligatorio"),
        cantidad: z
          .number()
          .min(1, "La cantidad debe ser al menos 1") // Validación para la cantidad
          .int("La cantidad debe ser un número entero"),
      })
    )
    .min(1, "Debes agregar al menos un producto"), // Validación para que haya al menos un producto
});
