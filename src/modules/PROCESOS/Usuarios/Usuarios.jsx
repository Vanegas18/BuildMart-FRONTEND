import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import {
  HeaderContent,
  HeaderProcess,
  PaginationContent,
} from "@/modules/Dashboard/Layout";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { UsuariosTable } from "./UsuariosTable";

export const Usuarios = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title={"Gestión de Usuarios"}
        info={"Administra los usuarios del sistema"}
        newInfo={"Añadir Usuario"}
        icon={UserPlus}
      />

      <Card>
        <CardHeader>
          <HeaderProcess
            nameSection={"Listado de Usuarios"}
            section={"usuarios"}
          />
        </CardHeader>
        <CardContent>
          <UsuariosTable />
          <PaginationContent
            currentPage={currentPage}
            itemsPerPage={10}
            nameSection={"usuarios"}
            totalItems={40}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </main>
  );
};
