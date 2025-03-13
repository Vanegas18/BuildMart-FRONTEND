import { CuentaMain, Header } from "@/components";
import { FooterPerfil } from "@/components/CuentaCliente/Content";

export const CuentaCliente = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <CuentaMain />
      <FooterPerfil />
    </div>
  );
};
