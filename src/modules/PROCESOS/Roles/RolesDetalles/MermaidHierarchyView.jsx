import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Info } from "lucide-react";

export const MermaidHierarchyView = ({ role }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mermaidRef = useRef(null);

  useEffect(() => {
    if (!role || !role.permisos || !window.mermaid) return;

    try {
      setLoading(true);
      setError(null);

      // Configurar Mermaid con los nuevos estilos
      window.mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "base",
        logLevel: "error",
        flowchart: {
          curve: "monotoneX",
          diagramPadding: 8,
          htmlLabels: true,
        },
        fontFamily: "Montserrat, sans-serif",
      });

      // Generar código Mermaid
      let code = `graph TD\n`;

      // Estilos para los nodos
      code += `classDef roleStyle fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#ffffff,font-weight:bold\n`;
      code += `classDef groupStyle fill:#8b5cf6,stroke:#7c3aed,stroke-width:1px,color:#ffffff\n`;
      code += `classDef permStyle fill:#10b981,stroke:#059669,stroke-width:1px,color:#ffffff\n`;
      code += `linkStyle default stroke:#64748b,stroke-width:1.5px\n\n`;

      const roleName = role.nombre || "Rol";
      const safeRoleName = roleName.replace(/"/g, "'");

      // Nodo raíz
      code += `R["${safeRoleName}"]\n`;

      // Añadir grupos de permisos
      role.permisos.forEach((group, idx) => {
        const groupId = `G${idx}`;
        const safeGroupName = (group.nombreGrupo || "Grupo").replace(/"/g, "'");

        code += `R --> ${groupId}["${safeGroupName}"]\n`;

        // Añadir permisos para cada grupo
        const permisos = group.permisos || [];
        permisos.forEach((permission, permIdx) => {
          const permissionId = `P${idx}_${permIdx}`;
          const safePermName = (permission.label || "Permiso").replace(
            /"/g,
            "'"
          );

          code += `${groupId} --> ${permissionId}["${safePermName}"]\n`;
        });
      });

      // Aplicar estilos a las clases de nodos
      code += `\nclass R roleStyle\n`;
      role.permisos.forEach((_, idx) => {
        code += `class G${idx} groupStyle\n`;
      });

      role.permisos.forEach((group, idx) => {
        (group.permisos || []).forEach((_, permIdx) => {
          code += `class P${idx}_${permIdx} permStyle\n`;
        });
      });

      // Renderizar el diagrama
      setTimeout(() => {
        if (mermaidRef.current) {
          try {
            window.mermaid.render("mermaid-svg", code).then(({ svg }) => {
              mermaidRef.current.innerHTML = svg;
              setLoading(false);
            });
          } catch (err) {
            console.error("Error al renderizar Mermaid:", err);
            setError(
              "Error al generar el diagrama. Por favor, intente de nuevo."
            );
            setLoading(false);
          }
        }
      }, 100);
    } catch (err) {
      console.error("Error en MermaidHierarchyView:", err);
      setError("Ocurrió un error al procesar los datos");
      setLoading(false);
    }
  }, [role]);

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-600">
          <Info size={18} />
          Jerarquía de Permisos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && <div className="text-red-500 py-4 text-center">{error}</div>}

        <div
          ref={mermaidRef}
          className="overflow-auto min-h-[400px] p-4 rounded-md bg-slate-50 flex justify-center"
        />

        {!loading && !error && (
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
        )}
      </CardContent>
    </Card>
  );
};
