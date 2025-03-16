import {
  ClipboardList,
  DollarSign,
  ShoppingBag,
  UserCheck,
} from "lucide-react";
import styles from "./styles/MainContent.module.css";
import { useEffect, useState } from "react";
import { getFetch } from "@/services";
import { dataOrders, MainCont, OrdersDashboard, ProductsDashboard } from ".";

export const MainContent = () => {
  const [productos, setProductos] = useState([]);
  const [productosBajoStock, setProductosBajoStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getFetch("productos", { useCache: true });
        setProductos(data);

        // Filtrar productos con stock por debajo de 10
        const bajoStock = data.filter((producto) => producto.stock < 10);
        setProductosBajoStock(bajoStock);
      } catch (error) {
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

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
