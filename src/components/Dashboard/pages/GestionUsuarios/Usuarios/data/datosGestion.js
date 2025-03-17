// Mock data for users
export const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@buildmart.com",
    role: "Administrator",
    status: "Active",
    lastActive: "Hace 5 minutos",
    avatar: "/placeholder.svg?height=40&width=40&text=AU",
  },
  {
    id: "2",
    name: "María López",
    email: "maria@buildmart.com",
    role: "Editor",
    status: "Active",
    lastActive: "Hace 2 horas",
    avatar: "/placeholder.svg?height=40&width=40&text=ML",
  },
  {
    id: "3",
    name: "Carlos Ruiz",
    email: "carlos@buildmart.com",
    role: "Viewer",
    status: "Active",
    lastActive: "Hace 1 día",
    avatar: "/placeholder.svg?height=40&width=40&text=CR",
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana@buildmart.com",
    role: "Editor",
    status: "Inactive",
    lastActive: "Hace 2 semanas",
    avatar: "/placeholder.svg?height=40&width=40&text=AM",
  },
  {
    id: "5",
    name: "Pedro Sánchez",
    email: "pedro@buildmart.com",
    role: "Viewer",
    status: "Active",
    lastActive: "Hace 3 días",
    avatar: "/placeholder.svg?height=40&width=40&text=PS",
  },
];

// Mock data for roles
export const roles = [
  {
    id: "1",
    name: "Administrator",
    description: "Acceso completo a todas las funciones del sistema",
    usersCount: 1,
  },
  {
    id: "2",
    name: "Editor",
    description: "Puede editar contenido pero no puede gestionar usuarios ni configuraciones del sistema",
    usersCount: 2,
  },
  {
    id: "3",
    name: "Viewer",
    description: "Solo puede ver información, sin capacidad de edición",
    usersCount: 2,
  },
]
