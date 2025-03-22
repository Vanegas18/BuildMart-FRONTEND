import { SidebarProvider } from "@/shared/components/ui";
import { Outlet, useLocation } from "react-router";
import { SidebarDashboard } from "../components/Sidebar";
import { HeaderDashboard } from "../components/Header";

export const Dashboard = () => {
  const location = useLocation();

  // Extraemos la sección activa de la URL
  const path = location.pathname;
  const section = path.split("/")[2] || "dashboard"; // Si es /dashboard obtiene "dashboard", si es /dashboard/productos obtiene "productos"

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100">
        <SidebarDashboard />
        <div className="flex-1 flex flex-col">
          <HeaderDashboard />
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};
