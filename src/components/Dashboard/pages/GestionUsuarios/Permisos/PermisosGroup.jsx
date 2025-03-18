import { Button } from "@/components/ui";
import { PermisosCheckbox } from "./PermisosCheckbox";

export const PermisosGroup = ({ title, permissions }) => {
  return (
    <div className="rounded-md border mb-5 shadow-black">
      <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
        <div className="font-medium">{title}</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Editar permisos
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {permissions.map((permission) => (
            <PermisosCheckbox
              key={permission.id}
              id={permission.id}
              label={permission.label}
              description={permission.description}
              checked={permission.checked}
              disabled={permission.disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
