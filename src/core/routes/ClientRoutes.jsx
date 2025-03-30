import { Route, Routes } from "react-router";
import { ProductosProvider } from "../context";
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
          <Routes>
            <Route path="/" element={<PerfilCliente />}>
              <Route index element={<MainCuentaContent />} />
              <Route path="pedidos" element={<Pedidos />} />
              <Route path="compras" element={<ComprasPerfil />} />
              <Route path="favoritos" element={<Favoritos />} />
              <Route path="perfil" element={<Perfil />} />
            </Route>
          </Routes>
        </CategoriaProductosProvider>
      </ProductosProvider>
    </ProtectedRoutes>
  );
};
