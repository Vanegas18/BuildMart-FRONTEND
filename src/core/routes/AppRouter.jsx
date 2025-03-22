import { Routes, Route } from "react-router";

import { LandingPage } from "@/modules/Landing";

import { Login } from "@/modules/Accesso/Login/pages";
import { Registro } from "@/modules/Accesso/Registro/pages";
import { RecuperarContraseña, RestablecerContraseña } from "@/modules/Accesso";

import {
  Catalogo,
  ComprasPerfil,
  ErrorPage,
  Favoritos,
  Pedidos,
  Perfil,
  PerfilCliente,
} from "@/modules";

import { MainCuentaContent } from "@/modules/Perfil/components";

import { Dashboard } from "@/modules/Dashboard";
import { MainContent } from "@/modules/Dashboard/components/Main";
import {
  CategoriesProducts,
  Permisos,
  Products,
  Proveedores,
  Usuarios,
} from "@/modules/PROCESOS";
import { Roles } from "@/modules/PROCESOS/Roles/Roles";
import { RolesDetalles } from "@/modules/PROCESOS/Roles/RolesDetalles";
import { PrivateRoutes } from "./PrivateRoutes";
import { AuthProvider } from "@/core/context";
import { ProductosProvider } from "@/core/context/Productos";

export const AppRouter = () => {
  return (
    <AuthProvider>
      <ProductosProvider>
        {/* RUTAS PUBLICAS */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registro />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route
            path="/recuperar-contrasena"
            element={<RecuperarContraseña />}
          />
          <Route
            path="/restablecer-contrasena"
            element={<RestablecerContraseña />}
          />

          <Route element={<PrivateRoutes />}>
            {/* RUTAS DE MI CUENTA */}
            <Route path="/mi-cuenta" element={<PerfilCliente />}>
              <Route index element={<MainCuentaContent />} />
              <Route path="pedidos" element={<Pedidos />} />
              <Route path="compras" element={<ComprasPerfil />} />
              <Route path="favoritos" element={<Favoritos />} />
              <Route path="perfil" element={<Perfil />} />
            </Route>

            {/* RUTAS ADMINISTRADOR */}
            <Route path="/dashboard" element={<Dashboard />}>
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
              <Route path="Roles/:id" element={<RolesDetalles />} />
            </Route>
          </Route>
        </Routes>
      </ProductosProvider>
    </AuthProvider>
  );
};
