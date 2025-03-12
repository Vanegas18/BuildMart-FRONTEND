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
import styles from "./styles/Products.module.css";
import { productStatuses, productCategories } from "./data/productsData";

export const ProductsFilters = ({
  searchQuery,
  onSearchChange,
  activeFilters,
  onFilterChange,
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
      <CardTitle>Listado de Productos</CardTitle>
      <div className="flex items-center gap-2">
        <Input
          type="search"
          placeholder="Buscar producto..."
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
            {productCategories.map((category) => (
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
            {productStatuses.map((status) => (
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
