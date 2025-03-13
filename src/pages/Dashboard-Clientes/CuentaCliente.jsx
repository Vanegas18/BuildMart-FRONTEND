import { HeaderLanding } from "@/Features";
import { CuentaMain, FooterPerfil } from "@/Features/Dashboard-Cliente";

export const CuentaCliente = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <HeaderLanding />
      <CuentaMain />
      <FooterPerfil />
    </div>
  );
};
