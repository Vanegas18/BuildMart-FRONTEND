import { Button } from "@/shared/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Pencil,
  Package,
  Tag,
  Layers,
  FileImage,
  FileText,
  DollarSign,
  Database,
} from "lucide-react";
import { useEditarProducto } from "./useEditarProducto";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";

export const EditarProducto = ({ producto, onProductoEditado }) => {
  const {
    categorias,
    form,
    loading,
    onSubmit,
    open,
    setOpen,
    imageType,
    handleImageTypeChange,
    handleFileChange,
    imageFile,
    handleCategoriaChange,
    selectedCategorias,
  } = useEditarProducto(onProductoEditado, producto);

  const categoriasActivas = categorias.filter(
    (categoria) => categoria.estado === "Activa"
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center text-gray-800">
            <Package className="mr-2 h-5 w-5" />
            Editar Producto
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Modifique la información del producto y guarde los cambios
          </DialogDescription>
          <Separator className="my-3" />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <h3 className="text-sm font-medium flex items-center mb-4 text-gray-700">
                  <FileText className="mr-2 h-4 w-4 text-gray-600" />
                  Información Básica
                </h3>

                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="flex items-center text-gray-700">
                        <Tag className="mr-2 h-4 w-4 text-gray-600" />
                        Nombre del Producto
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Martillo profesional, Taladro eléctrico..."
                          {...field}
                          autoFocus
                          className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Nombre comercial del producto tal como aparecerá en el
                        catálogo
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <FormField
                    control={form.control}
                    name="precioCompra"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <DollarSign className="mr-2 h-4 w-4 text-gray-600" />
                          Precio de compra ($)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            {...field}
                            aria-label="precioCompra"
                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <div className="text-xs text-gray-500">
                          {/* Cambiado a div para evitar error de anidación */}
                          Costo de adquisición al proveedor.
                        </div>
                        {field.value ? (
                          <div className="mt-1 p-2 bg-gray-50 border rounded-md text-sm font-medium text-gray-700">
                            Precio de venta estimado:{" "}
                            <span className="text-blue-600">
                              $
                              {Math.round(
                                parseFloat(field.value) * 1.15
                              ).toLocaleString()}
                            </span>
                          </div>
                        ) : null}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <Database className="mr-2 h-4 w-4 text-gray-600" />
                          Stock
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="1"
                            {...field}
                            aria-label="stock"
                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Cantidad de unidades disponibles actualmente
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="flex items-center text-gray-700">
                        <FileText className="mr-2 h-4 w-4 text-gray-600" />
                        Descripción
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describa las características del producto..."
                          className="resize-none border-gray-300 focus:border-gray-500 focus:ring-gray-500 min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Incluya detalles importantes como dimensiones,
                        materiales, usos recomendados, etc.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-6" />

                <h3 className="text-sm font-medium flex items-center mb-4 text-gray-700">
                  <Layers className="mr-2 h-4 w-4 text-gray-600" />
                  Categorización
                </h3>

                {/* Selección múltiple de categorías */}
                <FormField
                  control={form.control}
                  name="categorias"
                  render={() => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700">
                        Categorías del producto
                      </FormLabel>
                      <Card className="border border-gray-200 bg-gray-50">
                        <CardContent className="pt-4 pb-2">
                          <div className="grid grid-cols-2 gap-2 max-h-[180px] overflow-y-auto pr-1">
                            {categoriasActivas.map((categoria) => (
                              <div
                                key={categoria._id}
                                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md transition-colors">
                                <Checkbox
                                  id={`categoria-edit-${categoria._id}`}
                                  checked={selectedCategorias.includes(
                                    categoria._id
                                  )}
                                  onCheckedChange={(checked) =>
                                    handleCategoriaChange(
                                      categoria._id,
                                      checked
                                    )
                                  }
                                  className="border-gray-400 data-[state=checked]:bg-gray-700 data-[state=checked]:border-gray-700"
                                />
                                <Label
                                  htmlFor={`categoria-edit-${categoria._id}`}
                                  className="text-sm font-normal text-gray-700 cursor-pointer">
                                  {categoria.nombre}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      <FormDescription className="text-xs text-gray-500">
                        Seleccione todas las categorías aplicables al producto
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-6" />

                <h3 className="text-sm font-medium flex items-center mb-4 text-gray-700">
                  <FileImage className="mr-2 h-4 w-4 text-gray-600" />
                  Imagen del Producto
                </h3>

                {/* Selector de tipo de imagen */}
                <div className="space-y-4">
                  <RadioGroup
                    value={imageType}
                    onValueChange={handleImageTypeChange}
                    className="flex space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="url"
                        id="url-edit"
                        className="border-gray-400 text-gray-700"
                      />
                      <Label htmlFor="url-edit" className="text-gray-700">
                        URL de imagen
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="file"
                        id="file-edit"
                        className="border-gray-400 text-gray-700"
                      />
                      <Label htmlFor="file-edit" className="text-gray-700">
                        Subir archivo
                      </Label>
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
                              className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                            />
                          </FormControl>
                          <FormDescription className="text-xs text-gray-500">
                            Ingrese la URL completa de una imagen disponible en
                            la web
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <Card className="border border-gray-200 bg-gray-50">
                      <CardContent className="pt-4 pb-3">
                        <Input
                          type="file"
                          accept="image/jpeg,image/png,image/gif,image/webp"
                          onChange={handleFileChange}
                          className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 bg-white"
                        />
                        <FormDescription className="text-xs text-gray-500 mt-2">
                          Formatos permitidos: JPG, PNG, GIF, WEBP (máx. 5MB)
                        </FormDescription>
                        {imageFile && (
                          <div className="mt-2 p-2 bg-gray-100 border rounded-md text-sm">
                            <p className="text-green-600 flex items-center">
                              <FileImage className="mr-1 h-3 w-3" />
                              Archivo seleccionado:{" "}
                              <span className="font-medium ml-1">
                                {imageFile.name}
                              </span>
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>

            <DialogFooter className="space-x-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="border-gray-300 hover:bg-gray-100 transition-all">
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 transition-all">
                {loading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
