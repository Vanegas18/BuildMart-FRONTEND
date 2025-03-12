import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import styles from "../Products/styles/Products.module.css";

export const FiltersContent = ({
  searchQuery,
  onSearchChange,
  activeFilters,
  onFilterChange,
  nameSection,
  section,
  data1,
  data2,
}) => {
  const handleCategoryFilter = (category) => {
    onFilterChange({
      ...activeFilters,
      category,
    });
  };

  const handleStatusFilter = (status) => {
    onFilterChange({
      ...activeFilters,
      status,
    });
  };

  return (
    <div className={styles.filtersContainer}>
      <CardTitle>{nameSection}</CardTitle>
      <div className="flex items-center gap-2">
        <Input
          type="search"
          placeholder={`Buscar ${section}...`}
          className={styles.searchInput}
          value={searchQuery}
          onChange={onSearchChange}
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
            {data1.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`${styles.filterDropdownItem} ${
                  activeFilters.category === category ? styles.activeFilter : ""
                }`}>
                {category}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Estado</DropdownMenuLabel>
            {data2.map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => handleStatusFilter(status)}
                className={`${styles.filterDropdownItem} ${
                  activeFilters.status === status ? styles.activeFilter : ""
                }`}>
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
