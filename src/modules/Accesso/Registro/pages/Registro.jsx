import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { CardFooterAccess, FooterPerfil, HeaderAccess } from "../../layout";
import { FormRegister } from "../components";

export const Registro = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <HeaderAccess />

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="">
          {/* CARD CONTENT */}
          <FormRegister />

        </Card>
      </main>

      <FooterPerfil />
    </div>
  );
};
