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
        path: "/roles",
      },
      {
        id: "Permisos",
        label: "Permisos",
        icon: Shield,
        path: "/permisos",
      },
      {
        id: "Usuarios",
        label: "Usuarios",
        icon: Users,
        path: "/usuarios",
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
        path: "/productos",
      },
      {
        id: "Categorías de Productos",
        label: "Categorías",
        icon: FolderTree,
        path: "/categoriasProductos",
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
        path: "/compras",
      },
      {
        id: "Proveedores",
        label: "Proveedores",
        icon: Truck,
        path: "/Proveedores",
      },
      {
        id: "Categorías de Proveedores",
        label: "Categorías",
        icon: FolderTree,
        path: "/categoriasProveedores",
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
        path: "/pedidos",
      },
      {
        id: "Ventas",
        label: "Ventas",
        icon: DollarSign,
        path: "/ventas",
      },
      {
        id: "Clientes",
        label: "Clientes",
        icon: UserCheck,
        path: "/clientes",
      },
    ],
  },
];
