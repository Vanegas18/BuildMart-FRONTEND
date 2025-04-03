import { DashboardHeader } from "@/shared/components/ui";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";

export const RoleHeader = ({ role }) => {
  return (
    <DashboardHeader>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{role.nombre}</h1>
            <p className="text-gray-500 mt-1">{role.descripcion}</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.history.back()}
          className="hover:bg-transparent p-0 h-8">
          <ArrowLeft className="h-4 w-4 mr-1 text-gray-500" />
          <span className="text-gray-500 font-normal">Volver a roles</span>
        </Button>
      </div>
    </DashboardHeader>
  );
};
