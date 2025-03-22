import { SidebarProvider } from "@/shared/components/ui";
import { Outlet } from "react-router";
import { SidebarDashboard } from "../components/Sidebar";
import { HeaderDashboard } from "../components/Header";

export const Dashboard = () => {

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
