import { HeaderLanding } from "@/modules/Landing/components";
import { Suspense } from "react";
import { ProductCatalog } from "../components/ProductCatalog";
import { CatalogSkeleton } from "../components/CatalogSkeleton";
import { ShoppingCartComponent } from "../CARRITO/ShoppingCartComponent";

export const Catalogo = () => {
  return (
    <>
      <HeaderLanding />
      <div className="min-h-screen bg-gray-50 p-4">
        <header className="max-w-7xl mx-auto flex justify-between items-center py-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Catálogo
          </h1>
          <ShoppingCartComponent />
        </header>

        <main className="mx-auto mt-8">
          <div className="bg-white  rounded-lg shadow-sm">
            <div className="max-w-7xl mx-auto">
              <Suspense fallback={<CatalogSkeleton />}>
                <ProductCatalog />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
