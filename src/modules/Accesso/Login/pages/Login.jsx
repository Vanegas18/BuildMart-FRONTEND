import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { CardFooterAccess, FooterPerfil, HeaderAccess } from "../../layout";
import { FormLogin } from "../components";

export const Login = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <HeaderAccess />

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md">
          {/* CARD HEADER */}
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder a tu cuenta
            </CardDescription>
          </CardHeader>

          {/* CARD CONTENT */}
          <FormLogin />

        </Card>
      </main>

      <FooterPerfil />
    </div>
  );
};
