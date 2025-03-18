import { permissionGroups } from "./data/data";
import { PermisosGroup } from "./PermisosGroup";

export const PermisosContent = () => {
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
