import { Route, Routes } from "react-router";
import {
  PermisosProvider,
  ProductosProvider,
  RolesProvider,
  UsuariosProvider,
} from "../context";
import { CategoriaProductosProvider } from "../context/CategoriasProductos";
import { ProtectedRoutes } from "./ProtectedRoutes";
import {
  CategoriesProducts,
  Dashboard,
  Permisos,
  Products,
  Proveedores,
  Roles,
  RolesDetalles,
  Usuarios,
} from "@/modules";
import { MainContent } from "@/modules/Dashboard/components/Main";

export const AdminRoutes = () => {
  return (
    <ProtectedRoutes>
      <ProductosProvider>
        <CategoriaProductosProvider>
          <PermisosProvider>
            <UsuariosProvider>
              <RolesProvider>
                <Routes>
                  <Route path="/" element={<Dashboard />}>
                    <Route index element={<MainContent />} />
                    <Route path="productos" element={<Products />} />
                    <Route
                      path="categoriasProductos"
                      element={<CategoriesProducts />}
                    />
                    <Route path="proveedores" element={<Proveedores />} />
                    <Route path="usuarios" element={<Usuarios />} />
                    <Route path="permisos" element={<Permisos />} />
                    <Route path="roles" element={<Roles />} />
                    <Route path="Roles/:_id" element={<RolesDetalles />} />
                  </Route>
                </Routes>
              </RolesProvider>
            </UsuariosProvider>
          </PermisosProvider>
        </CategoriaProductosProvider>
      </ProductosProvider>
    </ProtectedRoutes>
  );
};
