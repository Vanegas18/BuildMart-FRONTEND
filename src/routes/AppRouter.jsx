import { Routes, Route } from "react-router";
import {
  Catalogo,
  CategoriesProducts,
  CuentaCliente,
  Dashboard,
  ErrorPage,
  LandingPage,
  Login,
  Products,
  Register,
} from "../pages";
import { MainContent } from "@/components/Dashboard/Main";

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
        <Route path="/mi-cuenta" element={<CuentaCliente />} />

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
