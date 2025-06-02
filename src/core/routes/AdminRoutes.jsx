import { Route, Routes } from "react-router-dom";
import {
  ClientesProvider,
  ComprasProvider,
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
import { ProviderComposer } from "../context/ProviderComposer";
import { Compras } from "@/modules/PROCESOS/Compras";
import { UserPermissionsProvider } from "../context/Usuarios/UserPermissionsContext";

export const AdminRoutes = () => {
  const providers = [
    <ProductosProvider key="productos" />,
    <CategoriaProductosProvider key="categorias" />,
    <PermisosProvider key="permisos" />,
    <UserPermissionsProvider key="userPermissions" />,
    <RolesProvider key="roles" />,
    <UsuariosProvider key="usuarios" />,
    <CatProveedoresProvider key="categoriasProveedores" />,
    <ProveedoresProvider key="proveedores" />,
    <ClientesProvider key="clientes" />,
    <PedidosProvider key="pedidos" />,
    <VentasProvider key="ventas" />,
    <ComprasProvider key="compras" />,
  ];
  return (
    <ProtectedRoutes>
      <ProviderComposer contexts={providers}>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<MainContent />} />
            <Route path="productos" element={<Products />} />
            <Route
              path="categoriasProductos"
              element={<CategoriesProducts />}
            />

            <Route path="proveedores" element={<Proveedores />} />
            <Route path="Administradores" element={<Usuarios />} />
            <Route path="permisos" element={<Permisos />} />
            <Route path="clientes" element={<Clients />} />
            <Route path="pedidos" element={<Orders />} />
            <Route path="ventas" element={<Sales />} />
            <Route path="roles" element={<Roles />} />
            <Route path="Roles/:_id" element={<RolesDetalles />} />
            <Route path="catProveedores" element={<CatProveedores />} />
            <Route path="compras" element={<Compras />} />
          </Route>
        </Routes>
      </ProviderComposer>
    </ProtectedRoutes>
  );
};
