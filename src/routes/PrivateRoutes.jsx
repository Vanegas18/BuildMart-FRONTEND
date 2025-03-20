import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router";

export const PrivateRoutes = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <h1>Cargando...</h1>
  if (!isAuthenticated) return <Navigate to={"/"} replace />;
  return <Outlet />;
};
