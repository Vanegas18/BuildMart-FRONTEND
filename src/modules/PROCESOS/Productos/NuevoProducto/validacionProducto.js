import * as z from "zod";

export const productoSchema = z.object({
  productoId: z.number().optional(),
  nombre: z
    .string()
    .min(5, "El nombre debe tener al menos 5 caracteres")
    .trim(),
  descripcion: z
    .string()
    .min(5, "La descripción debe tener al menos 5 caracteres"),
  categoriaIds: z
    .array(
      z
        .string()
        .regex(/^[a-fA-F0-9]{24}$/, "El ID de la categoría no es válido")
    )
    .optional(),
  precioCompra: z.coerce.number().min(0, "El precio no puede ser negativo"),
  stock: z.coerce.number().min(0, "El stock debe ser mayor o igual a 1"),
  img: z.string().optional(),
  imageType: z.enum(["url", "file"]).optional(),
  estado: z
    .enum(["Activo", "Descontinuado", "Agotado", "En oferta"])
    .optional(),
});
