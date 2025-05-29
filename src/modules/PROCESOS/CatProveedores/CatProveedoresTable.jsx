import React, { useEffect, useMemo, useState } from "react";
import { StateDisplay } from "../../Dashboard/Layout";
import { useCatProveedores } from "@/core/context/CatProveedores/CatProveedoresContext";
import styles from "../Productos/styles/Products.module.css";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components";
import { CheckCircle2, MoreHorizontal, XCircle } from "lucide-react";
import { EditarCatProveedor } from "./EditarCategoria/EditarCatProveedor";
import { CambiarEstado } from "./CambiarEstado/CambiarEstado";
import { Badge } from "@/shared/components/ui/badge";

export const CatProveedoresTable = ({
  refreshTrigger,
  currentPage = 1,
  itemsPerPage = 6,
  catProveedores,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { obtenerCatProveedores, isLoaded } = useCatProveedores();

  useEffect(() => {
    const fetchCatProveedores = async () => {
      setIsLoading(true);
      try {
        if (!isLoaded) {
          await obtenerCatProveedores();
        }
      } catch (error) {
        setError("No se pudieron cargar las categorías de proveedores");
        console.error("Error al cargar las categorias de proveedores:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCatProveedores();
  }, [refreshTrigger, obtenerCatProveedores, isLoaded]);

  // Filtrar productos para la página actual
  const paginatedCatProveedores = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return catProveedores.slice(startIndex, endIndex);
  }, [catProveedores, currentPage, itemsPerPage]);

  // Renderizado condicional para estados de carga y error
  if (isLoading || error || !catProveedores?.length) {
    return (
      <StateDisplay
        loading={isLoading}
        empty={!isLoading && !error && !catProveedores?.length}
        error={error}
        section={"categorías"}
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {paginatedCatProveedores.map((catProveedor) => (
        <Card key={catProveedor._id} className="overflow-hidden">
          <CardHeader className="bg-gray-50 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{catProveedor.nombre}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuSeparator />
                  <EditarCatProveedor
                    CatProveedor={catProveedor}
                    onCategoriaEditada={() => {}}
                  />
                  <DropdownMenuSeparator />
                  <CambiarEstado
                    categoria={catProveedor}
                    onEstadoCambiado={() => {}}
                  />
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <p className="text-base text-gray-500 mb-4 ">
              {catProveedor.descripcion}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Badge
                  className={
                    catProveedor.estado === "Activo"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }>
                  {catProveedor.estado === "Activo" ? (
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                  ) : (
                    <XCircle className="mr-1 h-3 w-3" />
                  )}
                  {catProveedor.estado === "Activo" ? "Activa" : "Inactiva"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CatProveedoresTable;
