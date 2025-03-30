import { Toaster } from "sonner";
import { AuthProvider } from "./core/context";
import { AppRouter } from "./core/routes/AppRouter";

export const BuildMart = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Toaster position="top-right" richColors />
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
};
