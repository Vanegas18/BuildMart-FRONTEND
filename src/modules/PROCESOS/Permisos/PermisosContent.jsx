import { usePermisos } from "@/core/context/Roles&Permisos/Permisos";
import { PermisosGroup } from "./PermisosGroup";
import { useEffect, useState } from "react";
import { StateDisplay } from "@/modules/Dashboard/Layout";

export const PermisosContent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { permisos, obtenerPermisos } = usePermisos();

  // Carga de permisos
  useEffect(() => {
    if (!permisos || permisos.length === 0) {
      const fetchPermisos = async () => {
        setLoading(true);
        try {
          await obtenerPermisos();
        } catch (error) {
          setError("No se pudieron cargar los permisos");
          console.error("Error al cargar permisos:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPermisos();
    } else {
      setLoading(false);
    }
  }, [obtenerPermisos, permisos]);

  // Renderizado condicional para estados de carga y error
  if (loading || error || !permisos?.length) {
    return (
      <StateDisplay
        loading={loading}
        empty={!loading && !error && !permisos?.length}
        error={error}
      />
    );
  }

  return (
    <>
      {permisos.map((permiso) => (
        <PermisosGroup
          key={permiso._id}
          title={permiso.nombreGrupo}
          permisos={permiso.permisos}
        />
      ))}
    </>
  );
};
