
import { createContext, useContext, useState, useEffect } from "react";

const SolicitudContext = createContext();

export function SolicitudProvider({ children }) {
  const [solicitudes, setSolicitudes] = useState(() => {
    const guardadas = localStorage.getItem("solicitudes");
    return guardadas ? JSON.parse(guardadas) : [];
  });

  useEffect(() => {
    localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
  }, [solicitudes]);

  const agregarSolicitud = (solicitud) => {
    const nuevaSolicitud = {
      ...solicitud,
      id: Date.now(),
      estado: "Pendiente",
      fecha: new Date().toLocaleDateString("es-PE")
    };

    setSolicitudes((actuales) => [...actuales, nuevaSolicitud]);
  };

  return (
    <SolicitudContext.Provider
      value={{ solicitudes, agregarSolicitud }}
    >
      {children}
    </SolicitudContext.Provider>
  );
}

export function useSolicitudes() {
  return useContext(SolicitudContext);
}
