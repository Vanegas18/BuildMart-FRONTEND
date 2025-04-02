  import * as z from "zod";

  const isValidObjectId = (id) => {
    // Validación simple para ObjectId de MongoDB (24 caracteres hexadecimales)
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  export const rolesSchema = z.object({
    nombre: z
      .string()
      .trim()
      .min(5, { message: "El nombre debe tener al menos 5 caracteres" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "El nombre solo puede contener letras",
      }),
    descripcion: z
      .string()
      .trim()
      .min(5, { message: "La descripción debe tener al menos 5 caracteres" })
      .optional(),
    permisos: z
      .array(
        z.string().refine(isValidObjectId, {
          message: "Cada permiso debe ser un ObjectId válido",
        })
      )
      .min(1, { message: "Debes seleccionar al menos un permiso" }),
  });
