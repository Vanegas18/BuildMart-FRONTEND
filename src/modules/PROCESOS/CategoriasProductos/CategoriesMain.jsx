import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import styles from "./styles/CategoriesMain.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StateDisplay } from "@/modules/Dashboard/Layout";
import { useCategoriaProductos } from "@/core/context/CategoriasProductos/CategoriasContext";
import { EditarCategoria } from "./EditarCategoria/EditarCategoria";
import { CambiarEstadoCategoria } from "./CambiarEstado/CambiarEstadoCategoria";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle2, MoreHorizontal, XCircle } from "lucide-react";

export const CategoriesMain = ({
  refreshTrigger,
  currentPage = 1,
  itemsPerPage = 6,
  categorias,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { obtenerCategorias, isLoaded } = useCategoriaProductos();

  // Obtener categorias al montar el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      try {
        // Solo obtener categorías si aún no están cargadas
        if (!isLoaded) {
          await obtenerCategorias();
        }
      } catch (error) {
        setError("No se pudieron cargar las categorías");
        console.error("Error al cargar las categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, [refreshTrigger, obtenerCategorias, isLoaded]);

  // Filtrar productos para la página actual
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return categorias.slice(startIndex, endIndex);
  }, [categorias, currentPage, itemsPerPage]);

  // Renderizado condicional para estados de carga y error
  if (loading || error || !categorias?.length) {
    return (
      <StateDisplay
        loading={loading}
        empty={!loading && !error && !categorias?.length}
        error={error}
        section={"categorías"}
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {paginatedCategories.map((categoria) => (
        <Card key={categoria.categoriaId} className="overflow-hidden">
          <CardHeader className="bg-gray-50 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{categoria.nombre}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuSeparator />
                  <EditarCategoria
                    categoria={categoria}
                    onCategoriaEditada={() => {}}
                  />
                  <DropdownMenuSeparator />
                  <CambiarEstadoCategoria
                    categoria={categoria}
                    onEstadoCambiado={() => {}}
                  />
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <p className="text-base text-gray-500 mb-4 ">
              {categoria.descripcion}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Badge
                  className={
                    categoria.estado === "Activa"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }>
                  {categoria.estado === "Activa" ? (
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                  ) : (
                    <XCircle className="mr-1 h-3 w-3" />
                  )}
                  {categoria.estado}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
