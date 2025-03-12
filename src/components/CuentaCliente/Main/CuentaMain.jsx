import { Outlet } from "react-router";
import { SidebarMain } from "../Sidebar";

export const CuentaMain = () => {
  return (
    <main className="flex-1 container py-8">
      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <SidebarMain />
        <div className="space-y-6">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
