import { usePermisos } from "@/core/context/Roles&Permisos/Permisos";
import { permissionGroups } from "./data/data";
import { PermisosGroup } from "./PermisosGroup";

export const PermisosContent = () => {
  const { permisos } = usePermisos();

  return (
    <>
      {permissionGroups.map((group, index) => (
        <PermisosGroup
          key={index}
          title={group.title}
          permissions={group.permissions}
        />
      ))}
    </>
  );
};
