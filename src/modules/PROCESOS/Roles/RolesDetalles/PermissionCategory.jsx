import PermissionCheckbox from "./PermissionCheckbox";

const PermissionCategory = ({
  title,
  permissions,
  category,
  isEditing,
  handlePermissionChange,
}) => {
  return (
    <div className="rounded-md border">
      <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
        <div className="font-medium">{title}</div>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <PermissionCheckbox
            id={`${category}-view`}
            label={`Ver ${category}`}
            description={`Puede ver la lista de ${category}`}
            checked={permissions.view}
            disabled={!isEditing}
            onChange={(checked) =>
              handlePermissionChange(category, "view", checked)
            }
          />
          <PermissionCheckbox
            id={`${category}-create`}
            label={`Crear ${category}`}
            description={`Puede crear nuevos ${category} en el sistema`}
            checked={permissions.create}
            disabled={!isEditing}
            onChange={(checked) =>
              handlePermissionChange(category, "create", checked)
            }
          />
          <PermissionCheckbox
            id={`${category}-edit`}
            label={`Editar ${category}`}
            description={`Puede modificar la información de los ${category}`}
            checked={permissions.edit}
            disabled={!isEditing}
            onChange={(checked) =>
              handlePermissionChange(category, "edit", checked)
            }
          />
          <PermissionCheckbox
            id={`${category}-delete`}
            label={`Eliminar ${category}`}
            description={`Puede eliminar ${category} del sistema`}
            checked={permissions.delete}
            disabled={!isEditing}
            onChange={(checked) =>
              handlePermissionChange(category, "delete", checked)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PermissionCategory;
