import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { CalendarClock, FileText, Tag, Users, Lock } from "lucide-react";

export const RoleDetailsTab = ({ role }) => {
  const permisosArray = Array.isArray(role.permisos) ? role.permisos : [];

  // Formatear la fecha de creación usando el campo createdAt
  const formatearFecha = (fechaString) => {
    if (!fechaString) return "Fecha no disponible";

    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Determinar el estado basado en role.estado
  const esActivo = role.estado === "Activo";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Información del Rol</CardTitle>
            <CardDescription>
              Detalles básicos del rol y su propósito en el sistema
            </CardDescription>
          </div>
          <div>
            <Badge
              variant={esActivo ? "success" : "secondary"}
              className={`${
                esActivo
                  ? "bg-green-50 text-green-700"
                  : "bg-gray-100 text-red-700"
              }`}>
              {role.estado}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <Tag className="h-4 w-4" />
              <h3 className="text-sm font-medium">Nombre del Rol</h3>
            </div>
            <p className="text-lg font-medium">{role.nombre}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <CalendarClock className="h-4 w-4" />
              <h3 className="text-sm font-medium">Fecha de creación</h3>
            </div>
            <p className="text-base">{formatearFecha(role.createdAt)}</p>
          </div>

          <div className="sm:col-span-2 space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <FileText className="h-4 w-4" />
              <h3 className="text-sm font-medium">Descripción</h3>
            </div>
            <p className="text-base bg-gray-50 p-3 rounded-md">
              {role.descripcion}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 text-gray-500 mb-3">
            <Users className="h-4 w-4" />
            <h3 className="text-sm font-medium">Grupos de Permisos</h3>
          </div>

          {permisosArray.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {permisosArray.map((permiso) => (
                <div
                  key={permiso._id}
                  className="border bg-white rounded-md p-3 flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-blue-50 p-1.5 rounded">
                    <Lock className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">
                    {permiso.nombreGrupo}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-md p-4 text-center">
              <p className="text-gray-500">
                No hay permisos asignados a este rol
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
