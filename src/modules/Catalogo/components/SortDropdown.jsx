"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components";

export default function SortDropdown({ value, onValueChange }) {
  const sortOptions = [
    { value: "featured", label: "Destacados" },
    { value: "newest", label: "Más recientes" },
    { value: "price-asc", label: "Precio: menor a mayor" },
    { value: "price-desc", label: "Precio: mayor a menor" },
    { value: "rating", label: "Mejor valorados" },
  ];

  const selectedOption =
    sortOptions.find((option) => option.value === value) || sortOptions[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-[180px] justify-between">
          <span>Ordenar por: {selectedOption.label}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className="flex items-center justify-between"
            onClick={() => onValueChange(option.value)}>
            {option.label}
            {option.value === value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
