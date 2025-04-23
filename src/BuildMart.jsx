import { Toaster } from "sonner";
import { AuthProvider, PedidosProvider } from "./core/context";
import { AppRouter } from "./core/routes/AppRouter";
import { CarritoProvider } from "./core/context/Carrito/CarritoContext";
import { ProductosProvider } from "./core/context";
import { CategoriaProductosProvider } from "./core/context/CategoriasProductos";

export const BuildMart = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Toaster position="top-right" richColors />
      <AuthProvider>
        <PedidosProvider>
          <ProductosProvider>
            <CategoriaProductosProvider>
              <CarritoProvider>
                <AppRouter />
              </CarritoProvider>
            </CategoriaProductosProvider>
          </ProductosProvider>
        </PedidosProvider>
      </AuthProvider>
    </div>
  );
};
