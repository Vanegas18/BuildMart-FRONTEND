import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Shield, Lock, CheckCircle, Key } from "lucide-react";

export const RolePermissionsTab = ({ role, permissionsData }) => {
  if (!role.permisos || role.permisos.length === 0) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center p-8">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <Shield className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium">No hay permisos asignados</h3>
            <p className="text-gray-500 text-center mt-2 max-w-md">
              Este rol no tiene permisos asignados actualmente. Los permisos
              controlan qué acciones puede realizar un usuario en el sistema.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Si solo hay un grupo, usamos un diseño de tarjetas en lugar de accordion
  const singleGroup = permissionsData.length === 1;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-1">
          <CardTitle>Permisos del Rol</CardTitle>
          <Badge variant="outline" className="text-xs font-normal">
            {role.permisos.length} permisos
          </Badge>
        </div>
        <p className="text-gray-500 text-sm">
          Lista de permisos asignados a este rol, agrupados por categoría.
        </p>
      </CardHeader>
      <CardContent>
        {singleGroup ? (
          // Diseño especial para un solo grupo
          <div className="border rounded-lg">
            <div className="bg-gray-50 px-4 py-3 rounded-t-lg border-b flex items-center gap-2">
              <Key className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">{permissionsData[0].nombreGrupo}</h3>
            </div>
            <div className="p-4 space-y-4">
              {permissionsData[0].permisos.map((permiso, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 py-2 border-b last:border-0">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{permiso.label}</p>
                    <p className="text-xs text-gray-500">
                      {permiso.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Accordion para múltiples grupos
          <div className="space-y-3">
            {permissionsData.map((grupoPermiso) => (
              <Accordion
                key={grupoPermiso._id}
                type="single"
                collapsible
                className="border rounded-lg overflow-hidden">
                <AccordionItem
                  value={grupoPermiso.nombreGrupo}
                  className="border-0">
                  <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 group">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4 text-gray-500" />
                      <span>{grupoPermiso.nombreGrupo}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-gray-50 border-t px-0 py-0">
                    <div className="divide-y">
                      {grupoPermiso.permisos.map((permiso, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              {permiso.label}
                            </p>
                            <p className="text-xs text-gray-500">
                              {permiso.descripcion}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
