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
import { Checkbox } from "@/shared/components/ui/checkbox";

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
    handleCategoriaChange,
    selectedCategorias,
  } = useNuevoProducto(onProductoCreado);

  const categoriasActivas = categorias.filter(
    (categoria) => categoria.estado === "Activa"
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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

            <div className="grid grid-cols-2 gap-4">
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
                        onChange={(e) => {
                          field.onChange(e);
                          // Calcular el precio aproximado (aunque se recalculará en el backend)
                          const precioVenta = Math.round(
                            parseFloat(e.target.value) * 1.15
                          );
                          // Mostrar en algún lugar del formulario
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      El precio de venta será{" "}
                      {field.value
                        ? `$${Math.round(
                            parseFloat(field.value) * 1.15
                          ).toLocaleString()}`
                        : "$0"}{" "}
                      (precioCompra + 15%)
                    </FormDescription>
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

            {/* Selección múltiple de categorías */}
            <FormField
              control={form.control}
              name="categorias"
              render={() => (
                <FormItem>
                  <FormLabel>Categorías (seleccione una o más)</FormLabel>
                  <div className="border rounded-md p-3 space-y-2">
                    {categoriasActivas.map((categoria) => (
                      <div
                        key={categoria._id}
                        className="flex items-center space-x-2">
                        <Checkbox
                          id={`categoria-${categoria._id}`}
                          checked={selectedCategorias.includes(categoria._id)}
                          onCheckedChange={(checked) =>
                            handleCategoriaChange(categoria._id, checked)
                          }
                        />
                        <Label
                          htmlFor={`categoria-${categoria._id}`}
                          className="text-sm font-normal">
                          {categoria.nombre}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

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
