import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { HeaderAccess } from "../../layout";

export const InvalidTokenView = ({ error, navigate }) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <HeaderAccess />
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-red-600">
              Enlace no válido
            </CardTitle>
            <CardDescription>
              El enlace que has utilizado no es válido o ha expirado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="bg-red-50 border-red-200">
              <AlertTitle className="text-red-800">Error</AlertTitle>
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
            <Button
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/forgot-password")}>
              Solicitar nuevo enlace
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link
              to="/login"
              className="flex items-center text-sm text-blue-600 hover:text-blue-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Iniciar Sesión
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};
