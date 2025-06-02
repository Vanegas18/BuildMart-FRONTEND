import { Button } from "@/shared/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Badge } from "@/shared/components/ui/badge";
import {
  InfoIcon,
  CheckCircle2,
  XCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  IdCard,
} from "lucide-react";
import React from "react";

export const DetallesUsuarios = ({ usuario }) => {
  if (!usuario) return null;

  const renderRol = (rol) => {
    if (!rol) return "Sin Rol";
    return typeof rol === "object" ? rol.nombre || "Rol sin nombre" : rol;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 hover:shadow-sm">
          <InfoIcon className="w-4 h-4 mr-1 transition-transform duration-200 group-hover:scale-110" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[800px] max-h-[90vh] overflow-y-auto bg-white mx-auto">
        <DialogHeader className="border-b border-gray-100 pb-3 sm:pb-4">
          <DialogTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl text-gray-900">
            <div className="p-1.5 sm:p-2 bg-blue-50 rounded-full">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-base sm:text-xl">Detalles del Usuario</span>
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            Información completa del usuario seleccionado.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 sm:space-y-8 py-4 sm:py-6">
          {/* Información Personal */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-1 h-5 sm:h-6 bg-gray-600 rounded-full"></div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Información Personal
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="group">
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                  Nombre Completo
                </label>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-900 font-medium text-sm sm:text-base break-words">
                    {usuario.nombre || "No especificado"}
                  </span>
                </div>
              </div>

              <div className="group">
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                  Cédula
                </label>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    <IdCard className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-900 font-medium text-sm sm:text-base break-all">
                    {usuario.cedula || "No especificado"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-1 h-5 sm:h-6 bg-gray-600 rounded-full"></div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Información de Contacto
              </h3>
            </div>

            <div className="space-y-4">
              <div className="group">
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                  Correo Electrónico
                </label>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-900 font-medium text-sm sm:text-base break-all min-w-0">
                    {usuario.correo || "No especificado"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="group">
                  <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                    Teléfono
                  </label>
                  <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                    <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-900 font-medium text-sm sm:text-base break-all">
                      {usuario.telefono || "No especificado"}
                    </span>
                  </div>
                </div>

                <div className="group">
                  <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                    Dirección
                  </label>
                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                    <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0 mt-1 sm:mt-0">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-900 font-medium text-sm sm:text-base break-words leading-relaxed">
                      {usuario.direccion || "No especificado"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información del Sistema */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-1 h-5 sm:h-6 bg-gray-600 rounded-full"></div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Información del Sistema
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="group">
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                  Rol
                </label>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors duration-200 text-xs sm:text-sm">
                    {renderRol(usuario.rol)}
                  </Badge>
                </div>
              </div>

              <div className="group">
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                  Estado
                </label>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    {usuario.estado === "Activo" ? (
                      <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    ) : (
                      <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                    )}
                  </div>
                  <Badge
                    variant={
                      usuario.estado === "Activo" ? "default" : "outline"
                    }
                    className={
                      usuario.estado === "Activo"
                        ? "bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 text-xs sm:text-sm"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-xs sm:text-sm"
                    }>
                    {usuario.estado}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-gray-100 pt-3 sm:pt-4">
          <Button
            variant="outline"
            className="hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 px-4 sm:px-6 w-full sm:w-auto text-sm sm:text-base"
            onClick={() =>
              document.querySelector('[data-state="open"]')?.click()
            }>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
