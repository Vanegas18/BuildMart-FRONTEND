import * as z from "zod";

// Esquema para validar una dirección
const direccionSchema = z.object({
  tipo: z.enum(["Casa", "Trabajo", "Otro"]).default("Casa"),
  calle: z
    .string()
    .min(5, { message: "La dirección debe tener al menos 5 caracteres" }),
  ciudad: z
    .string()
    .trim()
    .min(2, { message: "La ciudad debe tener al menos 2 caracteres" })
    .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, {
      message: "La ciudad solo debe contener letras",
    }),
  departamento: z
    .string()
    .trim()
    .min(2, { message: "El departamento debe tener al menos 2 caracteres" })
    .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, {
      message: "El departamento solo debe contener letras",
    }),
  codigoPostal: z.string().optional(),
  esPrincipal: z.boolean().default(false),
});

const metodoPagoSchema = z
  .object({
    tipo: z.enum([
      "Tarjeta de Crédito",
      "Tarjeta de Débito",
      "PSE",
      "Efectivo",
      "Otro",
    ]),
    titular: z.string().optional(),
    numeroTarjeta: z
      .string()
      .refine((val) => !val || /^\d{16}$/.test(val), {
        message: "El número de tarjeta debe tener 16 dígitos numéricos",
      })
      .optional(),
    fechaExpiracion: z.string().optional(),
    esPrincipal: z.boolean().default(false),
  })
  .superRefine((val, ctx) => {
    // Solo validar estos campos si es una tarjeta
    if (val.tipo === "Tarjeta de Crédito" || val.tipo === "Tarjeta de Débito") {
      if (!val.titular || val.titular.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 5,
          type: "string",
          inclusive: true,
          path: ["titular"],
          message: "El nombre del titular debe tener al menos 5 caracteres",
        });
      }

      // Validación simplificada del número de tarjeta
      if (
        !val.numeroTarjeta ||
        val.numeroTarjeta.length !== 16 ||
        !/^\d+$/.test(val.numeroTarjeta)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["numeroTarjeta"],
          message: "El número de tarjeta debe tener 16 dígitos numéricos",
        });
      }

      if (
        !val.fechaExpiracion ||
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(val.fechaExpiracion)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["fechaExpiracion"],
          message: "El formato debe ser MM/YY",
        });
      }
    }
  });

// Validación para la creación de un cliente
export const clientSchema = z.object({
  cedula: z.string().regex(/^\d{7,15}$/, {
    message: "La cedula debe contener entre 8 y 10 dígitos numéricos",
  }),
  nombre: z
    .string()
    .trim()
    .min(10, { message: "El nombre debe tener al menos 10 caracteres" }),
  correo: z.string().trim().email({ message: "El correo es invalido" }),
  contraseña: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .regex(/[A-Z]/, {
      message: "La contraseña debe incluir al menos una letra mayúscula",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe incluir al menos un número",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "La contraseña debe incluir al menos un carácter especial",
    }),
  telefono: z.string().regex(/^\d{7,15}$/, {
    message: "El teléfono debe contener 10 dígitos numéricos",
  }),

  // Ahora direcciones es un array requerido (debe tener al menos un elemento)
  direcciones: z.array(direccionSchema),
  // Métodos de pago es opcional
  metodosPago: z.array(metodoPagoSchema).optional(),

  estado: z.enum(["Activo", "Inactivo"]).default("Activo").optional(),
});

// Esquema de validación para actualizar el cliente (campo parcial)
export const updateClientSchema = clientSchema.partial();

// Esquema para añadir una sola dirección
export const addDireccionSchema = direccionSchema;

// Esquema para añadir un método de pago
export const addMetodoPagoSchema = metodoPagoSchema;
