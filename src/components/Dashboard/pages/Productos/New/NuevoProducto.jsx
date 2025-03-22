import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getCategories, registerProduct } from "@/api";
import { useProductos } from "@/context/ProductosContext";

// const objectIdRegex = /^[a-fA-F0-9]{24}$/; // Patrón para validar MongoDB ObjectId

// // Esquema de validación con Zod
// const productoSchema = z.object({
//   nombre: z
//     .string()
//     .min(5, { message: "El nombre debe tener al menos 5 caracteres" })
//     .trim(),
//   descripcion: z
//     .string()
//     .min(5, { message: "La descripción debe tener al menos 5 caracteres" }),
//   categoriaId: z
//     .string()
//     .regex(objectIdRegex, { message: "El ID de la categoría no es válido" }),
//   precio: z.coerce.number().min(0, "El precio no puede ser negativo"),
//   stock: z.coerce
//     .number()
//     .min(1, { message: "El stock debe ser mayor o igual a 1" })
//     .optional(),
//   img: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
// });

export const NuevoProducto = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      categoriaId: "", // Asegúrate de que este campo exista en tu formulario
      precio: 0, // Inicializa como número
      stock: 0, // Inicializa como número
      img: "",
    },
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { crearProductos } = useProductos();
  // const [categorias, setCategorias] = useState([]);

  // useEffect(() => {
  //   const fetchCategorias = async () => {
  //     try {
  //       const resp = await getCategories();
  //       console.log(resp.data);
  //       setCategorias(resp.data);
  //     } catch (error) {
  //       console.log("Error al obtener las categorias:", error);
  //     }
  //   };

  //   fetchCategorias();
  // }, []);

  // Initialize react-hook-form con validación
  // const form = useForm({
  //   resolver: zodResolver(productoSchema),
  //   defaultValues: {
  //     nombre: "",
  //     descripcion: "",
  //     categoriaId: "",
  //     precio: "",
  //     stock: "",
  //     img: "",
  //   },
  // });

  const onSubmit = handleSubmit((data) => {
    crearProductos(data);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Producto</DialogTitle>
          <DialogDescription>
            Complete el formulario para añadir un nuevo producto al inventario.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Input
              text="nombre"
              placeholder="Martillo profesional..."
              {...register("nombre")}
              autoFocus
            />
            {/* <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Producto</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Martillo profesional..."
                        aria-label="nombre"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              type="number"
              placeholder="0.00"
              {...register("precio", {
                valueAsNumber: true, // Esto convierte texto a número
              })}
            />
            <Input
              type="text"
              placeholder="Seleccionar categoría"
              {...register("categoriaId")}
            />
            <Input
              type="number"
              placeholder="1"
              {...register("stock", {
                valueAsNumber: true, // Esto convierte texto a número
              })}
            />
            {/* <FormField
                control={form.control}
                name="precio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        aria-label="precio"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoriaId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categorias.map((categoria) => (
                          <SelectItem key={categoria._id} value={categoria._id}>
                            {categoria.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" aria-label="stock" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
          </div>

          <Input text="text" placeholder="...." {...register("descripcion")} />
          <Input text="text" placeholder="...." {...register("img")} />

          {/* <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describa las características del producto..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Incluya detalles importantes como dimensiones, materiales,
                    etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="img"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de la Imagen</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese la url de una imagen en la web..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Este campo es opcional, lo puedes ingresar luego.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Producto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
