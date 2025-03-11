import { Home } from "lucide-react";
import { Link } from "react-router";

export const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 mx-auto text-center bg-white rounded-lg shadow-md">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-red-100 rounded-full">
          <span className="text-3xl font-bold text-red-500">404</span>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Página no encontrada
        </h1>

        <p className="mb-8 text-gray-600">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        <div className="flex justify-center">
          <Link
            to={"/"}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Home className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};
