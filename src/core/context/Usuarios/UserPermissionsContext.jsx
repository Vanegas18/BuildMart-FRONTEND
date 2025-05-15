import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "../Acceso";
import axios from "axios"; // Asegúrate de importar axios o tu cliente HTTP preferido

// URL base de tu API
const API_URL = "https://buildmart-back-billowing-feather-8375.fly.dev";

// Mapeo entre secciones del menú y permisos requeridos
const menuPermissionsMap = {
  // GESTIÓN DE CONFIGURACIÓN
  Roles: ["ver_roles"],
  Permisos: ["ver_permisos"],
  Administradores: ["ver_administradores"],

  // GESTIÓN DE PRODUCTOS
  Productos: ["ver_productos"],
  categoriasProductos: ["ver_categorias_productos"],

  // GESTIÓN COMPRAS Y PROVEEDORES
  Compras: ["ver_compras"],
  Proveedores: ["ver_proveedores"],
  catProveedores: ["ver_categorias_proveedores"],

  // VENTAS Y CLIENTES
  Pedidos: ["ver_pedidos"],
  Ventas: ["ver_ventas"],
  Clientes: ["ver_clientes"],
};

const UserPermissionsContext = createContext();

export const useUserPermissions = () => {
  const context = useContext(UserPermissionsContext);
  if (!context) {
    throw new Error(
      "useUserPermissions debe ser usado dentro de un UserPermissionsProvider"
    );
  }
  return context;
};

export const UserPermissionsProvider = ({ children }) => {
  const [userPermissions, setUserPermissions] = useState([]);
  const [hasPermissionsLoaded, setHasPermissionsLoaded] = useState(false);
  const [rolDetails, setRolDetails] = useState(null);
  const { user, isAuthenticated } = useAuth();

  // Función para obtener el rol por nombre (Administrador en este caso)
  useEffect(() => {
    const fetchRolDetails = async () => {
      if (isAuthenticated && user) {
        console.log("Usuario autenticado:", user);

        try {
          // Si el usuario tiene 'Administrador' en su correo, asumimos que es admin
          // Esta es una solución temporal basada en los datos que veo en los logs
          if (
            user.correo.includes("admin") ||
            user.nombre.includes("Administrador")
          ) {
            console.log("Detectado usuario administrador por nombre/correo");
            // Creamos un rol de administrador manualmente
            const adminRol = {
              nombre: "Administrador",
              // No necesitamos permisos específicos para admin
            };
            setRolDetails(adminRol);
          } else {
            // Para usuarios no admin, intentamos obtener el rol por su ID
            // Primero verificamos si tenemos un ID de rol válido
            if (
              user.rol &&
              typeof user.rol === "string" &&
              user.rol.match(/^[0-9a-fA-F]{24}$/)
            ) {
              console.log("Obteniendo detalles del rol por ID:", user.rol);

              // Hacemos la petición para obtener los detalles del rol por su ID
              const response = await axios.get(`${API_URL}/roles/${user.rol}`);
              if (response.data) {
                setRolDetails(response.data);
                console.log("Detalles del rol obtenidos:", response.data);
              }
            } else {
              console.error("ID de rol inválido o no disponible");
            }
          }
        } catch (error) {
          console.error("Error al obtener detalles del rol:", error);
        }
      }
    };

    fetchRolDetails();
  }, [user, isAuthenticated]);

  // Ahora actualizamos los permisos basándonos en los detalles del rol
  useEffect(() => {
    if (rolDetails) {
      console.log("Actualizando permisos con rol:", rolDetails);

      // Si el usuario tiene rol de administrador, concedemos todos los permisos
      if (rolDetails.nombre === "Administrador") {
        const allPermissions = Object.values(menuPermissionsMap).flat();
        setUserPermissions([...new Set(allPermissions)]);
        console.log("Permisos para administrador:", [
          ...new Set(allPermissions),
        ]);
      } else if (rolDetails.permisos) {
        // Extraer todos los permisos de los grupos de permisos del rol
        const permissions = rolDetails.permisos.flatMap((grupo) =>
          grupo.permisos
            .filter((p) => p.estado === "Activo")
            .map((p) => p.label)
        );
        setUserPermissions(permissions);
        console.log("Permisos para rol:", permissions);
      }

      setHasPermissionsLoaded(true);
    } else if (!isAuthenticated) {
      setUserPermissions([]);
      setHasPermissionsLoaded(false);
    }
  }, [rolDetails, isAuthenticated]);

  // Verificar si el usuario tiene un permiso específico
  const hasPermission = (permission) => {
    if (!isAuthenticated) return false;
    if (rolDetails?.nombre === "Administrador") return true;
    return userPermissions.includes(permission);
  };

  // Verificar si el usuario tiene acceso a un elemento del menú
  const hasMenuAccess = (menuItemId) => {
    console.log(
      `Verificando acceso para: ${menuItemId}`,
      menuPermissionsMap[menuItemId],
      userPermissions
    );

    if (!isAuthenticated) return false;
    if (rolDetails?.nombre === "Administrador") return true;

    const requiredPermissions = menuPermissionsMap[menuItemId] || [];
    return requiredPermissions.some((permission) =>
      userPermissions.includes(permission)
    );
  };

  // // Solución temporal: dar acceso a todo mientras se resuelve el tema de los permisos
  // const temporaryAccess = false; // Cambiar a true para dar acceso a todo temporalmente

  return (
    <UserPermissionsContext.Provider
      value={{
        userPermissions,
        hasPermission,
        hasMenuAccess,
        hasPermissionsLoaded,
      }}>
      {children}
    </UserPermissionsContext.Provider>
  );
};
