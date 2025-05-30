import {
  ClipboardList,
  DollarSign,
  ShoppingBag,
  UserCheck,
} from "lucide-react";
import styles from "./styles/MainContent.module.css";
import { useEffect, useState } from "react";
import { dataOrders, MainCont, OrdersDashboard, ProductsDashboard } from ".";
import {
  useClientes,
  usePedidos,
  useProductos,
  useVentas,
} from "@/core/context";
import { StateDisplay } from "../../Layout";
import { useProductFetching } from "../../hooks/useProductFetching";

export const MainContent = () => {
  // Hook context para manipular productos
  const { productos, loading, error } = useProductFetching();
  const [productosBajoStock, setProductosBajoStock] = useState([]);
  const { pedidos, obtenerPedidos } = usePedidos();
  const { clientes, obtenerClientes } = useClientes();
  const { ventas, obtenerVentas } = useVentas();
  const [totalVentas, setTotalVentas] = useState(0);

  const [infoVentas, setInfoVentas] = useState("+12% desde el mes pasado.");
  const [infoPedidos, setInfoPedidos] = useState("+8% desde el mes pasado.");
  const [infoClientes, setInfoClientes] = useState("+24 nuevos este mes.");

  useEffect(() => {
    obtenerPedidos();
    obtenerClientes();
    obtenerVentas();
  }, []);

  // useEffect para calcular el total de ventas
  useEffect(() => {
    if (ventas && ventas.length > 0) {
      // Calcula el total sumando el campo "total" de cada venta
      const sumaTotal = ventas.reduce((acumulador, venta) => {
        return acumulador + venta.total;
      }, 0);
      setTotalVentas(sumaTotal);
    }
  }, [ventas]);

  // useEffect para filtrar productos de bajo stock
  useEffect(() => {
    if (productos && productos.length > 0) {
      // Filtra productos con menos de 10 unidades en stock
      const bajoStock = productos.filter((producto) => producto.stock < 10);
      setProductosBajoStock(bajoStock);
    }
  }, [productos]);

  // useEffect para calcular información dinámica
  useEffect(() => {
    const fechaActual = new Date();
    const primerDiaMesActual = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth(),
      1
    );
    const primerDiaMesAnterior = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth() - 1,
      1
    );

    // Cálculo para ventas
    if (ventas && ventas.length > 0) {
      try {
        const ventasMesActual = ventas.filter(
          (venta) => new Date(venta.fecha) >= primerDiaMesActual
        );
        const ventasMesAnterior = ventas.filter(
          (venta) =>
            new Date(venta.fecha) >= primerDiaMesAnterior &&
            new Date(venta.fecha) < primerDiaMesActual
        );

        const totalMesActual = ventasMesActual.reduce(
          (sum, venta) => sum + venta.total,
          0
        );
        const totalMesAnterior = ventasMesAnterior.reduce(
          (sum, venta) => sum + venta.total,
          0
        );

        if (totalMesAnterior > 0) {
          const porcentajeCambio = Math.round(
            ((totalMesActual - totalMesAnterior) / totalMesAnterior) * 100
          );
          setInfoVentas(
            `${
              porcentajeCambio >= 0 ? "+" : ""
            }${porcentajeCambio}% desde el mes pasado.`
          );
        } else {
          setInfoVentas(`${ventasMesActual.length} ventas este mes.`);
        }
      } catch (error) {
        console.error("Error en cálculo de ventas:", error);
      }
    }

    // Cálculo para pedidos (usa el campo fecha)
    if (pedidos && pedidos.length > 0) {
      try {
        const pedidosMesActual = pedidos.filter(
          (pedido) => new Date(pedido.fecha) >= primerDiaMesActual
        );
        const pedidosMesAnterior = pedidos.filter(
          (pedido) =>
            new Date(pedido.fecha) >= primerDiaMesAnterior &&
            new Date(pedido.fecha) < primerDiaMesActual
        );

        if (pedidosMesAnterior.length > 0) {
          const porcentajeCambio = Math.round(
            ((pedidosMesActual.length - pedidosMesAnterior.length) /
              pedidosMesAnterior.length) *
              100
          );
          setInfoPedidos(
            `${
              porcentajeCambio >= 0 ? "+" : ""
            }${porcentajeCambio}% desde el mes pasado.`
          );
        } else {
          setInfoPedidos(`${pedidosMesActual.length} pedidos este mes.`);
        }
      } catch (error) {
        console.error("Error en cálculo de pedidos:", error);
      }
    }
  }, [ventas, pedidos, clientes]);

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
          Bienvenido al panel de control de Build Mart.
        </p>
      </div>

      {/* Grid de tarjetas informativas */}
      <div className={styles.cardsGrid}>
        <MainCont
          title={"Total Ventas"}
          icon={DollarSign}
          quantity={`$${totalVentas.toLocaleString()}`}
          info={infoVentas}
        />
        <MainCont
          title={"Nuevos Pedidos"}
          icon={ClipboardList}
          quantity={pedidos.length}
          info={infoPedidos}
        />
        <MainCont
          title={"Productos"}
          icon={ShoppingBag}
          quantity={productos.length}
          info={`${productosBajoStock.length} con bajo inventario.`}
        />
        <MainCont
          title={"Clientes"}
          icon={UserCheck}
          quantity={clientes.length}
          info={infoClientes}
        />
      </div>

      {/* Grid de dashboards */}
      <div className={styles.dashboardsGrid}>
        <OrdersDashboard
          title={"Pedidos recientes"}
          description={"Últimos pedidos recibidos."}
          orders={pedidos}
        />

        <ProductsDashboard
          title={"Productos con Bajo Stock"}
          description={"Productos con inventario menor a 10 unidades."}
          products={productosBajoStock.length > 0 ? productosBajoStock : []}
        />
      </div>
    </main>
  );
};
