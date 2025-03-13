import { Button } from "@/components";
import {
  Direcciones,
  InfoPersonal,
  Pagos,
} from "@/Features/Dashboard-Cliente/components/Content";

export const Perfil = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Guardar Cambios
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <InfoPersonal />

        <div className="space-y-6">
          <Direcciones />
          <Pagos />
        </div>
      </div>
    </>
  );
};
