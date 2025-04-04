import { Button } from "@/shared/components/ui";
import { PermisosCheckbox } from "./PermisosCheckbox";

export const PermisosGroup = ({ title, permisos }) => {
  return (
    <div className="rounded-md border mb-5 shadow-black">
      <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
        <div className="font-medium">{title}</div>
        <div className="flex items-center gap-2">
          <Button size="sm">Editar permisos</Button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {permisos.map((permiso) => (
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
