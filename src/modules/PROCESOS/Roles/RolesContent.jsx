import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import { Edit, MoreHorizontal, PowerCircleIcon, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useRoles } from "@/core/context";
import { useEffect, useMemo, useState } from "react";
import { StateDisplay } from "@/modules/Dashboard/Layout";

export const RolesContent = ({
  refreshTrigger,
  currentPage = 1,
  itemsPerPage = 5,
  roles,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { obtenerRoles, isLoaded } = useRoles();

  // Filtrar roles para la página actual
  const paginatedRoles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return roles.slice(startIndex, endIndex);
  }, [roles, currentPage, itemsPerPage]);

  // Obtener roles al montar el componente
  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        // Solo obtener categorías si aún no están cargadas
        if (!isLoaded) {
          await obtenerRoles();
        }
      } catch (error) {
        setError("No se pudieron cargar los roles");
        console.error("Error al cargar roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [refreshTrigger, obtenerRoles, isLoaded]);

  // Renderizado condicional para estados de carga y error
  if (loading || error || !roles?.length) {
    return (
      <StateDisplay
        loading={loading}
        empty={!loading && !error && !roles?.length}
        error={error}
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {paginatedRoles.map((role) => (
        <Card key={role._id} className="overflow-hidden">
          <CardHeader className="bg-gray-50 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{role.nombre}</CardTitle>
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <PowerCircleIcon className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Desactivar rol</span>
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
            <p className="text-base text-gray-500 mb-4 ">{role.descripcion}</p>
            <div className="flex items-center justify-between">
              <div className="text-sm"></div>
              <Link to={`/dashboard/Roles/${role._id}`}>
                <Button size="sm">Ver detalles</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
