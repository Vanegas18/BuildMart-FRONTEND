import { Button } from "@/components/ui";
import {
  CardContent,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export const FormRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cedula">Cédula</Label>
            <Input id="cedula" placeholder="1234567890" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input id="fullName" placeholder="Juan Pérez González" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@ejemplo.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+58 412 1234567"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              placeholder="Av. Principal, Edificio/Casa, Ciudad"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm font-normal">
              Acepto los{" "}
              <Link to={"/terms"} className="text-blue-600 hover:text-blue-800">
                términos y condiciones
              </Link>
            </Label>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}>
            {isLoading ? "Creando cuenta..." : "Registrarse"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-500">¿Ya tienes una cuenta?</span>{" "}
          <Link
            to={"/login"}
            className="text-blue-600 hover:text-blue-800 font-medium">
            Iniciar sesión
          </Link>
        </div>
      </CardContent>
    </>
  );
};
