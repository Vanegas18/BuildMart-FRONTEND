import {
  ClipboardList,
  DollarSign,
  ShoppingBag,
  UserCheck,
} from "lucide-react";
import styles from "./styles/MainContent.module.css";
import { useCallback, useEffect, useState } from "react";
import { dataOrders, MainCont, OrdersDashboard, ProductsDashboard } from ".";
import { getProducts } from "@/core/api";
import { useProductos } from "@/core/context";
import { StateDisplay } from "../../Layout";

export const MainContent = () => {
  const { obtenerProductos, productos } = useProductos();
  const [productosBajoStock, setProductosBajoStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Solo cargar si no hay productos ya
    if (!productos || productos.length === 0) {
      const fetchProductos = async () => {
        setLoading(true);
        try {
          await obtenerProductos();
        } catch (error) {
          setError("No se pudieron cargar los productos");
          console.error("Error al cargar productos:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductos();
    } else {
      setLoading(false);
    }
  }, [obtenerProductos, productos]);

  // Segundo useEffect para filtrar productos de bajo stock
  useEffect(() => {
    if (productos && productos.length > 0) {
      const bajoStock = productos.filter((producto) => producto.stock < 10);
      setProductosBajoStock(bajoStock);
    }
  }, [productos]);

  // Renderizado condicional para estados de carga y error
  if (loading || error || !productos?.length) {
    return (
      <StateDisplay
        loading={loading}
        empty={!loading && !error && !productos?.length}
        error={error}
      />
    );
  }

  return (
    <main className={styles.mainWrapper}>
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>Panel de Administración</h1>
        <p className={styles.subtitle}>
          Bienvenido al panel de control de Build Mart
        </p>
      </div>

      <div className={styles.cardsGrid}>
        <MainCont
          tittle={"Total Ventas"}
          icon={DollarSign}
          quantity={"$24,780"}
          info={"+12% desde el mes pasado"}
        />
        <MainCont
          tittle={"Nuevos Pedidos"}
          icon={ClipboardList}
          quantity={"45"}
          info={"+8% desde el mes pasado"}
        />
        <MainCont
          tittle={"Productos"}
          icon={ShoppingBag}
          quantity={productos.length}
          info={`${productosBajoStock.length} con bajo inventario`}
        />
        <MainCont
          tittle={"Clientes"}
          icon={UserCheck}
          quantity={"573"}
          info={"+24 nuevos este mes"}
        />
      </div>

      <div className={styles.dashboardsGrid}>
        <OrdersDashboard
          title={"Pedidos recientes"}
          description={"Últimos pedidos recibidos"}
          orders={dataOrders}
        />

        <ProductsDashboard
          title={"Productos con Bajo Stock"}
          description={"Productos con inventario menor a 10 unidades"}
          products={productosBajoStock.length > 0 ? productosBajoStock : []}
        />
      </div>
    </main>
  );
};
