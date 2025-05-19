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
import { usePedidos } from "@/core/context";
import { useEffect, useMemo } from "react";
import { FormateoPrecio } from "../../Layout";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export const OrdersDashboard = ({ title, description, orders = [] }) => {
  const { pedidos, obtenerPedidos } = usePedidos();

  useEffect(() => {
    obtenerPedidos();
  }, [pedidos]);

  // Obtener los 5 pedidos más recientes
  const pedidosRecientes = useMemo(() => {
    if (!pedidos || pedidos.length === 0) return [];

    // Ordenar los pedidos por fecha de creación (más reciente primero)
    const pedidosOrdenados = [...pedidos].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Tomar solo los primeros 5
    return pedidosOrdenados.slice(0, 5);
  }, [pedidos]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={styles.itemsContainer}>
          {/* Mapeo de los 5 pedidos más recientes */}
          {pedidosRecientes.map((order) => (
            <div key={order.pedidoId} className={styles.itemRow}>
              {/* Información de la orden */}
              <div>
                <p className={styles.itemTitle}>
                  PED-{order.pedidoId.toString().padStart(4, "0")}
                </p>
                <p className={styles.itemSubtitle}>{order.clienteId.nombre}</p>
              </div>
              {/* Información de precio y estado */}
              <div className="text-right">
                <p className={styles.itemValue}>
                  ${FormateoPrecio(order.total)}
                </p>
                <span>
                  <Badge
                    className={
                      order.estado === "pagado"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : order.estado === "pendiente"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }>
                    {order.estado === "pagado" ? (
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                    ) : order.estado === "pendiente" ? (
                      <Clock className="mr-1 h-3 w-3" />
                    ) : (
                      <XCircle className="mr-1 h-3 w-3" />
                    )}
                    {order.estado === "pagado"
                      ? "Pagado"
                      : order.estado === "pendiente"
                      ? "Pendiente"
                      : "Cancelado"}
                  </Badge>
                </span>
              </div>
            </div>
          ))}
          {/* Botón para ver todos los pedidos */}
          <Link to={"/dashboard/Pedidos"}>
            <Button variant="outline" className={styles.fullWidthButton}>
              Ver todos los pedidos
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
