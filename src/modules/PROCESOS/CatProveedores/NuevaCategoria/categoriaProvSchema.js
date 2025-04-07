import * as z from "zod";

export const categoriaProvSchema = z.object({
  categoriaProveedorId: z.union([
    z.number(),
    z.string().transform((val) => (val === "" ? undefined : Number(val))),
    z.undefined()
  ]),
  nombre: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .trim()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
      message: "El nombre solo puede contener letras y espacios",
    }),
  descripcion: z
    .string()
    .min(5, "La descripción debe tener al menos 5 caracteres"),
  estado: z.string().default("Activo")
});