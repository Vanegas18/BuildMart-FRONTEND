import {
  MainContent,
  Permisos,
  Proveedores,
  Usuarios,
} from "@/components/Dashboard";
import { CategoriesProducts } from "@/components/Dashboard/pages/Categorias";
import {
  Roles,
  RolesDetalles,
} from "@/components/Dashboard/pages/GestionUsuarios/Roles";
import { Products } from "@/components/Dashboard/pages/Productos";
import { MainCuentaContent } from "@/components/PerfilCliente/Pages";
import { AuthProvider } from "@/context/AuthContext";
import {
  Catalogo,
  Compras,
  CuentaCliente,
  Dashboard,
  ErrorPage,
  Favoritos,
  LandingPage,
  Login,
  Pedidos,
  Perfil,
  Register,
} from "@/pages";
import { Routes, Route } from "react-router";
import { PrivateRoutes } from "./PrivateRoutes";
import { RecuperarContraseña, RestablecerContraseña } from "@/components";

export const AppRouter = () => {
  return (
    <AuthProvider>
      {/* RUTAS PUBLICAS */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/recuperar-contrasena" element={<RecuperarContraseña />} />
        <Route
          path="/restablecer-contrasena"
          element={<RestablecerContraseña />}
        />

        <Route element={<PrivateRoutes />}>
          {/* RUTAS DE MI CUENTA */}
          <Route path="/mi-cuenta" element={<CuentaCliente />}>
            <Route index element={<MainCuentaContent />} />
            <Route path="pedidos" element={<Pedidos />} />
            <Route path="compras" element={<Compras />} />
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
    </AuthProvider>
  );
};
