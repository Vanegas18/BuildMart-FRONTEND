import { HeaderContent, HeaderProcess } from "@/modules/Dashboard/Layout";
import { UserPlus } from "lucide-react";
import { RolesContent } from "./RolesContent";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";

export const Roles = () => {
  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title={"Gestión de Roles"}
        icon={UserPlus}
        info={"Define roles con diferentes niveles de acceso y permisos"}
        newInfo={"Añadir Rol"}
      />

      <Card>
        <CardHeader>
          <HeaderProcess nameSection={"Listado de roles"} section={"roles"} />
        </CardHeader>
        <CardContent>
          <RolesContent />
        </CardContent>
      </Card>
    </main>
  );
};
