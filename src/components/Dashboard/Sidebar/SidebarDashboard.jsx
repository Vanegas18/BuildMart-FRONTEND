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
import { menuSections } from "./data";
import { SidebarFooterDash } from ".";
import styles from "./styles/Sidebar.module.css";
import { useNavigate } from "react-router";

export const SidebarDashboard = ({ activeSection }) => {
  const navigate = useNavigate();

  const handleSectionChange = (sectionId) => {
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
                activeSection === "dashboard" ? styles.menuButtonActive : ""
              }`}
              onClick={() => handleSectionChange("dashboard")}>
              <Layout
                className={`${styles.menuIcon} ${
                  activeSection === "dashboard" ? styles.menuIconActive : ""
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
                  isActive={activeSection === item.id}
                  onClick={() => handleSectionChange(item.id)}
                  styles={styles} // Pasamos los estilos al componente hijo
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
