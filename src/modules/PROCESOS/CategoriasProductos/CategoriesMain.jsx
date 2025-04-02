import { Button } from "@/shared/components";
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
import { CheckCircle2, XCircle } from "lucide-react";

export const CategoriesMain = ({
  refreshTrigger,
  currentPage = 1,
  itemsPerPage = 6,
  categorias,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { obtenerCategorias, isLoaded } = useCategoriaProductos();

  // Función para determinar la clase de estilo del estado
  const getStatusClass = useCallback((estado) => {
    switch (estado) {
      case "Activa":
        return "bg-green-100 text-green-800";
      case "Inactiva":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  }, []);

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
    <div className={styles.container}>
      {paginatedCategories.map((categoria) => (
        <Card key={categoria.categoriaId} className={styles.card}>
          <CardHeader className={styles.cardHeader}>
            <CardTitle className={styles.cardTitle}>
              {categoria.nombre}
            </CardTitle>
          </CardHeader>
          <CardContent className={styles.cardContent}>
            <div className={styles.contentWrapper}>
              <div>
                <p>{categoria.descripcion}</p>
              </div>
              <div className={styles.buttonGroup}>
                <div className={styles.buttonWrapper}>
                  {/* <div> */}
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
                  {/* </div> */}

                  <EditarCategoria
                    categoria={categoria}
                    onCategoriaEditada={() => {}}
                  />
                  <CambiarEstadoCategoria
                    categoria={categoria}
                    onEstadoCambiado={() => {}}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
