import {
  ClipboardList,
  DollarSign,
  ShoppingBag,
  UserCheck,
} from "lucide-react";
import styles from "./styles/MainContent.module.css";
import { useEffect, useState } from "react";
import { dataOrders, MainCont, OrdersDashboard, ProductsDashboard } from ".";
import { useClientes, usePedidos, useProductos } from "@/core/context";
import { StateDisplay } from "../../Layout";
import { useProductFetching } from "../../hooks/useProductFetching";

export const MainContent = () => {
  // Hook context para manipular productos
  const { productos, loading, error } = useProductFetching();
  const [productosBajoStock, setProductosBajoStock] = useState([]);
  const { pedidos, obtenerPedidos } = usePedidos();
  const { clientes, obtenerClientes } = useClientes();

  useEffect(() => {
    obtenerPedidos();
    obtenerClientes();
  }, [pedidos, clientes]);

  // Effect para filtrar productos de bajo stock
  useEffect(() => {
    if (productos && productos.length > 0) {
      // Filtra productos con menos de 10 unidades en stock
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
      {/* Encabezado del panel */}
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>Panel de Administración</h1>
        <p className={styles.subtitle}>
          Bienvenido al panel de control de Build Mart
        </p>
      </div>

      {/* Grid de tarjetas informativas */}
      <div className={styles.cardsGrid}>
        <MainCont
          title={"Total Ventas"}
          icon={DollarSign}
          quantity={"$24,780"}
          info={"+12% desde el mes pasado"}
        />
        <MainCont
          title={"Nuevos Pedidos"}
          icon={ClipboardList}
          quantity={pedidos.length}
          info={"+8% desde el mes pasado"}
        />
        <MainCont
          title={"Productos"}
          icon={ShoppingBag}
          quantity={productos.length}
          info={`${productosBajoStock.length} con bajo inventario`}
        />
        <MainCont
          title={"Clientes"}
          icon={UserCheck}
          quantity={clientes.length}
          info={"+24 nuevos este mes"}
        />
      </div>

      {/* Grid de dashboards */}
      <div className={styles.dashboardsGrid}>
        <OrdersDashboard
          title={"Pedidos recientes"}
          description={"Últimos pedidos recibidos"}
          orders={pedidos}
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
