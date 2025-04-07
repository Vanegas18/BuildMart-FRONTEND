import { Button } from "@/shared/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { Input } from "@/shared/components/ui/input";
import { Plus } from "lucide-react";
import { useNuevaCategoriaProv } from "./useNuevaCategoriaProv";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";

export const NuevaCategoriaProveedor = ({onCategoriaCreada}) => {
    const { open, setOpen, loading, form, onSubmit } = useNuevaCategoriaProv( onCategoriaCreada );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva Categoría
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Crear Nueva Categoría de Proveedor</DialogTitle>
                    <DialogDescription>
                        Complete los campos para crear una nueva categoría de proveedor
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                <form onSubmit={onSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                    <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la Categoría</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre..."
                      {...field}
                      autoFocus
                      aria-label="nombre"
                    />
                  </FormControl>
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
                      placeholder="Describa las características de la categoría..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Incluya detalles importantes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
                    </div>
                    <DialogFooter>
                        <Button type="submit" loading={loading}>
                            Crear Categoría
                        </Button>
                    </DialogFooter>
                </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}