import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import { Input } from "@/shared/components/ui/input";
import { ChevronDown } from "lucide-react";
import { CardTitle } from "@/shared/components/ui/card";
import styles from "../../PROCESOS/Productos/styles/Products.module.css";
import { memo } from "react";

export const HeaderProcess = memo(
  ({
    nameSection,
    section,
    searchTerm,
    onSearchChange,
    selectedStatus,
    onStatusChange,
    statusOptions = [],
  }) => {
    return (
      <div className="space-y-4 mb-4">
        {/* Título principal */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
            {nameSection}
          </CardTitle>

          {/* Botón de filtro móvil - solo visible en pantallas pequeñas */}
          <div className="block sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Filtrar por Estado
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Estado</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => onStatusChange("")}
                  className={!selectedStatus ? "bg-blue-50" : ""}>
                  Todos
                </DropdownMenuItem>
                {statusOptions.map((estado) => (
                  <DropdownMenuItem
                    key={estado}
                    onClick={() => onStatusChange(estado)}
                    className={selectedStatus === estado ? "bg-blue-50" : ""}>
                    {estado}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          {/* Input de búsqueda */}
          <div className="w-full sm:w-auto sm:flex-1 sm:max-w-md">
            <Input
              type="search"
              placeholder={`Buscar ${section}...`}
              className="w-full font-['Montserrat']"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Filtro de estado - solo visible en pantallas medianas y grandes */}
          <div className="hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {selectedStatus || "Todos los estados"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Estado</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => onStatusChange("")}
                  className={!selectedStatus ? "bg-blue-50" : ""}>
                  Todos
                </DropdownMenuItem>
                {statusOptions.map((estado) => (
                  <DropdownMenuItem
                    key={estado}
                    onClick={() => onStatusChange(estado)}
                    className={selectedStatus === estado ? "bg-blue-50" : ""}>
                    {estado}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  }
);
