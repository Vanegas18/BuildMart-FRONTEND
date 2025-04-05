import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ChevronDown, ChevronRight, Info } from "lucide-react";

export const TreePermissionsView = ({ role }) => {
  const [expandedGroups, setExpandedGroups] = useState({});

  if (!role || !role.permisos) {
    return (
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <Info size={18} />
            Jerarquía de Permisos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            No hay datos de permisos disponibles
          </div>
        </CardContent>
      </Card>
    );
  }

  const toggleGroup = (groupIndex) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupIndex]: !prev[groupIndex],
    }));
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600">
            <Info size={18} />
            Jerarquía de Permisos
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const allGroupsExpanded = {};
                role.permisos.forEach((_, idx) => {
                  allGroupsExpanded[idx] = true;
                });
                setExpandedGroups(allGroupsExpanded);
              }}
              className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors">
              Expandir todo
            </button>
            <button
              onClick={() => setExpandedGroups({})}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors">
              Colapsar todo
            </button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-50 rounded-md p-4">
          {/* Root node - Role */}
          <div className="mb-4">
            <div className="flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-sm">
              <span>{role.nombre || "Rol"}</span>
              <span className="ml-2 bg-blue-700 text-xs px-2 py-0.5 rounded-full">
                {role.permisos.reduce(
                  (total, group) => total + (group.permisos?.length || 0),
                  0
                )}{" "}
                permisos
              </span>
            </div>
          </div>

          {/* Groups and permissions */}
          <div className="pl-8">
            {role.permisos.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-2">
                {/* Group header */}
                <div
                  className="flex items-center cursor-pointer px-4 py-2 bg-purple-500 text-white rounded-md mb-1 shadow-sm"
                  onClick={() => toggleGroup(groupIndex)}>
                  {expandedGroups[groupIndex] ? (
                    <ChevronDown size={16} className="mr-1" />
                  ) : (
                    <ChevronRight size={16} className="mr-1" />
                  )}
                  <span>{group.nombreGrupo || "Grupo"}</span>
                  <span className="ml-2 bg-purple-700 text-xs px-2 py-0.5 rounded-full">
                    {group.permisos?.length || 0} permisos
                  </span>
                </div>

                {/* Permissions */}
                {expandedGroups[groupIndex] && (
                  <div className="ml-8 mt-1 mb-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {(group.permisos || []).map((permission, permIndex) => (
                      <div
                        key={permIndex}
                        className="px-3 py-2 bg-green-500 text-white text-sm rounded shadow-sm flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-300 mr-2"></div>
                        <span>{permission.label || "Permiso"}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-500 flex gap-4 justify-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Rol</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Grupos</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Permisos</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
