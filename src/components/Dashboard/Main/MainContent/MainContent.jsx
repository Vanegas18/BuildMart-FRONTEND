import {
  ClipboardList,
  DollarSign,
  ShoppingBag,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { MainCont } from ".";
import { OrdersDashboard, ProductsDashboard } from "../Content";
import { dataOrders, dataProducts } from "../Content/data";
import styles from "./styles/MainContent.module.css";

export const MainContent = () => {
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
          quantity={"128"}
          info={"12 con bajo inventario"}
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
          title={"Productos Más Vendidos"}
          description={"Top productos por ventas"}
          products={dataProducts}
        />
      </div>
    </main>
  );
};
