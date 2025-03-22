import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useCallback, useState } from "react";
import { HeaderContent, HeaderProcess, PaginationContent } from "../../Layout";
import { ProductsTable } from ".";
import { NuevoProducto } from "./New";

export const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Función para actualizar la lista de productos
  const handleProductoCreado = useCallback(() => {
    // Incrementar el contador para forzar una actualización
    setRefreshTrigger((prev) => prev + 1);
    // Opcional: volver a la primera página después de crear un producto
    setCurrentPage(1);
  }, []);

  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title={"Gestión de Productos"}
        info={"Administra el catálogo de productos"}
        newInfo={"Añadir Producto"}
        icon={ShoppingBag}
        actionComponent={
          <NuevoProducto />
        }
      />

      <Card>
        <CardHeader>
          <HeaderProcess
            nameSection={"Listado de Productos"}
            section={"productos"}
          />
        </CardHeader>
        <CardContent>
          <ProductsTable />
          <PaginationContent
            currentPage={currentPage}
            totalItems={128}
            itemsPerPage={8}
            onPageChange={setCurrentPage}
            nameSection={"productos"}
          />
        </CardContent>
      </Card>
    </main>
  );
};
