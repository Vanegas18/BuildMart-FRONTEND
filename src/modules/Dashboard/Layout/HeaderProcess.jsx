import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import { Input } from "@/shared/components/ui/input";
import { ChevronDown } from "lucide-react";
import { CardTitle } from "@/shared/components/ui/card";
import styles from "../../PROCESOS/Productos/styles/Products.module.css";

export const HeaderProcess = ({ nameSection, section }) => {
  return (
    <div className={styles.filtersContainer}>
      <CardTitle>{nameSection}</CardTitle>
      <div className="flex items-center gap-2">
        <Input
          type="search"
          placeholder={`Buscar ${section}...`}
          className={styles.searchInput}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Filtrar
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Categorías</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Estado</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
