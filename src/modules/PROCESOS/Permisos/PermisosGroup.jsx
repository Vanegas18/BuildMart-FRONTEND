import { PermisosCheckbox } from "./PermisosCheckbox";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

export const PermisosGroup = ({ title, grupoPermiso, estado, permiso }) => {
  return (
    <div className="rounded-lg border mb-4 shadow-sm bg-white overflow-hidden">
      {/* Header responsivo */}
      <div className="bg-gray-50 p-3 sm:p-4 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="font-medium text-sm sm:text-base text-gray-900 truncate pr-2">
            {title}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge
              className={`text-xs px-2 py-1 ${
                estado === "Activo"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : "bg-red-100 text-red-800 hover:bg-red-100"
              }`}>
              {estado === "Activo" ? (
                <CheckCircle2 className="mr-1 h-3 w-3" />
              ) : (
                <XCircle className="mr-1 h-3 w-3" />
              )}
              {estado}
            </Badge>
          </div>
        </div>
      </div>

      {/* Grid de permisos responsivo */}
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-4">
          {grupoPermiso.map((permiso) => (
            <PermisosCheckbox
              key={permiso._id}
              id={permiso._id}
              label={permiso.label}
              description={permiso.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
