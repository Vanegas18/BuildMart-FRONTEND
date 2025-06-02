import { Routes, Route } from "react-router-dom";
import { ErrorPage } from "@/modules";
// import { PublicRoutes } from "./PublicRoutes";
// import { ClientRoutes } from "./ClientRoutes";
// import { AdminRoutes } from "./AdminRoutes";
import { useAuth } from "../context";
import { Loader } from "lucide-react";
import styles from "../../modules/PROCESOS/Productos/styles/Products.module.css";
import { lazy, Suspense } from "react";

// Lazy load de rutas principales
const LazyPublicRoutes = lazy(() =>
  import("./PublicRoutes").then((module) => ({ default: module.PublicRoutes }))
);
const LazyClientRoutes = lazy(() =>
  import("./ClientRoutes").then((module) => ({ default: module.ClientRoutes }))
);
const LazyAdminRoutes = lazy(() =>
  import("./AdminRoutes").then((module) => ({ default: module.AdminRoutes }))
);

export const AppRouter = () => {
  const { loading } = useAuth();

  // Mostrar loader mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={styles.loadingState}>
          <Loader className="animate-spin mr-2" size={40} />
        </div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className={styles.loadingState}>
            <Loader className="animate-spin mr-2" size={40} />
          </div>
        </div>
      }>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/*" element={<LazyPublicRoutes />} />

        {/* RUTAS PROTEGIDAS */}
        <Route path="/mi-cuenta/*" element={<LazyClientRoutes />} />

        {/* RUTAS ADMINISTRADOR (DASHBOARD) */}
        <Route path="/dashboard/*" element={<LazyAdminRoutes />} />

        {/* Ruta de error */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};
