import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui";
import { Home, Layout } from "lucide-react";
import styles from "./styles/Sidebar.module.css";
import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState, useCallback, memo } from "react";
import { SidebarCont } from "./SidebarCont";
import { menuSections } from "./data/data";
import { SidebarFooterDash } from "./SidebarFooterDash";

// Componente memorizado para evitar renderizados innecesarios
const MemoizedSidebarCont = memo(SidebarCont);

export const SidebarDashboard = ({ activeSection }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determinar la sección activa basada en la URL y el prop
  const determineActiveSection = useCallback(() => {
    const path = location.pathname;
    // Si estamos en la ruta principal del dashboard
    if (path === "/dashboard") return "dashboard";
    // Si estamos en una subsección del dashboard
    if (path.startsWith("/dashboard/")) {
      return path.split("/").pop();
    }
    // Si no coincide con las anteriores, usar el prop o valor por defecto
    return activeSection || "dashboard";
  }, [location.pathname, activeSection]);

  // Estado para la sección actual
  const [currentSection, setCurrentSection] = useState(
    determineActiveSection()
  );

  // Actualizar el estado local cuando cambia la URL o el prop activeSection
  useEffect(() => {
    setCurrentSection(determineActiveSection());
  }, [determineActiveSection]);

  // Manejador de cambio de sección memorizado para evitar recreaciones
  const handleSectionChange = useCallback(
    (sectionId) => {
      setCurrentSection(sectionId);

      // Navegar a la ruta correspondiente
      if (sectionId === "dashboard") {
        navigate("/dashboard");
      } else {
        navigate(`/dashboard/${sectionId}`);
      }
    },
    [navigate]
  );

  return (
    <Sidebar className={styles.sidebar}>
      {/* Cabecera del sidebar con logo y link a home */}
      <SidebarHeader className={styles.header}>
        <div className={styles.headerContent}>
          <Link to={"/"} className="flex items-center gap-2">
            <Home className={styles.logo} />
            <span className={styles.logoText}>
              Build
              <span className={styles.logoAccent}>Mart</span>
            </span>
          </Link>
        </div>
      </SidebarHeader>

      {/* Contenido principal del sidebar */}
      <SidebarContent className={styles.content}>
        <SidebarMenu>
          {/* Elemento Dashboard siempre visible */}
          <SidebarMenuItem>
            <SidebarMenuButton
              className={`${styles.menuButton} ${
                currentSection === "dashboard" ? styles.menuButtonActive : ""
              }`}
              onClick={() => handleSectionChange("dashboard")}>
              <Layout
                className={`${styles.menuIcon} ${
                  currentSection === "dashboard" ? styles.menuIconActive : ""
                }`}
              />
              <span className={styles.menuText}>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Secciones de menú dinámicas basadas en menuSections */}
          {menuSections.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`}>
              {/* Título de la sección */}
              <SidebarMenuItem className={styles.sectionTitle}>
                {section.title}
              </SidebarMenuItem>

              {/* Items de cada sección */}
              {section.items.map((item) => (
                <MemoizedSidebarCont
                  key={item.id}
                  nameProcess={item.label}
                  process={item.id}
                  icon={item.icon}
                  isActive={currentSection === item.id}
                  onClick={() => handleSectionChange(item.id)}
                />
              ))}
            </div>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer del sidebar */}
      <SidebarFooterDash />
    </Sidebar>
  );
};
