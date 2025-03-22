import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import {
  CheckCircle2,
  Edit,
  Eye,
  EyeOff,
  MoreHorizontal,
  Shield,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import { users } from "./data/datosGestion";
import { Badge } from "@/shared/components/ui/badge";
import styles from "../Productos/styles/Products.module.css";

export const UsuariosTable = () => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.productsTable}>
        <thead>
          <tr className={styles.tableHead}>
            <th className={styles.tableHeaderCell}>Usuario</th>
            <th className={styles.tableHeaderCell}>Email</th>
            <th className={styles.tableHeaderCell}>Rol</th>
            <th className={styles.tableHeaderCell}>Estado</th>
            <th className={styles.tableHeaderCell}>Última actividad</th>
            <th className={styles.tableHeaderCellRight}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={styles.tableRow}>
              <td className={styles.tableCell}>
                <div className={styles.productInfo}>
                  <User className={styles.productIconSvg} size={18} />
                  <span className={styles.productName}>{user.name}</span>
                </div>
              </td>

              <td className={styles.tableCellSmall}>{user.email}</td>
              <td className={styles.tableCellSmall}>
                <Badge
                  variant="outline"
                  className={
                    user.role === "Administrator"
                      ? "border-blue-500 text-blue-500"
                      : user.role === "Cliente"
                      ? "border-gray-500 text-gray-500"
                      : "border-green-500 text-green-500"
                  }>
                  {user.role}
                </Badge>
              </td>
              <td className={styles.tableCellSmall}>
                <Badge
                  className={
                    user.status === "Activo"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }>
                  {user.status === "Activo" ? (
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                  ) : (
                    <XCircle className="mr-1 h-3 w-3" />
                  )}
                  {user.status}
                </Badge>
              </td>
              <td className={styles.tableCellSmall}>{user.lastActive}</td>
              <td className={styles.tableCellSmall}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Cambiar rol</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {user.status === "Active" ? (
                        <>
                          <EyeOff className="mr-2 h-4 w-4" />
                          <span>Desactivar</span>
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Activar</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteUser(user)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Eliminar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
