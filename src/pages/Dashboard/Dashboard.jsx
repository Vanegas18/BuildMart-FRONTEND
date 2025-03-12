import { SidebarProvider } from "@/components/ui";
import { useState } from "react";
import { SidebarDashboard } from "@/components/Dashboard/Sidebar";
import { MainContent } from "@/components/Dashboard/Main";
import { HeaderDashboard } from "@/components/Dashboard/Main/Header";

export const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100">
        <SidebarDashboard />
        <div className="flex-1 flex flex-col">
          <HeaderDashboard />
          <MainContent />
        </div>
      </div>
    </SidebarProvider>
  );
};
