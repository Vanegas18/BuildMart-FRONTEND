import { Button } from "@/shared/components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import styles from "./styles/CategoriesMain.module.css";
import { useEffect, useMemo, useState } from "react";
import { StateDisplay } from "@/modules/Dashboard/Layout";
import { useCategoriaProductos } from "@/core/context/CategoriasProductos/CategoriasContext";

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
      />
    );
  }

  return (
    <div className={styles.container}>
      {paginatedCategories.map((categoria) => (
        <Card key={categoria._id} className={styles.card}>
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
                <Button variant="outline" size="">
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size=""
                  className={styles.deleteButton}>
                  {categoria.estado === "Activa" ? "Desactivar" : "Activar"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
