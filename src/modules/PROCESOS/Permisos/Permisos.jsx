import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { HeaderContent, HeaderProcess } from "@/modules/Dashboard/Layout";
import { ShieldPlus } from "lucide-react";
import { PermisosContent } from "./PermisosContent";

export const Permisos = () => {
  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title={"Gestión de Permisos"}
        info={"Define permisos granulares para cada rol del sistema"}
        newInfo={"Añadir Permiso"}
        icon={ShieldPlus}
      />

      <Card>
        <CardHeader>
          <HeaderProcess
            nameSection={"Listado de Permisos"}
            section={"permisos"}
          />
        </CardHeader>
        <CardContent>
          <PermisosContent />
        </CardContent>
      </Card>
    </main>
  );
};
