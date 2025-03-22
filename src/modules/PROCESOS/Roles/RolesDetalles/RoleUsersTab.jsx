import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Users } from "lucide-react";
import UserCard from "./UseCard";

const RoleUsersTab = ({ role }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Usuarios con este Rol</CardTitle>
            <CardDescription>
              Usuarios que tienen asignado el rol de {role.name}
            </CardDescription>
          </div>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Asignar Usuarios
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {role.users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleUsersTab;
