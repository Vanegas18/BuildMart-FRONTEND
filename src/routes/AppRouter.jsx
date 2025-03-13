import { Routes, Route } from "react-router";
import {
  Catalogo,
  CategoriesProducts,
  Compras,
  CuentaCliente,
  Dashboard,
  ErrorPage,
  Favoritos,
  LandingPage,
  Login,
  Pedidos,
  Perfil,
  Products,
  Register,
} from "../pages";
import { MainContent } from "@/components/Dashboard/Main";
import { MainCuentaContent } from "@/components/CuentaCliente";

export const AppRouter = () => {
  return (
    <>
      {/* RUTAS PUBLICAS */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/catalogo" element={<Catalogo />} />

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
          <Route path="categoriasProductos" element={<CategoriesProducts />} />
        </Route>
      </Routes>
    </>
  );
};
