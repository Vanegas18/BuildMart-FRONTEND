import { Button } from "@/shared/components/ui";
import { Direcciones } from "./Direcciones";
import { Pagos } from "./Pagos";
import { InfoPersonal } from "./InfoPersonal";
import { useEffect, useMemo, useState } from "react";
import { useAuth, useClientes } from "@/core/context";
import { Loader } from "lucide-react";
import styles from "../../../PROCESOS/Productos/styles/Products.module.css";

export const Perfil = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { clientes, obtenerClientes, isLoaded } = useClientes();

  // Obtener clientes al montar el componente
  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      try {
        // Solo obtener clientes si aún no están cargados
        if (!isLoaded) {
          await obtenerClientes();
        }
      } catch (error) {
        setError("No se pudieron cargar los clientes");
        console.error("Error al cargar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, [obtenerClientes, isLoaded]);

  // Buscar el cliente que corresponde al usuario logueado
  const clienteActual = useMemo(() => {
    // Aseguramos que tanto user como clientes existan
    if (!user || !clientes || clientes.length === 0) return {};

    // Buscamos el cliente que tenga el mismo _id que el usuario
    // Asumiendo que user tiene un campo que relaciona con el _id del cliente
    return clientes.find((cliente) => cliente._id === user.id) || {};
  }, [clientes, user]);

  // Renderizar un mensaje de carga si los datos aún no están listos
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={styles.loadingState}>
          <Loader className="animate-spin mr-2" size={40} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <InfoPersonal cliente={clienteActual} onClienteEditado={() => {}} />

        <div className="space-y-6">
          <Direcciones cliente={clienteActual} onClienteEditado={() => {}} />
          <Pagos cliente={clienteActual} onClienteEditado={() => {}} />
        </div>
      </div>
    </>
  );
};
