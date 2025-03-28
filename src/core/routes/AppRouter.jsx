// Importaciones de React Router
import { Routes, Route } from "react-router";
import { ROUTES } from "./routes";

// Importaciones de Providers (Contextos)
import { AuthProvider } from "@/core/context";
import { ProductosProvider } from "@/core/context/Productos";
import { PrivateRoutes } from "./PrivateRoutes";

// Importaciones de páginas públicas
import { LandingPage } from "@/modules/Landing";
import { ErrorPage } from "@/modules";
import { Login } from "@/modules/Accesso/Login/pages";
import { Registro } from "@/modules/Accesso/Registro/pages";
import { RecuperarContraseña, RestablecerContraseña } from "@/modules/Accesso";
import { Catalogo } from "@/modules";

// Importaciones de módulos de perfil de cliente
import {
  PerfilCliente,
  Perfil,
  Pedidos,
  ComprasPerfil,
  Favoritos,
} from "@/modules";
import { MainCuentaContent } from "@/modules/Perfil/components";

// Importaciones de módulos del Dashboard (Admin)
import { Dashboard } from "@/modules/Dashboard";
import { MainContent } from "@/modules/Dashboard/components/Main";

// Importaciones de módulos de PROCESOS (Admin)
import {
  CategoriesProducts,
  Permisos,
  Products,
  Proveedores,
  Usuarios,
} from "@/modules/PROCESOS";
import { Roles } from "@/modules/PROCESOS/Roles/Roles";
import { RolesDetalles } from "@/modules/PROCESOS/Roles/RolesDetalles";
import { PermisosProvider } from "../context/Roles&Permisos/Permisos/PermisosContext";
import { CategoriaProductosProvider } from "../context/CategoriasProductos/CategoriasContext";

export const AppRouter = () => {
  return (
    <AuthProvider>
      <ProductosProvider>
        <PermisosProvider>
          <CategoriaProductosProvider>
            <Routes>
              {/* RUTAS PÚBLICAS */}
              <Route path={ROUTES.HOME} element={<LandingPage />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.REGISTER} element={<Registro />} />
              <Route path={ROUTES.CATALOGO} element={<Catalogo />} />
              <Route
                path={ROUTES.RECUPERAR_CONTRASENA}
                element={<RecuperarContraseña />}
              />
              <Route
                path={ROUTES.RESTABLECER_CONTRASENA}
                element={<RestablecerContraseña />}
              />

              {/* RUTAS PROTEGIDAS */}
              <Route element={<PrivateRoutes />}>
                {/* RUTAS DE MI CUENTA (CLIENTE) */}
                <Route path={ROUTES.MI_CUENTA} element={<PerfilCliente />}>
                  <Route index element={<MainCuentaContent />} />
                  <Route path={ROUTES.PEDIDOS} element={<Pedidos />} />
                  <Route path={ROUTES.COMPRAS} element={<ComprasPerfil />} />
                  <Route path={ROUTES.FAVORITOS} element={<Favoritos />} />
                  <Route path={ROUTES.PERFIL} element={<Perfil />} />
                </Route>

                {/* RUTAS ADMINISTRADOR (DASHBOARD) */}
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />}>
                  <Route index element={<MainContent />} />
                  <Route path={ROUTES.PRODUCTOS} element={<Products />} />
                  <Route
                    path={ROUTES.CATEGORIAS_PRODUCTOS}
                    element={<CategoriesProducts />}
                  />
                  <Route path={ROUTES.PROVEEDORES} element={<Proveedores />} />
                  <Route path={ROUTES.USUARIOS} element={<Usuarios />} />
                  <Route path={ROUTES.PERMISOS} element={<Permisos />} />
                  <Route path={ROUTES.ROLES} element={<Roles />} />
                  <Route
                    path={ROUTES.ROLES_DETALLE}
                    element={<RolesDetalles />}
                  />
                </Route>
              </Route>

              <Route path={ROUTES.NOT_FOUND} element={<ErrorPage />} />
            </Routes>
          </CategoriaProductosProvider>
        </PermisosProvider>
      </ProductosProvider>
    </AuthProvider>
  );
};
