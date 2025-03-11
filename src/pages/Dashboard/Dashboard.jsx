import { SidebarProvider } from "@/components/ui";
import { useState } from "react";
import { SidebarDashboard } from "@/components/Dashboard/Sidebar";

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-gray-100">
        <SidebarDashboard />;
      </div>
    </SidebarProvider>
  );
};
