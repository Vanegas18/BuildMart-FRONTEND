import * as z from "zod";
export const ofertaSchema = z
  .object({
    activa: z.boolean().default(false),
    descuento: z.coerce
      .number()
      .min(0, "El descuento no puede ser negativo.")
      .max(99, "El descuento no puede ser mayor a 99%.")
      .default(0),
    precioOferta: z.coerce
      .number()
      .min(0, "El precio de oferta no puede ser negativo.")
      .default(0),
    fechaInicio: z
      .string()
      .optional()
      .nullable()
      .transform((val) => {
        if (!val) return null;

        // Detectamos si ya incluye un offset ±HH:mm
        const hasOffset = /[+-]\d{2}:\d{2}$/.test(val);
        // Detectamos si ya incluye segundos antes del offset (o final de cadena)
        const hasSeconds = /:\d{2}(?:[+-]\d{2}:\d{2})?$/.test(val);

        if (hasOffset) {
          // Si no trae segundos, se los añadimos justo antes del offset
          return hasSeconds ? val : val.replace(/([T]\d{2}:\d{2})/, "$1:00");
        } else {
          // No trae offset: añadimos ":00-05:00" o "-05:00"
          return hasSeconds ? `${val}-05:00` : `${val}:00-05:00`;
        }
      }),
    fechaFin: z
      .string()
      .optional()
      .nullable()
      .transform((val) => {
        if (!val) return null;
        const hasOffset = /[+-]\d{2}:\d{2}$/.test(val);
        const hasSeconds = /:\d{2}(?:[+-]\d{2}:\d{2})?$/.test(val);

        if (hasOffset) {
          return hasSeconds ? val : val.replace(/([T]\d{2}:\d{2})/, "$1:00");
        } else {
          return hasSeconds ? `${val}-05:00` : `${val}:00-05:00`;
        }
      }),
    descripcionOferta: z
      .string()
      .max(200, "La descripción no puede exceder 200 caracteres.")
      .optional()
      .default(""),
  })
  .refine(
    (data) => {
      if (data.activa && data.descuento === 0 && data.precioOferta === 0) {
        return false;
      }
      return true;
    },
    {
      message:
        "Debe especificar un descuento o precio de oferta cuando la oferta esté activa.",
      path: ["descuento"],
    }
  )
  .refine(
    (data) => {
      if (data.fechaInicio && data.fechaFin) {
        const fechaInicio = new Date(data.fechaInicio);
        const fechaFin = new Date(data.fechaFin);
        return fechaFin > fechaInicio;
      }
      return true;
    },
    {
      message: "La fecha de fin debe ser posterior a la fecha de inicio.",
      path: ["fechaFin"],
    }
  );

export const productoSchema = z.object({
  productoId: z.number().optional(),
  nombre: z
    .string()
    .min(5, "El nombre debe tener al menos 5 caracteres.")
    .trim(),
  descripcion: z
    .string()
    .min(5, "La descripción debe tener al menos 5 caracteres."),
  categoriaIds: z
    .array(
      z.string().regex(/^[a-fA-F0-9]{24}$/, "Seleccione al menos una categoría.")
    )
    .min(1, "Seleccione al menos una categoría")
    .optional(),
  precioCompra: z.coerce.number().min(0, "El precio no puede ser negativo."),
  precio: z.coerce.number().min(0, "El precio no puede ser negativo."),
  stock: z.coerce.number().min(0, "El stock debe ser mayor o igual a 0."),
  img: z.string().optional(),
  imageType: z.enum(["url", "file"]).optional(),
  estado: z
    .enum(["Activo", "Descontinuado", "Agotado", "En oferta"])
    .optional(),
  oferta: ofertaSchema.optional().default({
    activa: false,
    descuento: 0,
    precioOferta: 0,
    fechaInicio: null,
    fechaFin: null,
    descripcionOferta: "",
  }),
});
