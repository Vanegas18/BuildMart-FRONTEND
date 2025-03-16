import { MainContent } from "@/components/Dashboard";
import { CategoriesProducts } from "@/components/Dashboard/pages/Categorias";
import { Products } from "@/components/Dashboard/pages/Productos";
import { MainCuentaContent } from "@/components/PerfilCliente/Pages";
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
