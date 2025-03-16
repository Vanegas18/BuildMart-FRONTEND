import { HeaderLanding } from "@/components/Landing";
import { CuentaMain } from "@/components/PerfilCliente";
import { FooterPerfil } from "@/components/PerfilCliente/Pages";

export const CuentaCliente = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <HeaderLanding />
      <CuentaMain />
      <FooterPerfil />
    </div>
  );
};
