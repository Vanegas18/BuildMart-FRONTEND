import * as z from "zod";

export const clienteSchema = z.object({
  clienteId: z.number().optional(),
  nombre: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .trim(),
  correo: z
    .string()
    .email("El correo debe ser un email válido")
    .trim(),
  telefono: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 caracteres")
    .max(15, "El teléfono no puede tener más de 15 caracteres")
    .regex(/^\d+$/, "El teléfono solo puede contener números"),
  direccion: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .trim(),
  departamento: z
    .string()
    .min(3, "El departamento debe tener al menos 3 caracteres")
    .trim(),
  ciudad: z
    .string()
    .min(3, "La ciudad debe tener al menos 3 caracteres")
    .trim(),
});
