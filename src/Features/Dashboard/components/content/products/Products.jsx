import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { HeaderContent, HeaderProcess, PaginationContent } from "../../layout";
import { ProductsTable } from ".";

export const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title={"Gestión de Productos"}
        info={"Administra el catálogo de productos"}
        newInfo={"Añadir Producto"}
        icon={ShoppingBag}
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
