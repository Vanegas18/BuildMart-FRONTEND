import * as z from "zod";

export const categoriaSchema = z.object({
  categoriaId: z.number().optional(),
  nombre: z
    .string()
    .min(5, "El nombre debe tener al menos 5 caracteres")
    .trim()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
      message: "El nombre solo puede contener letras y espacios",
    }),
  descripcion: z
    .string()
    .min(5, "La descripción debe tener al menos 5 caracteres"),
});
