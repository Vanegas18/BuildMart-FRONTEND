import * as z from "zod";

export const productoSchema = z.object({
  productoId: z.number(),
  nombre: z
    .string()
    .min(5, "El nombre debe tener al menos 5 caracteres")
    .trim(),
  descripcion: z
    .string()
    .min(5, "La descripción debe tener al menos 5 caracteres"),
  categoriaId: z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/, "El ID de la categoría no es válido"),
  precio: z.coerce.number().min(1, "El precio no puede ser negativo"),
  stock: z.coerce.number().min(1, "El stock debe ser mayor o igual a 1"),
  img: z.string().url("Debe ser una URL válida"),
});
