import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const OrdersDashboard = ({ title, description, orders = [] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-gray-500">{order.customer}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{order.amount}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "Completado"
                      ? "bg-green-100 text-green-600"
                      : order.status === "Procesando"
                      ? "bg-blue-100 text-blue-600"
                      : order.status === "Pendiente"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-purple-100 text-purple-600"
                  }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
          <Link to={"/pedidos"}>
            <Button variant="outline" className="w-full">
              Ver todos los pedidos
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
