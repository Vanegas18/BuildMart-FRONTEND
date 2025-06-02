import { useAuth } from "@/core/context/Acceso/AuthContext";
import styles from "../../modules/PROCESOS/Productos/styles/Products.module.css";
import { Loader } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  // Obtener estado de autenticación del contexto
  const { isAuthenticated, loading } = useAuth();

  // Mostrar un componente de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={styles.loadingState}>
          <Loader className="animate-spin mr-2" size={40} />
        </div>
      </div>
    );
  }

  // Redireccionar si no está autenticado
  if (!isAuthenticated) return <Navigate to={"/"} replace />;

  // Renderizar rutas hijas si está autenticado
  return <>{children}</>;
};
