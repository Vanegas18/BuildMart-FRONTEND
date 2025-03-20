import {
  CardFooterAccess,
  FooterPerfil,
  FormRegister,
  HeaderAccess,
} from "@/components";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Register = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <HeaderAccess />

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md">
          {/* CARD HEADER */}
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Crear una cuenta
            </CardTitle>
            <CardDescription>
              Ingresa tus datos para registrarte en Build Mart
            </CardDescription>
          </CardHeader>

          {/* CARD CONTENT */}
          <FormRegister />

          {/* CARD FOOTER */}
          <CardFooterAccess info={"O regístrate con"} />
        </Card>
      </main>

      <FooterPerfil />
    </div>
  );
};
