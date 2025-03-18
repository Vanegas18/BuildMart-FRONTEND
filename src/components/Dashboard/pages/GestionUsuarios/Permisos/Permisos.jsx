import { HeaderContent, HeaderProcess, PermisosContent } from "@/components";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShieldPlus } from "lucide-react";

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
