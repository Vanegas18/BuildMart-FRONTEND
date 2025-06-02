"use client";

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Building2, FileText, Home, Lock, Printer } from "lucide-react";
import { Link } from "react-router-dom";

export default function Legal() {
  const [activeTab, setActiveTab] = useState("terminos");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 print:mb-4">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-8 w-8 text-slate-700" />
            <h1 className="text-2xl font-bold text-slate-800">BuildMart</h1>
          </Link>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 print:hidden"
          onClick={handlePrint}>
          <Printer className="h-4 w-4" />
          Imprimir documento
        </Button>
      </header>

      <div className="hidden print:block mb-4">
        <h2 className="text-xl font-bold text-center border-b pb-2">
          {activeTab === "terminos"
            ? "Términos y Condiciones"
            : "Política de Privacidad"}
        </h2>
      </div>

      <Card className="mt-6 border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-slate-800">
            {activeTab === "terminos"
              ? "Términos y Condiciones"
              : "Política de Privacidad"}
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <Tabs
            defaultValue="terminos"
            value={activeTab}
            onValueChange={setActiveTab}
            className="print:hidden">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="terminos" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Términos y Condiciones
              </TabsTrigger>
              <TabsTrigger
                value="privacidad"
                className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Política de Privacidad
              </TabsTrigger>
            </TabsList>

            <TabsContent value="terminos" className="mt-6">
              <section>
                <h3 className="text-lg font-semibold text-slate-800">
                  1. Introducción
                </h3>
                <p>
                  Bienvenido a BuildMart Estos Términos y Condiciones rigen su
                  uso de nuestro sitio web y la compra de nuestros productos,
                  incluyendo placas para casas prefabricadas y materiales de
                  construcción.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mt-6">
                  2. Productos y Servicios
                </h3>
                <p>
                  BuildMart ofrece una amplia gama de placas para casas
                  prefabricadas y materiales de construcción de alta calidad.
                  Nos esforzamos por proporcionar descripciones precisas de
                  nuestros productos, pero no garantizamos que todas las
                  descripciones sean exactas al 100%.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mt-6">
                  3. Precios y Pagos
                </h3>
                <p>
                  Todos los precios están expresados en la moneda local e
                  incluyen los impuestos aplicables. Nos reservamos el derecho
                  de modificar los precios en cualquier momento. Los métodos de
                  pago aceptados incluyen transferencia bancaria, tarjetas de
                  crédito y débito.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mt-6">
                  4. Envíos y Entregas
                </h3>
                <p>
                  Los plazos de entrega son estimados y pueden variar según la
                  disponibilidad del producto y la ubicación de entrega. Los
                  costos de envío se calcularán en función del peso, dimensiones
                  y distancia.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mt-6">
                  5. Garantías
                </h3>
                <p>
                  Nuestros productos cuentan con garantía contra defectos de
                  fabricación por un período de 12 meses desde la fecha de
                  compra. Esta garantía no cubre daños causados por uso
                  indebido, instalación incorrecta o desgaste normal.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mt-6">
                  6. Devoluciones
                </h3>
                <p>
                  Se aceptan devoluciones dentro de los 30 días posteriores a la
                  recepción del producto, siempre que se encuentre en su
                  embalaje original y en perfectas condiciones. Los costos de
                  devolución correrán a cargo del cliente, excepto en casos de
                  productos defectuosos.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mt-6">
                  7. Limitación de Responsabilidad
                </h3>
                <p>
                  BuildMart no será responsable por daños indirectos,
                  incidentales o consecuentes que puedan surgir del uso de
                  nuestros productos o servicios.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mt-6">
                  8. Modificaciones
                </h3>
                <p>
                  Nos reservamos el derecho de modificar estos Términos y
                  Condiciones en cualquier momento. Las modificaciones entrarán
                  en vigor inmediatamente después de su publicación en nuestro
                  sitio web.
                </p>
              </section>
            </TabsContent>

            <TabsContent value="privacidad" className="mt-6">
              <section>
                <h3 className="text-lg font-semibold text-slate-800">
                  1. Recopilación de Información
                </h3>
                <p>
                  BuildMart recopila información personal como nombre,
                  dirección, correo electrónico y número de teléfono cuando
                  usted realiza una compra, se registra en nuestro sitio web o
                  se suscribe a nuestro boletín informativo.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mt-6">
                  2. Uso de la Información
                </h3>
                <p>
                  Utilizamos su información personal para procesar pedidos,
                  mejorar nuestros productos y servicios, enviar comunicaciones
                  promocionales y cumplir con obligaciones legales. No
                  compartiremos su información con terceros sin su
                  consentimiento, excepto cuando sea necesario para completar
                  una transacción o cumplir con requisitos legales.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mt-6">
                  3. Cookies y Tecnologías Similares
                </h3>
                <p>
                  Nuestro sitio web utiliza cookies para mejorar su experiencia
                  de navegación, analizar el tráfico del sitio y personalizar el
                  contenido. Puede configurar su navegador para rechazar
                  cookies, pero esto puede afectar la funcionalidad de nuestro
                  sitio.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mt-6">
                  4. Seguridad de la Información
                </h3>
                <p>
                  Implementamos medidas de seguridad técnicas y organizativas
                  para proteger su información personal contra acceso no
                  autorizado, pérdida o alteración. Sin embargo, ninguna
                  transmisión por Internet o almacenamiento electrónico es
                  completamente segura.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mt-6">
                  5. Derechos del Usuario
                </h3>
                <p>
                  Usted tiene derecho a acceder, corregir, actualizar o
                  solicitar la eliminación de su información personal. También
                  puede oponerse al procesamiento de sus datos u optar por no
                  recibir comunicaciones promocionales.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mt-6">
                  6. Retención de Datos
                </h3>
                <p>
                  Conservaremos su información personal solo durante el tiempo
                  necesario para cumplir con los fines para los que se recopiló,
                  incluido el cumplimiento de requisitos legales, contables o de
                  informes.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mt-6">
                  7. Cambios en la Política de Privacidad
                </h3>
                <p>
                  Podemos actualizar nuestra Política de Privacidad
                  periódicamente. Le notificaremos cualquier cambio
                  significativo mediante un aviso en nuestro sitio web o por
                  correo electrónico.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mt-6">
                  8. Contacto
                </h3>
                <p>
                  Si tiene preguntas o inquietudes sobre nuestra Política de
                  Privacidad, puede contactarnos a través de nuestro formulario
                  de contacto o enviando un correo electrónico a
                  privacidad@construccionesmodernas.com.
                </p>
              </section>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t pt-6 text-sm text-slate-600">
          <p>© 2025 BuildMart Todos los derechos reservados.</p>
          <Link to="/" className="mt-2 sm:mt-0 hover:underline">
            Volver al inicio
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
