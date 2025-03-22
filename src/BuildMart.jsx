import { Toaster } from "sonner";
import { AppRouter } from "./core/routes";

export const BuildMart = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Toaster position="top-right" richColors />
      <AppRouter />
    </div>
  );
};
