import { Button } from "@/shared/components/ui";
import { Link, useLocation } from "react-router";

export const ItemsSidebar = ({ nameTab, icon: Icon, path }) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  return (
    <Link to={path}>
      <Button
        variant="ghost"
        className={`justify-start hover:bg-blue-50 hover:text-blue-600 ${
          isActive ? "bg-blue-50 text-blue-600" : ""
        }`}>
        <Icon className="mr-2 h-4 w-4" />
        {nameTab}
      </Button>
    </Link>
  );
};
