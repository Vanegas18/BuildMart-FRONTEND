import { z } from "zod";

export const compraSchema = z.object({
  proveedorId: z.string().nonempty("El proveedor es obligatorio"),
  fecha: z.string().nonempty("La fecha es obligatoria"),
  productos: z
    .array(
      z.object({
        productoId: z.string().nonempty("El producto es obligatorio"),
        cantidad: z
          .number()
          .min(1, "La cantidad debe ser al menos 1")
          .int("La cantidad debe ser un número entero"),
        // Permitir cualquier tipo y convertir a número
        precioCompra: z
          .any()
          .transform(val => Number(val) || 0),
        precioVenta: z
          .any()
          .transform(val => Number(val) || 0),
      })
    )
    .min(1, "Debes agregar al menos un producto"),
});