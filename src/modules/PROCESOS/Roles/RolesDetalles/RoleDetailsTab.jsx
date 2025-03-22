import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "recharts";

const RoleDetailsTab = ({
  role,
  isEditing,
  roleName,
  setRoleName,
  roleDescription,
  setRoleDescription,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del Rol</CardTitle>
        <CardDescription>
          Detalles básicos del rol y su propósito en el sistema
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {isEditing ? (
          <EditingView
            roleName={roleName}
            setRoleName={setRoleName}
            roleDescription={roleDescription}
            setRoleDescription={setRoleDescription}
          />
        ) : (
          <ViewingMode role={role} />
        )}
      </CardContent>
    </Card>
  );
};

const EditingView = ({
  roleName,
  setRoleName,
  roleDescription,
  setRoleDescription,
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="role-name">Nombre del Rol</Label>
        <Input
          id="role-name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role-description">Descripción</Label>
        <Input
          id="role-description"
          value={roleDescription}
          onChange={(e) => setRoleDescription(e.target.value)}
        />
      </div>
    </>
  );
};

const ViewingMode = ({ role }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Nombre del Rol</h3>
          <p className="mt-1">{role.name}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            Usuarios Asignados
          </h3>
          <p className="mt-1">{role.usersCount}</p>
        </div>
        <div className="col-span-2">
          <h3 className="text-sm font-medium text-gray-500">Descripción</h3>
          <p className="mt-1">{role.description}</p>
        </div>
      </div>

      <PermissionsSummary role={role} />
    </>
  );
};

const PermissionsSummary = ({ role }) => {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-500 mb-2">
        Resumen de Permisos
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <PermissionCategoryCard
          title="Usuarios"
          permissions={role.permissions.users}
        />
        <PermissionCategoryCard
          title="Productos"
          permissions={role.permissions.products}
        />
        <PermissionCategoryCard
          title="Pedidos"
          permissions={role.permissions.orders}
        />
      </div>
    </div>
  );
};

const PermissionCategoryCard = ({ title, permissions }) => {
  return (
    <div className="rounded-lg border p-3">
      <h4 className="font-medium mb-2">{title}</h4>
      <div className="space-y-1 text-sm">
        <PermissionItem
          name={`Ver ${title.toLowerCase()}`}
          value={permissions.view}
        />
        <PermissionItem
          name={`Crear ${title.toLowerCase()}`}
          value={permissions.create}
        />
        <PermissionItem
          name={`Editar ${title.toLowerCase()}`}
          value={permissions.edit}
        />
        <PermissionItem
          name={`Eliminar ${title.toLowerCase()}`}
          value={permissions.delete}
        />
      </div>
    </div>
  );
};

const PermissionItem = ({ name, value }) => {
  return (
    <p className={value ? "text-green-600" : "text-red-600"}>
      {value ? "✓" : "✗"} {name}
    </p>
  );
};

export default RoleDetailsTab;
