import { Button } from "@/shared/components/ui";
import { Direcciones } from "./Direcciones";
import { Pagos } from "./Pagos";
import { InfoPersonal } from "./InfoPersonal";

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
