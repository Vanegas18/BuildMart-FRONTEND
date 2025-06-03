import { Outlet } from "react-router-dom";
import { SidebarMain } from "../sideBar";

export const CuentaMain = () => {
  return (
    <main className="flex-1 w-full">
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl">
        <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-[280px_1fr]">
          <SidebarMain />
          <div className="space-y-4 sm:space-y-6 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};
