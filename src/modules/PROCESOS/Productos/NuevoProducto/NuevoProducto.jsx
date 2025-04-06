import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";

import { useNuevoProducto } from "./useNuevoProducto";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Label } from "@/shared/components/ui/label";

export const NuevoProducto = ({ onProductoCreado }) => {
  const {
    open,
    setOpen,
    loading,
    categorias,
    form,
    onSubmit,
    handleFileChange,
    handleImageTypeChange,
    imageFile,
    imageType,
  } = useNuevoProducto(onProductoCreado);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
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
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Producto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Martillo profesional..."
                      {...field}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="precioCompra"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio de compra ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        aria-label="precioCompra"
                      />
                    </FormControl>
                    <FormDescription>
                      El precio de venta sera el +15%
                    </FormDescription>
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
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                        aria-label="stock"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
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

            {/* Selector de tipo de imagen */}
            <div className="space-y-3">
              <FormLabel>Imagen del producto</FormLabel>
              <RadioGroup
                value={imageType}
                onValueChange={handleImageTypeChange}
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="url" id="url" />
                  <Label htmlFor="url">URL de imagen</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="file" id="file" />
                  <Label htmlFor="file">Subir archivo</Label>
                </div>
              </RadioGroup>

              {imageType === "url" ? (
                <FormField
                  control={form.control}
                  name="img"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="https://ejemplo.com/imagen.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Ingrese la URL de una imagen en la web
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div className="space-y-2">
                  <Input  
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleFileChange}
                  />
                  <FormDescription>
                    Formatos permitidos: JPG, PNG, GIF, WEBP (máx. 5MB)
                  </FormDescription>
                  {imageFile && (
                    <p className="text-sm text-green-600">
                      Archivo seleccionado: {imageFile.name}
                    </p>
                  )}
                </div>
              )}
            </div>

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
