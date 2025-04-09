import { Route, Routes } from "react-router";
import {
  ClientesProvider,
  PedidosProvider,
  PermisosProvider,
  ProductosProvider,
  RolesProvider,
  UsuariosProvider,
  VentasProvider,
} from "../context";
import { CategoriaProductosProvider } from "../context/CategoriasProductos";
import { ProtectedRoutes } from "./ProtectedRoutes";
import {
  CategoriesProducts,
  Dashboard,
  Permisos,
  Clients,
  Orders,
  Sales,
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
                    <ClientesProvider>
                      <PedidosProvider>
                        <VentasProvider>
                          <Routes>
                            <Route path="/" element={<Dashboard />}>
                              <Route index element={<MainContent />} />
                              <Route path="productos" element={<Products />} />
                              <Route
                                path="categoriasProductos"
                                element={<CategoriesProducts />}
                              />

                              <Route
                                path="proveedores"
                                element={<Proveedores />}
                              />
                              <Route
                                path="Administradores"
                                element={<Usuarios />}
                              />
                              <Route path="permisos" element={<Permisos />} />
                              <Route path="clientes" element={<Clients />} />
                              <Route path="pedidos" element={<Orders />} />
                              <Route path="ventas" element={<Sales />} />
                              <Route path="roles" element={<Roles />} />
                              <Route
                                path="Roles/:_id"
                                element={<RolesDetalles />}
                              />
                              <Route
                                path="catProveedores"
                                element={<CatProveedores />}
                              />
                            </Route>
                          </Routes>
                        </VentasProvider>
                      </PedidosProvider>
                    </ClientesProvider>
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
