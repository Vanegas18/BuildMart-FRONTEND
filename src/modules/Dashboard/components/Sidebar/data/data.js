import {
  ShoppingCart,
  Users,
  UserCog,
  Shield,
  ShoppingBag,
  FolderTree,
  Truck,
  ClipboardList,
  UserCheck,
  DollarSign,
} from "lucide-react";

export const menuSections = [
  {
    title: "GESTIÓN DE CONFIGURACIÓN",
    items: [
      {
        id: "Roles",
        label: "Roles",
        icon: UserCog,
      },
      {
        id: "Permisos",
        label: "Permisos",
        icon: Shield,
      },
      {
        id: "Administradores",
        label: "Administradores",
        icon: Users,
      },
    ],
  },
  {
    title: "GESTIÓN DE PRODUCTOS",
    items: [
      {
        id: "Productos",
        label: "Productos",
        icon: ShoppingBag,
      },
      {
        id: "categoriasProductos",
        label: "Categorías",
        icon: FolderTree,
      },
    ],
  },
  {
    title: "GESTIÓN COMPRAS Y PROVEEDORES",
    items: [
      {
        id: "Compras",
        label: "Compras",
        icon: ShoppingCart,
      },
      {
        id: "Proveedores",
        label: "Proveedores",
        icon: Truck,
      },
      {
        id: "catProveedores",
        label: "Categorías",
        icon: FolderTree,
      },
    ],
  },
  {
    title: "VENTAS Y CLIENTES",
    items: [
      {
        id: "Pedidos",
        label: "Pedidos",
        icon: ClipboardList,
      },
      {
        id: "Ventas",
        label: "Ventas",
        icon: DollarSign,
      },
      {
        id: "Clientes",
        label: "Clientes",
        icon: UserCheck,
      },
    ],
  },
];
