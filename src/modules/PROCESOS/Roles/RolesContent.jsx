import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { roles } from "./data/data";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import { Edit, MoreHorizontal, Trash2, UserCog } from "lucide-react";
import { Link } from "react-router";

export const RolesContent = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {roles.map((role) => (
        <Card key={role.id} className="overflow-hidden">
          <CardHeader className="bg-gray-50 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{role.name}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Editar rol</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserCog className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Gestionar permisos</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Eliminar rol</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <p className="text-base text-gray-500 mb-4 ">{role.description}</p>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium">{role.usersCount}</span>{" "}
                <span className="text-gray-500">
                  {role.usersCount === 1 ? "Usuario" : "Usuarios"}
                </span>
              </div>
              <Link to={`/dashboard/Roles/${role.id}`}>
                <Button size="sm">Ver detalles</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
