import * as z from 'zod';

export const proveedorSchema = z.object({
    proveedorId: z.union([
      z.number(),
      z.string().transform((val) => (val === '' ? undefined : Number(val))),
      z.undefined(),
    ]).optional(),
    nit: z
      .string()
      .min(9, { message: "El NIT debe tener al menos 9 caracteres" })
      .trim()
      .nonempty({ message: "El NIT es obligatorio" }),
    nombre: z
      .string()
      .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
      .trim()
      .nonempty({ message: "El nombre es obligatorio" })
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
        message: "El nombre solo puede contener letras y espacios",
      }),
    direccion: z
      .string()
      .min(5, { message: "La dirección debe tener al menos 5 caracteres" })
      .trim()
      .nonempty({ message: "La dirección es obligatoria" }),
    telefono: z
      .string()
      .min(10, {
        message: "El número de teléfono debe tener al menos 10 caracteres",
      })
      .trim()
      .nonempty({ message: "El número de teléfono es obligatorio" }),
    correo: z
      .string()
      .email({ message: "Debe ser un correo electrónico válido" })
      .nonempty({ message: "El correo es obligatorio" }),
    categoriaProveedorId: z
      .string()
      .nonempty({ message: "La categoría del proveedor es obligatoria" }),
    estado: z
      .enum(["Activo", "Inactivo"], {
        message: "El estado solo puede ser 'Activo' o 'Inactivo'",
      })
      .default("Activo"),
  });