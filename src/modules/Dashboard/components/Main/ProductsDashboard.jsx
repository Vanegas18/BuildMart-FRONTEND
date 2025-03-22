import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router";
import styles from "./styles/ContentDashboard.module.css";
import { FormateoPrecio } from "../../Layout";
import { useMemo } from "react";

export const ProductsDashboard = ({ title, description, products }) => {
  // Función que determina la clase CSS basada en el nivel de stock
  const getStockClass = (stock) => {
    if (stock <= 3) {
      return styles.demandHigh; // Nivel crítico
    } else if (stock <= 7) {
      return styles.demandMedium; // Nivel bajo
    } else {
      return styles.demandLow; // Nivel aceptable
    }
  };

  // Función que determina el texto a mostrar según el nivel de stock
  const getStockText = (stock) => {
    if (stock <= 3) {
      return "Crítico";
    } else if (stock <= 7) {
      return "Bajo";
    } else {
      return "Aceptable";
    }
  };

  // Memorizamos los productos ordenados por nivel de stock (más críticos primero)
  const sortedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...products].sort((a, b) => a.stock - b.stock);
  }, [products]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={styles.itemsContainer}>
          {/* Renderizado condicional: mostrar productos o mensaje de no hay productos */}
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product, index) => (
              <div key={product.id || index} className={styles.itemRow}>
                {/* Información del producto */}
                <div>
                  <p className={styles.itemTitle}>{product.nombre}</p>
                  <p className={styles.itemSubtitle}>Stock: {product.stock}</p>
                </div>
                {/* Información de precio y estado del stock */}
                <div className="text-right">
                  <p className={styles.itemValue}>
                    ${FormateoPrecio(product.precio)}
                  </p>
                  <span
                    className={`${styles.statusBadge} ${getStockClass(
                      product.stock
                    )}`}>
                    {getStockText(product.stock)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noItemsMessage}>
              No hay productos con bajo stock
            </p>
          )}
          {/* Botón para ir a administrar inventario */}
          <Link to={"productos"}>
            <Button variant="outline" className={styles.fullWidthButton}>
              Administrar inventario
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
