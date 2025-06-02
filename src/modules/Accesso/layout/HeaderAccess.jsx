import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export const HeaderAccess = () => {
  return (
    // Encabezado fijo con efectos de blur
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center">
        {/* Logo y enlace a la página principal */}
        <Link to={"/"} className="flex items-center gap-2">
          <Home className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-black">
            Build<span className="text-blue-600">Mart</span>
          </span>
        </Link>
      </div>
    </header>
  );
};
