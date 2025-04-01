import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from "@/shared/components/ui";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  ArrowBigLeft,
  ArrowBigLeftDash,
  Heart,
  Home,
  LogOut,
  Package,
  ShoppingCart,
  User,
} from "lucide-react";
import { useMemo } from "react";
import { ItemsSidebar } from ".";
import { useAuth } from "@/core/context";

export const SidebarMain = () => {
  const { user } = useAuth();

  // Memorizamos los items del sidebar para evitar recreaciones innecesarias
  const navItems = useMemo(
    () => [
      { nameTab: "Resumen", icon: Home, path: "/mi-cuenta" },
      {
        nameTab: "Mis pedidos",
        icon: ShoppingCart,
        path: "/mi-cuenta/pedidos",
      },
      { nameTab: "Mis Compras", icon: Package, path: "/mi-cuenta/compras" },
      { nameTab: "Favoritos", icon: Heart, path: "/mi-cuenta/favoritos" },
      { nameTab: "Mi Perfil", icon: User, path: "/mi-cuenta/perfil" },
    ],
    []
  );

  // Obtener iniciales para el AvatarFallback
  const getInitials = () => {
    if (!user || !user.nombre) return "*"; // Fallback por defecto

    // Si tienes solo el nombre completo
    const nameParts = user.nombre.split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`;
    }

    return user.nombre.substring(0, 2);
  };

  return (
    <div className="hidden md:block">
      <Card className="mt-14">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4 pb-6 border-b">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src="/placeholder.svg?height=80&width=80"
                alt="Avatar"
              />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center">
              <h2 className="text-xl font-bold">{user.nombre}</h2>
              <p className="text-sm text-gray-500">Cliente desde 2025</p>
            </div>
          </div>
          <nav className="mt-6 flex flex-col space-y-1">
            {/* Renderizamos los items de manera dinámica */}
            {navItems.map((item) => (
              <ItemsSidebar
                key={item.nameTab}
                nameTab={item.nameTab}
                icon={item.icon}
                path={item.path}
              />
            ))}
          </nav>
        </CardContent>
      </Card>
    </div>
  );
};
