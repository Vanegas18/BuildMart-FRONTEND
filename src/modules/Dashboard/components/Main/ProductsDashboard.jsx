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
import { Badge } from "@/shared/components/ui/badge";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  CheckCircle2,
} from "lucide-react";

export const ProductsDashboard = ({ title, description, products }) => {
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
                  <span>
                    <Badge
                      className={
                        product.stock <= 3
                          ? "bg-red-100 text-red-800 hover:bg-red-100"
                          : product.stock <= 7
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          : "bg-green-100 text-green-800 hover:bg-green-100"
                      }>
                      {product.stock <= 3 ? (
                        <AlertCircle className="mr-1 h-3 w-3" />
                      ) : product.stock <= 7 ? (
                        <AlertTriangle className="mr-1 h-3 w-3" />
                      ) : (
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                      )}
                      {product.stock <= 3
                        ? "Crítico"
                        : product.stock <= 7
                        ? "Bajo"
                        : "Aceptable"}
                    </Badge>
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
