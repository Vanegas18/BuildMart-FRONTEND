import { DashboardHeader } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Save } from "lucide-react";

const RoleHeader = ({ role, isEditing, setIsEditing, handleSave }) => {
  return (
    <DashboardHeader
      heading={isEditing ? "Editar Rol" : `Rol: ${role.name}`}
      text={
        isEditing
          ? "Modifica los detalles y permisos del rol"
          : role.description
      }>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        {isEditing ? (
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar Rol
          </Button>
        )}
      </div>
    </DashboardHeader>
  );
};

export default RoleHeader;
