import * as z from "zod";

export const permissionsSchema = z.object({
  nombreGrupo: z
    .string()
    .min(5, { message: "El nombre del grupo debe tener al menos 5 caracteres" })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u, {
      message: "Nombre solo puede contener letras",
    }),
  permisos: z
    .array(
      z.object({
        label: z
          .string()
          .min(3, { message: "La etiqueta debe tener al menos 3 caracteres" }),
        description: z
          .string()
          .min(3, "El título debe tener al menos 3 caracteres")
          .optional(),
        estado: z.enum(["Activo", "Inactivo"]).optional(),
      })
    )
    .min(1, "Debe agregar al menos un permiso"),
  estado: z.enum(["Activo", "Inactivo"]).optional(),
});
