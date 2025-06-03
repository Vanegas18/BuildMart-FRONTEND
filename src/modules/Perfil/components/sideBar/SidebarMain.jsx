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
  Menu,
} from "lucide-react";
import { useMemo, useState } from "react";
import { ItemsSidebar } from ".";
import { useAuth } from "@/core/context";

export const SidebarMain = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <>
      {/* Botón de menú para móvil */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-2">
          <Menu className="h-4 w-4" />
          Menú de cuenta
        </Button>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden lg:block">
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col items-center space-y-4 pb-4 lg:pb-6 border-b">
              <Avatar className="h-16 w-16 lg:h-20 lg:w-20">
                <AvatarImage
                  src="/placeholder.svg?height=80&width=80"
                  alt="Avatar"
                />
                <AvatarFallback className="text-lg lg:text-xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center">
                <h2 className="text-lg lg:text-xl font-bold">{user.nombre}</h2>
                <p className="text-xs lg:text-sm text-gray-500">
                  Cliente desde 2025
                </p>
              </div>
            </div>
            <nav className="mt-4 lg:mt-6 flex flex-col space-y-1">
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

      {/* Sidebar móvil - Menu desplegable */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 pb-4 border-b">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src="/placeholder.svg?height=48&width=48"
                    alt="Avatar"
                  />
                  <AvatarFallback className="text-sm">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm">{user.nombre}</h3>
                  <p className="text-xs text-gray-500">Cliente desde 2025</p>
                </div>
              </div>
              <nav className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:space-y-1">
                {navItems.map((item) => (
                  <div
                    key={item.nameTab}
                    onClick={() => setIsMobileMenuOpen(false)}>
                    <ItemsSidebar
                      nameTab={item.nameTab}
                      icon={item.icon}
                      path={item.path}
                    />
                  </div>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
