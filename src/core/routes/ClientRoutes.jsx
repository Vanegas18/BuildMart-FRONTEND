import { Route, Routes } from "react-router";
import {
  ClientesProvider,
  PedidosProvider,
  ProductosProvider,
  VentasProvider,
} from "../context";
import { CategoriaProductosProvider } from "../context/CategoriasProductos";
import { ProtectedRoutes } from "./ProtectedRoutes";
import {
  ComprasPerfil,
  Favoritos,
  MainCuentaContent,
  Pedidos,
  Perfil,
  PerfilCliente,
} from "@/modules";

export const ClientRoutes = () => {
  return (
    <ProtectedRoutes>
      <ProductosProvider>
        <CategoriaProductosProvider>
          <PedidosProvider>
            <VentasProvider>
              <ClientesProvider>
                <Routes>
                  <Route path="/" element={<PerfilCliente />}>
                    <Route index element={<MainCuentaContent />} />
                    <Route path="pedidos" element={<Pedidos />} />
                    <Route path="compras" element={<ComprasPerfil />} />
                    <Route path="favoritos" element={<Favoritos />} />
                    <Route path="perfil" element={<Perfil />} />
                  </Route>
                </Routes>
              </ClientesProvider>
            </VentasProvider>
          </PedidosProvider>
        </CategoriaProductosProvider>
      </ProductosProvider>
    </ProtectedRoutes>
  );
};
