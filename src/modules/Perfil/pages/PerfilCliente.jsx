import { HeaderLanding } from "@/modules/Landing/components";
import { CuentaMain } from "../components";
import { FooterPerfil } from "@/modules/Accesso/layout";

export const PerfilCliente = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <HeaderLanding />
      <CuentaMain />
      <FooterPerfil />
    </div>
  );
};
