import { useContext, useState, useEffect } from "react";
import { SolicitudContext } from "./solicitudContextDef";
import { solicitudesIniciales } from "../data/solicitudes";

export function SolicitudProvider({ children }) {
  const [solicitudes, setSolicitudes] = useState(() => {
    try {
      const guardadas = localStorage.getItem("solicitudes_academicas");
      if (guardadas) {
        const parsed = JSON.parse(guardadas);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error al cargar solicitudes de localStorage:", e);
    }
    return solicitudesIniciales;
  });

  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("solicitudes_academicas", JSON.stringify(solicitudes));
    } catch (e) {
      console.error("Error al guardar solicitudes en localStorage:", e);
    }
  }, [solicitudes]);

  const agregarSolicitud = (datos) => {
    const nueva = {
      id: Date.now(),
      codigoEstudiante: datos.codigoEstudiante || "ISIL-EST-001",
      estudiante: datos.estudiante || "Estudiante ISIL",
      carrera: datos.carrera || "Tecnología de la Información",
      tipo: datos.tipo,
      descripcion: datos.descripcion,
      prioridad: datos.prioridad || "Media",
      estado: "Pendiente",
      fecha: new Date().toLocaleDateString("es-PE"),
      respuesta: "Solicitud registrada con éxito. En evaluación por el área académica."
    };

    setSolicitudes((prev) => [nueva, ...prev]);
    return nueva;
  };

  const actualizarEstado = (id, nuevoEstado, nuevaRespuesta = "") => {
    setSolicitudes((prev) =>
      prev.map((s) =>
        s.id === Number(id)
          ? {
              ...s,
              estado: nuevoEstado,
              respuesta: nuevaRespuesta || s.respuesta || `Estado actualizado a ${nuevoEstado}.`
            }
          : s
      )
    );
  };

  const eliminarSolicitud = (id) => {
    setSolicitudes((prev) => prev.filter((s) => s.id !== Number(id)));
  };

  const restablecerDatos = () => {
    setSolicitudes(solicitudesIniciales);
    localStorage.setItem("solicitudes_academicas", JSON.stringify(solicitudesIniciales));
  };

  const obtenerPorId = (id) => {
    return solicitudes.find((s) => s.id === Number(id));
  };

  return (
    <SolicitudContext.Provider
      value={{
        solicitudes,
        filtroTipo,
        setFiltroTipo,
        filtroEstado,
        setFiltroEstado,
        terminoBusqueda,
        setTerminoBusqueda,
        agregarSolicitud,
        actualizarEstado,
        eliminarSolicitud,
        restablecerDatos,
        obtenerPorId
      }}
    >
      {children}
    </SolicitudContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSolicitudes() {
  const context = useContext(SolicitudContext);
  if (!context) {
    throw new Error("useSolicitudes debe ser utilizado dentro de un SolicitudProvider");
  }
  return context;
}
