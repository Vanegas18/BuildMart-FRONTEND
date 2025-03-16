import {
  Benefits,
  Contact,
  Cta,
  Footer,
  HeaderLanding,
  Main,
  ProductsLanding,
  Projects,
} from "@/components/Landing";

export const LandingPage = () => {
  return (
    <>
      <HeaderLanding />
      <Main />
      <ProductsLanding />
      <Benefits />
      <Projects />
      <Cta />
      <Contact />
      <Footer />
    </>
  );
};
