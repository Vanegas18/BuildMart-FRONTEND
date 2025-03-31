import { Routes, Route } from "react-router";
import { ErrorPage } from "@/modules";
import { PublicRoutes } from "./PublicRoutes";
import { ClientRoutes } from "./ClientRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { useAuth } from "../context";
import { Loader } from "lucide-react";
import styles from "../../modules/PROCESOS/Productos/styles/Products.module.css";

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
