import { Toaster } from "sonner";
import { AppRouter } from "./routes";

export const BuildMart = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Toaster position="top-right" richColors />
      <AppRouter />
    </div>
  );
};
