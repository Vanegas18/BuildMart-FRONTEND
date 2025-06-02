import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/shared/components/ui";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { useRoles } from "@/core/context";
import { Loader } from "lucide-react";
import { RoleHeader } from "./RoleHeader";
import { RoleDetailsTab } from "./RoleDetailsTab";
import { RolePermissionsTab } from "./RolePermissionsTab";
import { TreePermissionsView } from "./TreePermissionsView"; // Importa el nuevo componente

export const RolesDetalles = () => {
  const params = useParams();
  const roleID = params._id;
  const { roles, obtenerRoles, isLoaded } = useRoles();

  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState("detalles");

  // Eliminar la comprobación de Mermaid ya que no la necesitamos más
  // El nuevo componente TreePermissionsView funciona sin dependencias externas

  // Cargar roles si no están cargados
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (!isLoaded) {
          await obtenerRoles();
        }
      } catch (error) {
        console.error("Error cargando roles:", error);
      }
    };

    loadData();
  }, [isLoaded, obtenerRoles]);

  // Buscar el rol específico cuando los roles estén cargados
  useEffect(() => {
    if (roles && roles.length > 0) {
      const foundRole = roles.find((r) => r._id === roleID);
      if (foundRole) {
        setRole(foundRole);
      }
      setLoading(false);
    }
  }, [roles, roleID]);

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <RoleHeader role={role} />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="detalles">Detalles</TabsTrigger>
          <TabsTrigger value="permisos">Permisos</TabsTrigger>
          <TabsTrigger value="jerarquia">Jerarquía</TabsTrigger>{" "}
          {/* Siempre mostrar esta pestaña */}
        </TabsList>

        <TabsContent value="detalles" className="space-y-4">
          <RoleDetailsTab role={role} />
        </TabsContent>

        <TabsContent value="permisos" className="space-y-4">
          <RolePermissionsTab
            role={role}
            permissionsData={role?.permisos || []}
          />
        </TabsContent>

        <TabsContent value="jerarquia" className="space-y-4">
          <TreePermissionsView role={role} /> {/* Usar el nuevo componente */}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
};
