import { useAuth } from "@/core/context/Acceso/AuthContext";
import { Navigate, Outlet } from "react-router";

export const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to={"/"} replace />;
  return <Outlet />;
};
