import { Link } from "react-router";

export const FooterPerfil = () => {
  return (
    <footer className="border-t py-6 bg-white">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Build Mart. Todos los derechos
          reservados.
        </p>
        <div className="flex gap-4 text-sm text-gray-500">
          <Link href="#" className="hover:underline">
            Ayuda
          </Link>
          <Link href="#" className="hover:underline">
            Soporte
          </Link>
        </div>
      </div>
    </footer>
  );
};
