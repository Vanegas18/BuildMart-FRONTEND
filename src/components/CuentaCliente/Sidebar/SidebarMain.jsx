import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Home, LogOut, Package, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { ItemsSidebar } from ".";
import { Link } from "react-router";

export const SidebarMain = () => {
  const [activeTab, setActiveTab] = useState("Resumen");

  return (
    <div className="hidden md:block">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4 pb-6 border-b">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src="/placeholder.svg?height=80&width=80"
                alt="Avatar"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center">
              <h2 className="text-xl font-bold">Juan Pérez</h2>
              <p className="text-sm text-gray-500">Cliente desde 2022</p>
            </div>
          </div>
          <nav className="mt-6 flex flex-col space-y-1">
            <ItemsSidebar nameTab="Resumen" icon={Home} path="/mi-cuenta" />

            <ItemsSidebar
              nameTab="Mis pedidos"
              icon={ShoppingCart}
              path="/mi-cuenta/pedidos"
            />

            <ItemsSidebar
              nameTab="Mis Compras"
              icon={Package}
              path="/mi-cuenta/compras"
            />

            <ItemsSidebar
              nameTab="Favoritos"
              icon={Heart}
              path="/mi-cuenta/favoritos"
            />

            <ItemsSidebar
              nameTab="Mi Perfil"
              icon={User}
              path="/mi-cuenta/perfil"
            />
          </nav>
          <div className="mt-6 pt-6 border-t">
            <Link to={"/"}>
              <Button
                variant="outline"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
