// Datos de permisos estructurados
export const permissionGroups = [
  {
    title: "Gestión de Usuarios",
    permissions: [
      {
        id: "users-view",
        label: "Ver usuarios",
        description: "Puede ver la lista de usuarios del sistema",
        checked: true,
        disabled: true,
      },
      {
        id: "users-create",
        label: "Crear usuarios",
        description: "Puede crear nuevos usuarios en el sistema",
        checked: true,
        disabled: true,
      },
      {
        id: "users-edit",
        label: "Editar usuarios",
        description: "Puede modificar la información de los usuarios",
        checked: true,
        disabled: true,
      },
      {
        id: "users-delete",
        label: "Eliminar usuarios",
        description: "Puede eliminar usuarios del sistema",
        checked: true,
        disabled: true,
      },
    ],
  },
  {
    title: "Gestión de Productos",
    permissions: [
      {
        id: "products-view",
        label: "Ver productos",
        description: "Puede ver la lista de productos",
        checked: true,
        disabled: true,
      },
      {
        id: "products-create",
        label: "Crear productos",
        description: "Puede crear nuevos productos",
        checked: true,
        disabled: true,
      },
      {
        id: "products-edit",
        label: "Editar productos",
        description: "Puede modificar la información de los productos",
        checked: true,
        disabled: true,
      },
      {
        id: "products-delete",
        label: "Eliminar productos",
        description: "Puede eliminar productos del sistema",
        checked: true,
        disabled: true,
      },
    ],
  },
  {
    title: "Gestión de Pedidos",
    permissions: [
      {
        id: "orders-view",
        label: "Ver pedidos",
        description: "Puede ver la lista de pedidos",
        checked: true,
        disabled: true,
      },
      {
        id: "orders-create",
        label: "Crear pedidos",
        description: "Puede crear nuevos pedidos",
        checked: true,
        disabled: true,
      },
      {
        id: "orders-edit",
        label: "Editar pedidos",
        description: "Puede modificar la información de los pedidos",
        checked: true,
        disabled: true,
      },
      {
        id: "orders-delete",
        label: "Cancelar pedidos",
        description: "Puede cancelar pedidos en el sistema",
        checked: true,
        disabled: true,
      },
    ],
  },
];
