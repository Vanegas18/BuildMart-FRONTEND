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
import { CatProveedoresProvider } from "../context/CatProveedores";
import { CatProveedores } from "@/modules/PROCESOS/CatProveedores";
import { ProveedoresProvider } from "../context/Proveedores";

export const AdminRoutes = () => {
  return (
    <ProtectedRoutes>
      <ProductosProvider>
        <CategoriaProductosProvider>
          <PermisosProvider>
            <UsuariosProvider>
              <RolesProvider>
                <CatProveedoresProvider>
                  <ProveedoresProvider>
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
                    <Route path="catProveedores" element={<CatProveedores />} />
                  </Route>
                </Routes>
                  </ProveedoresProvider>
                </CatProveedoresProvider>
              </RolesProvider>
            </UsuariosProvider>
          </PermisosProvider>
        </CategoriaProductosProvider>
      </ProductosProvider>
    </ProtectedRoutes>
  );
};
