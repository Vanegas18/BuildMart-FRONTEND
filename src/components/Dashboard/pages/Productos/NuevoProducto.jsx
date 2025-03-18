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
import { postFetch } from "@/services";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Esquema de validación con Zod
const productoSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  price: z.string().min(1, "El precio es requerido"),
  category: z.string().min(1, "La categoría es requerida"),
  stock: z.string().min(1, "El stock es requerido"),
  description: z.string().optional(),
  img: z.string().url().optional(),
});

export const NuevoProducto = ({ onProductoCreado }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize react-hook-form con validación
  const form = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      nombre: "",
      price: "",
      category: "",
      stock: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Convertir datos numéricos
      const productoData = {
        ...data,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
      };

      // Enviar datos a la API
      const resultado = await postFetch("productos", productoData);
      console.log("Producto creado:", resultado);

      // Resetear formulario
      form.reset();

      // Cerrar modal
      setOpen(false);

      // Notificar al componente padre que se creó un producto
      if (onProductoCreado) {
        onProductoCreado();
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
    } finally {
      setLoading(false);
    }
  };

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
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
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
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
                name="category"
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
                        <SelectItem value="herramientas">
                          Herramientas
                        </SelectItem>
                        <SelectItem value="materiales">Materiales</SelectItem>
                        <SelectItem value="electricidad">
                          Electricidad
                        </SelectItem>
                        <SelectItem value="plomeria">Plomería</SelectItem>
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
              />
            </div>

            <FormField
              control={form.control}
              name="description"
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
        </Form>
      </DialogContent>
    </Dialog>
  );
};
