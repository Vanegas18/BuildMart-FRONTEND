import { FooterLanding, HeaderLanding } from "../components";
import {
  BeneficiosLanding,
  Contacto,
  ImgPrincipal,
  MasInfo,
  ProyectosLanding,
  ServiciosLanding,
} from "../components/main";

export const LandingPage = () => {
  return (
    <>
      <HeaderLanding />
      <ImgPrincipal />
      <ServiciosLanding />
      <BeneficiosLanding />
      <ProyectosLanding />
      <MasInfo />
      <Contacto />
      <FooterLanding />
    </>
  );
};
