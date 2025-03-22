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
import { useEffect, useState } from "react";
import { SidebarCont } from "./SidebarCont";
import { menuSections } from "./data/data";
import { SidebarFooterDash } from "./SidebarFooterDash";

export const SidebarDashboard = ({ activeSection }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determinar la sección activa basada en la URL y el prop
  const determineActiveSection = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "dashboard";
    if (path.startsWith("/dashboard/")) {
      return path.split("/").pop();
    }
    return activeSection || "dashboard";
  };

  const [currentSection, setCurrentSection] = useState(
    determineActiveSection()
  );

  // Actualizar el estado local cuando cambia el prop
  useEffect(() => {
    setCurrentSection(determineActiveSection());
  }, [activeSection]);

  const handleSectionChange = (sectionId) => {
    setCurrentSection(sectionId);

    if (sectionId === "dashboard") {
      navigate("/dashboard");
    } else {
      navigate(`/dashboard/${sectionId}`);
    }
  };

  return (
    <Sidebar className={styles.sidebar}>
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

      <SidebarContent className={styles.content}>
        <SidebarMenu>
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

          {menuSections.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`}>
              <SidebarMenuItem className={styles.sectionTitle}>
                {section.title}
              </SidebarMenuItem>

              {section.items.map((item) => (
                <SidebarCont
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
      <SidebarFooterDash />
    </Sidebar>
  );
};
