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
    statusOptions,
  }) => {
    // Utilizamos memo para prevenir re-renders innecesarios cuando los props no cambian
    return (
      <div className={styles.filtersContainer}>
        <CardTitle>{nameSection}</CardTitle>
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder={`Buscar ${section}...`}
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Filtrar
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Estado</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => onStatusChange("")}
                active={!selectedStatus}>
                Todos
              </DropdownMenuItem>
              {statusOptions.map((estado) => (
                <DropdownMenuItem
                  key={estado}
                  onClick={() => onStatusChange(estado)}
                  active={selectedStatus === estado}>
                  {estado}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }
);
