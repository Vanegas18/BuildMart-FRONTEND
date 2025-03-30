import { Routes, Route } from "react-router";
import { ErrorPage } from "@/modules";
import { PublicRoutes } from "./PublicRoutes";
import { ClientRoutes } from "./ClientRoutes";
import { AdminRoutes } from "./AdminRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path="/*" element={<PublicRoutes />} />

      {/* RUTAS PROTEGIDAS */}
      <Route path="/mi-cuenta/*" element={<ClientRoutes />} />

      {/* RUTAS ADMINISTRADOR (DASHBOARD) */}
      <Route path="/dashboard/*" element={<AdminRoutes />} />

      {/* Ruta de error */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
