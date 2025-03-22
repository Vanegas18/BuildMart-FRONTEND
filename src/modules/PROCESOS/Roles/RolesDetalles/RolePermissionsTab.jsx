import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import PermissionCategory from "./PermissionCategory";

const RolePermissionsTab = ({
  role,
  isEditing,
  permissions,
  handlePermissionChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Permisos del Rol</CardTitle>
            <CardDescription>
              Configura los permisos específicos para este rol
            </CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Añadir Permiso
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <PermissionCategory
            title="Gestión de Usuarios"
            permissions={permissions.users}
            category="users"
            isEditing={isEditing}
            handlePermissionChange={handlePermissionChange}
          />

          <PermissionCategory
            title="Gestión de Productos"
            permissions={permissions.products}
            category="products"
            isEditing={isEditing}
            handlePermissionChange={handlePermissionChange}
          />

          <PermissionCategory
            title="Gestión de Pedidos"
            permissions={permissions.orders}
            category="orders"
            isEditing={isEditing}
            handlePermissionChange={handlePermissionChange}
          />

          <CustomPermissions role={role} isEditing={isEditing} />
        </div>
      </CardContent>
    </Card>
  );
};

const CustomPermissions = ({ role, isEditing }) => {
  return (
    <div className="rounded-md border mt-6">
      <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
        <div className="font-medium">Permisos Personalizados</div>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <CustomPermissionCheckbox
            id="reports-export"
            label="Exportar Reportes"
            description="Permite exportar reportes en diferentes formatos"
            checked={isEditing ? false : role.id === "1"}
            disabled={!isEditing}
          />
          <CustomPermissionCheckbox
            id="products-discounts"
            label="Gestionar Descuentos"
            description="Permite crear y gestionar descuentos para productos"
            checked={isEditing ? false : role.id === "1" || role.id === "2"}
            disabled={!isEditing}
          />
          <CustomPermissionCheckbox
            id="settings-advanced"
            label="Configuración Avanzada"
            description="Permite acceder y modificar configuraciones avanzadas del sistema"
            checked={isEditing ? false : role.id === "1"}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

const CustomPermissionCheckbox = ({
  id,
  label,
  description,
  checked,
  disabled,
}) => {
  return (
    <div className="flex items-start space-x-3">
      <Checkbox id={id} checked={checked} disabled={disabled} />
      <div className="space-y-1 leading-none">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default RolePermissionsTab;
