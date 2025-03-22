  // Mock data for roles
  export const roles = {
    1: {
      id: "1",
      name: "Administrator",
      description: "Acceso completo a todas las funciones del sistema",
      usersCount: 1,
      users: [
        {
          id: "1",
          name: "Admin User",
          email: "admin@buildmart.com",
          avatar: "/placeholder.svg?height=40&width=40&text=AU",
        },
      ],
      permissions: {
        users: {
          view: true,
          create: true,
          edit: true,
          delete: true,
        },
        products: {
          view: true,
          create: true,
          edit: true,
          delete: true,
        },
        orders: {
          view: true,
          create: true,
          edit: true,
          delete: true,
        },
      },
    },
    2: {
      id: "2",
      name: "Cliente",
      description:
        "Puede editar contenido pero no puede gestionar usuarios ni configuraciones del sistema",
      usersCount: 2,
      users: [
        {
          id: "2",
          name: "María López",
          email: "maria@buildmart.com",
          avatar: "/placeholder.svg?height=40&width=40&text=ML",
        },
        {
          id: "4",
          name: "Ana Martínez",
          email: "ana@buildmart.com",
          avatar: "/placeholder.svg?height=40&width=40&text=AM",
        },
      ],
      permissions: {
        users: {
          view: true,
          create: false,
          edit: false,
          delete: false,
        },
        products: {
          view: true,
          create: true,
          edit: true,
          delete: false,
        },
        orders: {
          view: true,
          create: true,
          edit: true,
          delete: false,
        },
      },
    },
  };
