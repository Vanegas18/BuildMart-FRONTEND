import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";
import { Home, Layout } from "lucide-react";
import { SidebarCont } from "./SidebarCont";
import { menuSections } from "./data/data";
import { SidebarFooterDash } from ".";
import styles from "./styles/Sidebar.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export const SidebarDashboard = ({ activeSection }) => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(activeSection);

  // Actualizar el estado local cuando cambia el prop
  useEffect(() => {
    setCurrentSection(activeSection);
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
          <Home className={styles.logo} />
          <span className={styles.logoText}>
            Build
            <span className={styles.logoAccent}>Mart</span>
          </span>
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
