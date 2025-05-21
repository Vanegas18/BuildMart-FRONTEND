import { PermisosCheckbox } from "./PermisosCheckbox";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import { EditarPermiso } from "./EditarPermiso/EditarPermiso";
import { CambiarEstadoPermiso } from "./CambiarEstado/CambiarEstadoPermiso";

export const PermisosGroup = ({ title, grupoPermiso, estado, permiso }) => {
  return (
    <div className="rounded-md border mb-5 shadow-black">
      <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
        <div className="font-medium">{title}</div>
        <div className="flex items-center gap-2">
          <Badge
            className={
              estado === "Activo"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : "bg-red-100 text-red-800 hover:bg-red-100"
            }>
            {estado === "Activo" ? (
              <CheckCircle2 className="mr-1 h-3 w-3" />
            ) : (
              <XCircle className="mr-1 h-3 w-3" />
            )}
            {estado}
          </Badge>
          {/* <EditarPermiso onPermisoEditado={() => {}} permisos={permiso} />
          <CambiarEstadoPermiso onEstadoCambiado={() => {}} permiso={permiso} /> */}
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
