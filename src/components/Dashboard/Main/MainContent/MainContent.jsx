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

export const MainContent = () => {
  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <p className="text-gray-500">
          Bienvenido al panel de control de Build Mart
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid gap-6 mt-8 md:grid-cols-2">
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
