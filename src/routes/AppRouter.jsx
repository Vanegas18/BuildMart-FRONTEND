import { Routes, Route } from "react-router";
import { Catalogo, LandingPage, Login, Register } from "../pages";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/catalogo" element={<Catalogo />} />
      </Routes>
    </>
  );
};
