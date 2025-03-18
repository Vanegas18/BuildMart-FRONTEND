import { useParams } from "react-router";
import { roles } from "./data/data";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DashboardHeader,
  DashboardShell,
} from "@/components/ui";
import { ArrowLeft, Edit, PlusCircle, Save, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "recharts";
import { Input } from "@/components/ui/input";
import RoleHeader from "./RoleHeader";
import RoleDetailsTab from "./RoleDetailsTab";
import RolePermissionsTab from "./RolePermissionsTab";
import RoleUsersTab from "./RoleUsersTab";

export const RolesDetalles = () => {
  const params = useParams();
  const roleID = params.id;
  const role = roles[roleID];

  const [activeTab, setActiveTab] = useState("details");
  const [isEditing, setIsEditing] = useState(false);
  const [roleName, setRoleName] = useState(role.name);
  const [roleDescription, setRoleDescription] = useState(role.description);
  const [permissions, setPermissions] = useState(role.permissions);

  const handlePermissionChange = (category, action, value) => {
    setPermissions((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [action]: value,
      },
    }));
  };

  const handleSave = () => {
    // Here would be the actual save logic
    setIsEditing(false);
  };

  return (
    <DashboardShell>
      <RoleHeader
        role={role}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSave={handleSave}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="permissions">Permisos</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <RoleDetailsTab
            role={role}
            isEditing={isEditing}
            roleName={roleName}
            setRoleName={setRoleName}
            roleDescription={roleDescription}
            setRoleDescription={setRoleDescription}
          />
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <RolePermissionsTab
            role={role}
            isEditing={isEditing}
            permissions={permissions}
            handlePermissionChange={handlePermissionChange}
          />
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <RoleUsersTab role={role} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
};
