import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";

export const InfoPersonal = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src="/placeholder.svg?height=96&width=96"
              alt="Avatar"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm">
            Cambiar Foto
          </Button>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Nombre</label>
          <Input defaultValue="Juan Pérez" aria-label="Info" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input defaultValue="juan@ejemplo.com" aria-label="Info" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Teléfono</label>
          <Input defaultValue="+34 612 345 678" aria-label="Info" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Fecha de Nacimiento</label>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
            <Input defaultValue="15/05/1985" aria-label="Info" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
