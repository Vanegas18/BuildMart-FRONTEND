import { usePermisos } from "@/core/context/Roles&Permisos/Permisos";
import { PermisosGroup } from "./PermisosGroup";
import { useEffect, useMemo, useState } from "react";
import { StateDisplay } from "@/modules/Dashboard/Layout";

export const PermisosContent = ({
  refreshTrigger,
  currentPage = 1,
  itemsPerPage = 3,
  permisos = [], // Valor por defecto
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { obtenerPermisos, isLoaded } = usePermisos();

  // Filtrar permisos para la página actual
  const paginatedPermisos = useMemo(() => {
    if (!permisos) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return permisos.slice(startIndex, endIndex);
  }, [permisos, currentPage, itemsPerPage]);

  // Carga de permisos
  useEffect(() => {
    const fetchPermisos = async () => {
      setLoading(true);
      try {
        if (!isLoaded) {
          await obtenerPermisos();
        }
      } catch (error) {
        setError("No se pudieron cargar los permisos");
        console.error("Error al cargar permisos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermisos();
  }, [refreshTrigger, obtenerPermisos, isLoaded]);

  // Renderizado condicional para estados de carga y error
  if (loading || error || !permisos?.length) {
    return (
      <StateDisplay
        loading={loading}
        empty={!loading && !error && !permisos?.length}
        error={error}
        section={"permisos"}
      />
    );
  }

  return (
    <>
      {paginatedPermisos.map((permiso) => (
        <PermisosGroup
          key={permiso._id}
          title={permiso.nombreGrupo}
          estado={permiso.estado}
          grupoPermiso={permiso.permisos}
          permiso={permiso}
        />
      ))}
    </>
  );
};
