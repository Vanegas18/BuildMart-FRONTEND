import { HeaderContent, HeaderProcess, RolesContent } from "@/components";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

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
