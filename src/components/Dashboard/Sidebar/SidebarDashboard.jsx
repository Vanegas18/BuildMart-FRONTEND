import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";
import { ChevronDown, Home, Layout, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { SidebarCont } from "./SidebarCont";
import { menuSections } from "./data";
import styles from "./Sidebar.module.css";

export const SidebarDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

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
              onClick={() => setActiveSection("dashboard")}>
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
                  onClick={() => setActiveSection(item.id)}
                  styles={styles} // Pasamos los estilos al componente hijo
                />
              ))}
            </div>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className={styles.footer}>
        <div className={styles.footerContent}>
          <Avatar className={styles.avatar}>
            <AvatarImage
              src="/placeholder.svg?height=36&width=36"
              alt="Avatar"
            />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>

          <div className={styles.userInfo}>
            <p className={styles.userName}>Admin User</p>
            <p className={styles.userEmail}>admin@buildmart.com</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={styles.dropdownButton}>
                <ChevronDown className={styles.dropdownIcon} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to="/">
                <DropdownMenuItem>
                  <Settings className={styles.menuItemIcon} />
                  <span>Mi perfil</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link to="/">
                <DropdownMenuItem>
                  <LogOut className={styles.menuItemIcon} />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
