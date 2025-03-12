import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const ProductsDashboard = ({ title, description, products = [] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">Ventas: {product.sales}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{product.revenue}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    product.sales > 30
                      ? "bg-green-100 text-green-600"
                      : product.sales > 20
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}>
                  {product.sales > 30
                    ? "Alta demanda"
                    : product.sales > 20
                    ? "Demanda media"
                    : "Baja demanda"}
                </span>
              </div>
            </div>
          ))}
          <Link to={"/productos"}>
            <Button variant="outline" className="w-full">
              Ver todos los productos
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
