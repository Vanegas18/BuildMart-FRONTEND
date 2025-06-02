import { Route, Routes } from "react-router-dom";
import {
  Catalogo,
  LandingPage,
  Login,
  RecuperarContraseña,
  Registro,
  RestablecerContraseña,
} from "@/modules";
import Legal from "@/modules/Landing/components/footer/Legal";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registro />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/recuperar-contrasena" element={<RecuperarContraseña />} />
      <Route
        path="/restablecer-contrasena"
        element={<RestablecerContraseña />}
      />
      <Route path="/legal" element={<Legal />} />
    </Routes>
  );
};
