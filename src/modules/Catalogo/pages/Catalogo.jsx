import { HeaderLanding } from "@/modules/Landing/components";
import { Suspense } from "react";
import { ProductCatalog } from "../components/ProductCatalog";
import { CatalogSkeleton } from "../components/CatalogSkeleton";

export const Catalogo = () => {
  return (
    <>
      <HeaderLanding />
      <div className="min-h-screen bg-gray-50">
        <div className="container py-8 md:py-12">
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Catálogo de Productos
            </h1>
            <p className="text-muted-foreground">
              Explora nuestra amplia selección de productos de construcción y
              casas prefabricadas
            </p>
          </div>

          <Suspense fallback={<CatalogSkeleton />}>
            <ProductCatalog />
          </Suspense>
        </div>
      </div>
    </>
  );
};
